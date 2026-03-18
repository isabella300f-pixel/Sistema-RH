"use client";

import { useState } from "react";
import { MOCK_PESQUISAS_CLIMA } from "@/lib/data";
import type { PesquisaClima } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function ClimaPage() {
  const [aba, setAba] = useState<"pesquisas" | "resultados" | "dashboard">("pesquisas");
  const [pesquisas] = useState<PesquisaClima[]>(MOCK_PESQUISAS_CLIMA);

  return (
    <div>
      <h1 className="text-3xl font-bold text-venda-cream">Clima Organizacional</h1>
      <p className="mt-1 text-venda-cream/80">Pesquisas e resultados</p>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setAba("pesquisas")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "pesquisas" ? "bg-venda-gold text-venda-dark" : "bg-amber-900/20 text-venda-cream/80 hover:bg-amber-900/30"}`}
        >
          Pesquisas
        </button>
        <button
          onClick={() => setAba("resultados")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "resultados" ? "bg-venda-gold text-venda-dark" : "bg-amber-900/20 text-venda-cream/80 hover:bg-amber-900/30"}`}
        >
          Resultados
        </button>
        <button
          onClick={() => setAba("dashboard")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "dashboard" ? "bg-venda-gold text-venda-dark" : "bg-amber-900/20 text-venda-cream/80 hover:bg-amber-900/30"}`}
        >
          Dashboard
        </button>
      </div>
      {aba === "pesquisas" && (
        <>
          <button className="mt-6 rounded-lg bg-ecosystem-red px-4 py-2 text-venda-cream hover:opacity-90">
            Nova Pesquisa
          </button>
          <div className="mt-6 card-white overflow-hidden">
            <table className="w-full divide-y divide-amber-900/30">
              <thead className="bg-amber-900/20">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Título</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Tipo</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Período</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-900/30">
                {pesquisas.map((p) => (
                  <tr key={p.id} className="text-venda-cream/80">
                    <td className="px-4 py-3">{p.titulo}</td>
                    <td className="px-4 py-3">{p.tipo}</td>
                    <td className="px-4 py-3">{formatDate(p.dataInicio)} - {formatDate(p.dataFim)}</td>
                    <td className="px-4 py-3">{p.status ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {aba === "resultados" && <div className="mt-6 card-white p-6 text-venda-cream/70">Nenhum resultado disponível.</div>}
      {aba === "dashboard" && <div className="mt-6 card-white p-6 text-venda-cream/70">Dashboard em construção.</div>}
    </div>
  );
}
