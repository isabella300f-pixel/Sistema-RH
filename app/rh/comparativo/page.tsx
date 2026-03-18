"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getAllColaboradores, getAllAvaliacoes11 } from "@/lib/data";
import { calculateScore } from "@/lib/utils";
import type { Colaborador } from "@/lib/types";

export default function ComparativoPage() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<{ colaboradorId: string; classificacao?: number }[]>([]);
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllColaboradores(), getAllAvaliacoes11()]).then(([cols, avs]) => {
      setColaboradores(cols);
      setAvaliacoes(avs);
      setLoading(false);
    });
  }, []);

  const toggleSelecionado = (id: string) => {
    if (selecionados.includes(id)) {
      setSelecionados(selecionados.filter((s) => s !== id));
    } else if (selecionados.length < 3) {
      setSelecionados([...selecionados, id]);
    }
  };

  const chartData = selecionados.map((id) => {
    const col = colaboradores.find((c) => c.id === id);
    const avs = avaliacoes.filter((a) => a.colaboradorId === id);
    const score = calculateScore(avs);
    return { nome: col?.nome ?? id, score };
  });

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-venda-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-venda-cream">Comparativo</h1>
      <p className="mt-1 text-venda-cream/80">Selecione até 3 colaboradores para comparar scores</p>
      <div className="mt-6 card-white p-6">
        <p className="mb-4 text-sm text-venda-cream/70">Clique para selecionar (máx. 3):</p>
        <div className="flex flex-wrap gap-2">
          {colaboradores.map((c) => (
            <button
              key={c.id}
              onClick={() => toggleSelecionado(c.id)}
              className={`rounded-lg px-4 py-2 text-sm ${
                selecionados.includes(c.id) ? "bg-venda-gold text-venda-dark" : "bg-amber-900/20 text-venda-cream/80 hover:bg-amber-900/30"
              }`}
            >
              {c.nome}
            </button>
          ))}
        </div>
      </div>
      {chartData.length > 0 && (
        <div className="mt-8 card-white p-6">
          <h2 className="text-lg font-semibold text-venda-cream">Score médio</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#78350f" />
                <XAxis dataKey="nome" stroke="#c9a227" />
                <YAxis stroke="#c9a227" domain={[0, 5]} />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #78350f" }} />
                <Bar dataKey="score" fill="#c9a227" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
