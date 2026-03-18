"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  getColaboradorById,
  getAvaliacoes11ByColaborador,
  getAvaliacoesRHByColaborador,
  createAvaliacaoRH,
} from "@/lib/data";
import { formatDate } from "@/lib/utils";
import type { Colaborador, Avaliacao11, AvaliacaoRH } from "@/lib/types";

interface FormAvaliacaoRH {
  classificacao: number;
  observacoes: string;
  riscoDesligamento: "baixo" | "medio" | "alto";
  intervencoes: string;
}

export default function ColaboradorPerfilPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [colaborador, setColaborador] = useState<Colaborador | null>(null);
  const [avaliacoes11, setAvaliacoes11] = useState<Avaliacao11[]>([]);
  const [avaliacoesRH, setAvaliacoesRH] = useState<AvaliacaoRH[]>([]);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset } = useForm<FormAvaliacaoRH>({
    defaultValues: { classificacao: 0, observacoes: "", riscoDesligamento: "baixo", intervencoes: "" },
  });

  useEffect(() => {
    Promise.all([
      getColaboradorById(id),
      getAvaliacoes11ByColaborador(id),
      getAvaliacoesRHByColaborador(id),
    ]).then(([col, a11, aRh]) => {
      setColaborador(col ?? null);
      setAvaliacoes11(a11);
      setAvaliacoesRH(aRh);
      setLoading(false);
    });
  }, [id]);

  const chartData = avaliacoes11.map((a) => ({
    data: formatDate(a.data),
    classificacao: a.classificacao ?? 0,
  }));

  const onSubmit = async (data: FormAvaliacaoRH) => {
    await createAvaliacaoRH({
      colaboradorId: id,
      classificacao: data.classificacao,
      observacoes: data.observacoes,
      riscoDesligamento: data.riscoDesligamento,
      intervencoes: data.intervencoes,
    });
    const novas = await getAvaliacoesRHByColaborador(id);
    setAvaliacoesRH(novas);
    reset();
  };

  if (loading || !colaborador) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-venda-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <Link href="/rh/painel" className="mb-4 inline-block text-venda-gold hover:underline">
        ← Voltar
      </Link>
      <h1 className="text-3xl font-bold text-venda-cream">Perfil - {colaborador.nome}</h1>
      <p className="mt-1 text-venda-cream/80">{colaborador.cargo} • {colaborador.area}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card-white p-6">
          <h2 className="text-lg font-semibold text-venda-cream">Dados</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div><dt className="text-venda-cream/70">E-mail</dt><dd className="text-venda-cream">{colaborador.email}</dd></div>
            <div><dt className="text-venda-cream/70">Admissão</dt><dd className="text-venda-cream">{formatDate(colaborador.dataAdmissao)}</dd></div>
          </dl>
        </div>

        <div className="card-white p-6">
          <h2 className="text-lg font-semibold text-venda-cream">Avaliações 1:1</h2>
          {chartData.length > 0 ? (
            <div className="mt-4 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#78350f" />
                  <XAxis dataKey="data" stroke="#c9a227" />
                  <YAxis stroke="#c9a227" domain={[0, 5]} />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #78350f" }} />
                  <Bar dataKey="classificacao" fill="#c9a227" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="mt-4 text-venda-cream/70">Sem avaliações 1:1</p>
          )}
        </div>
      </div>

      <div className="mt-8 card-white p-6">
        <h2 className="text-lg font-semibold text-venda-cream">Nova Avaliação RH</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm text-venda-cream/70">Classificação (0-5)</label>
            <input type="number" min={0} max={5} step={0.5} {...register("classificacao", { valueAsNumber: true })} className="mt-1 w-24 rounded border border-amber-900/40 bg-venda-charcoal px-3 py-2 text-venda-cream" />
          </div>
          <div>
            <label className="block text-sm text-venda-cream/70">Observações</label>
            <textarea {...register("observacoes")} className="mt-1 w-full rounded border border-amber-900/40 bg-venda-charcoal px-3 py-2 text-venda-cream" rows={3} />
          </div>
          <div>
            <label className="block text-sm text-venda-cream/70">Risco de desligamento</label>
            <select {...register("riscoDesligamento")} className="mt-1 rounded border border-amber-900/40 bg-venda-charcoal px-3 py-2 text-venda-cream">
              <option value="baixo">Baixo</option>
              <option value="medio">Médio</option>
              <option value="alto">Alto</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-venda-cream/70">Intervenções</label>
            <textarea {...register("intervencoes")} className="mt-1 w-full rounded border border-amber-900/40 bg-venda-charcoal px-3 py-2 text-venda-cream" rows={2} />
          </div>
          <button type="submit" className="rounded-lg bg-venda-gold px-4 py-2 text-venda-dark hover:bg-venda-gold/90">
            Salvar Avaliação
          </button>
        </form>
      </div>
    </div>
  );
}
