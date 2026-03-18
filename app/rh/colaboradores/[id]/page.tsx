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
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-ecosystem-red border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <Link href="/rh/painel" className="mb-4 inline-block text-blue-400 hover:underline">
        ← Voltar
      </Link>
      <h1 className="text-3xl font-bold text-white">Perfil - {colaborador.nome}</h1>
      <p className="mt-1 text-gray-300">{colaborador.cargo} • {colaborador.area}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card-white p-6">
          <h2 className="text-lg font-semibold text-white">Dados</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div><dt className="text-gray-400">E-mail</dt><dd className="text-white">{colaborador.email}</dd></div>
            <div><dt className="text-gray-400">Admissão</dt><dd className="text-white">{formatDate(colaborador.dataAdmissao)}</dd></div>
          </dl>
        </div>

        <div className="card-white p-6">
          <h2 className="text-lg font-semibold text-white">Avaliações 1:1</h2>
          {chartData.length > 0 ? (
            <div className="mt-4 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="data" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={[0, 5]} />
                  <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
                  <Bar dataKey="classificacao" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="mt-4 text-gray-400">Sem avaliações 1:1</p>
          )}
        </div>
      </div>

      <div className="mt-8 card-white p-6">
        <h2 className="text-lg font-semibold text-white">Nova Avaliação RH</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm text-gray-400">Classificação (0-5)</label>
            <input type="number" min={0} max={5} step={0.5} {...register("classificacao", { valueAsNumber: true })} className="mt-1 w-24 rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white" />
          </div>
          <div>
            <label className="block text-sm text-gray-400">Observações</label>
            <textarea {...register("observacoes")} className="mt-1 w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white" rows={3} />
          </div>
          <div>
            <label className="block text-sm text-gray-400">Risco de desligamento</label>
            <select {...register("riscoDesligamento")} className="mt-1 rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white">
              <option value="baixo">Baixo</option>
              <option value="medio">Médio</option>
              <option value="alto">Alto</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400">Intervenções</label>
            <textarea {...register("intervencoes")} className="mt-1 w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white" rows={2} />
          </div>
          <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Salvar Avaliação
          </button>
        </form>
      </div>
    </div>
  );
}
