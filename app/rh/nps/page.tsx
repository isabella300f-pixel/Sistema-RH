"use client";

import { useEffect, useState } from "react";
import { MOCK_NPS } from "@/lib/data";
import type { NPSResposta } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function NPSPage() {
  const [respostas, setRespostas] = useState<NPSResposta[]>([]);
  const [aba, setAba] = useState<"resultados" | "pesquisas" | "historico">("resultados");

  useEffect(() => {
    setRespostas(MOCK_NPS);
  }, []);

  const npsScore = respostas.length
    ? Math.round(
        (respostas.filter((r) => r.nota >= 9).length / respostas.length) * 100 -
          (respostas.filter((r) => r.nota <= 6).length / respostas.length) * 100
      )
    : 0;

  const promotores = respostas.filter((r) => r.nota >= 9).length;
  const neutros = respostas.filter((r) => r.nota >= 7 && r.nota <= 8).length;
  const detratores = respostas.filter((r) => r.nota <= 6).length;

  return (
    <div>
      <h1 className="text-3xl font-bold text-venda-cream">NPS</h1>
      <p className="mt-1 text-venda-cream/80">Net Promoter Score - Pesquisa de satisfação</p>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setAba("resultados")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "resultados" ? "bg-venda-gold text-venda-dark" : "bg-amber-900/20 text-venda-cream/80 hover:bg-amber-900/30"}`}
        >
          Resultados
        </button>
        <button
          onClick={() => setAba("pesquisas")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "pesquisas" ? "bg-venda-gold text-venda-dark" : "bg-amber-900/20 text-venda-cream/80 hover:bg-amber-900/30"}`}
        >
          Pesquisas
        </button>
        <button
          onClick={() => setAba("historico")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "historico" ? "bg-venda-gold text-venda-dark" : "bg-amber-900/20 text-venda-cream/80 hover:bg-amber-900/30"}`}
        >
          Histórico
        </button>
      </div>
      {aba === "resultados" && (
        <div className="mt-8 space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card-white p-6 text-center">
              <p className="text-4xl font-bold text-venda-cream">{npsScore}</p>
              <p className="mt-1 text-sm text-venda-cream/70">NPS Score</p>
            </div>
            <div className="card-white p-6 text-center">
              <p className="text-4xl font-bold text-green-400">{promotores}</p>
              <p className="mt-1 text-sm text-venda-cream/70">Promotores (9-10)</p>
            </div>
            <div className="card-white p-6 text-center">
              <p className="text-4xl font-bold text-yellow-400">{neutros}</p>
              <p className="mt-1 text-sm text-venda-cream/70">Neutros (7-8)</p>
            </div>
            <div className="card-white p-6 text-center md:col-span-3">
              <p className="text-4xl font-bold text-red-400">{detratores}</p>
              <p className="mt-1 text-sm text-venda-cream/70">Detratores (0-6)</p>
            </div>
          </div>
          <div className="card-white overflow-hidden">
            <h2 className="card-white-header text-lg font-semibold text-venda-cream">Respostas recentes</h2>
            <table className="w-full divide-y divide-amber-900/30">
              <thead className="bg-amber-900/20">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Nota</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Comentário</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-900/30">
                {respostas.map((r) => (
                  <tr key={r.id} className="text-venda-cream/80">
                    <td className="px-4 py-3">{r.nota}</td>
                    <td className="px-4 py-3">{r.comentario ?? "-"}</td>
                    <td className="px-4 py-3">{formatDate(r.data)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {aba === "pesquisas" && (
        <div className="mt-6 card-white p-6">
          <button className="rounded-lg bg-venda-gold px-4 py-2 text-venda-dark hover:opacity-90">
            Nova Pesquisa NPS
          </button>
          <p className="mt-4 text-venda-cream/70">Configure e envie pesquisas NPS para os colaboradores.</p>
        </div>
      )}
      {aba === "historico" && (
        <div className="mt-6 card-white p-6 text-venda-cream/70">
          Histórico de pesquisas NPS por período.
        </div>
      )}
    </div>
  );
}
