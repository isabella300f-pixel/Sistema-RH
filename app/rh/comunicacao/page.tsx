"use client";

import { useState } from "react";
import { MOCK_COMUNICADOS, MOCK_SUGESTOES } from "@/lib/data";
import type { Comunicado, Sugestao } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function ComunicacaoPage() {
  const [aba, setAba] = useState<"comunicados" | "sugestoes" | "biblioteca">("comunicados");

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Comunicação Interna</h1>
      <p className="mt-1 text-gray-300">Comunicados e caixa de sugestões</p>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setAba("comunicados")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "comunicados" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          Comunicados
        </button>
        <button
          onClick={() => setAba("sugestoes")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "sugestoes" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          Caixa de Sugestões
        </button>
        <button
          onClick={() => setAba("biblioteca")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "biblioteca" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          Biblioteca
        </button>
      </div>
      {aba === "comunicados" && (
        <>
          <button className="mt-6 rounded-lg bg-ecosystem-red px-4 py-2 text-white hover:opacity-90">
            Novo Comunicado
          </button>
          <div className="mt-6 card-white overflow-hidden">
            <table className="w-full divide-y divide-blue-500/30">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white">Título</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white">Tipo</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white">Data</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-white">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {MOCK_COMUNICADOS.map((c) => (
                  <tr key={c.id} className="text-gray-300">
                    <td className="px-4 py-3">{c.titulo}</td>
                    <td className="px-4 py-3">{c.tipo}</td>
                    <td className="px-4 py-3">{formatDate(c.dataPublicacao)}</td>
                    <td className="px-4 py-3">{c.status ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {aba === "sugestoes" && (
        <div className="mt-6 card-white overflow-hidden">
          <table className="w-full divide-y divide-blue-500/30">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Título</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {MOCK_SUGESTOES.map((s) => (
                <tr key={s.id} className="text-gray-300">
                  <td className="px-4 py-3">{s.titulo}</td>
                  <td className="px-4 py-3">{s.status ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {aba === "biblioteca" && <div className="mt-6 card-white p-6 text-gray-400">Biblioteca de documentos.</div>}
    </div>
  );
}
