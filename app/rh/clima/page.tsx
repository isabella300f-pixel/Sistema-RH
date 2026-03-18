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
      <h1 className="text-3xl font-bold text-white">Clima Organizacional</h1>
      <p className="mt-1 text-gray-300">Pesquisas e resultados</p>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setAba("pesquisas")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "pesquisas" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          Pesquisas
        </button>
        <button
          onClick={() => setAba("resultados")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "resultados" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          Resultados
        </button>
        <button
          onClick={() => setAba("dashboard")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "dashboard" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          Dashboard
        </button>
      </div>
      {aba === "pesquisas" && (
        <>
          <button className="mt-6 rounded-lg bg-ecosystem-red px-4 py-2 text-white hover:opacity-90">
            Nova Pesquisa
          </button>
          <div className="mt-6 card-white overflow-hidden">
            <table className="w-full divide-y divide-blue-500/30">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white">Título</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white">Tipo</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white">Período</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {pesquisas.map((p) => (
                  <tr key={p.id} className="text-gray-300">
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
      {aba === "resultados" && <div className="mt-6 card-white p-6 text-gray-400">Nenhum resultado disponível.</div>}
      {aba === "dashboard" && <div className="mt-6 card-white p-6 text-gray-400">Dashboard em construção.</div>}
    </div>
  );
}
