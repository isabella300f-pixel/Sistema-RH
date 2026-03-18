"use client";

import { useEffect, useState } from "react";
import { MOCK_TRILHAS, MOCK_ENTREGAS_TRILHA } from "@/lib/data";
import type { TrilhaAprendizagem, EntregaTrilha } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function TrilhaEntregasPage() {
  const [trilhas, setTrilhas] = useState<TrilhaAprendizagem[]>([]);
  const [entregas, setEntregas] = useState<EntregaTrilha[]>([]);
  const [aba, setAba] = useState<"trilhas" | "entregas" | "progresso">("trilhas");

  useEffect(() => {
    setTrilhas(MOCK_TRILHAS);
    setEntregas(MOCK_ENTREGAS_TRILHA);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Trilha de Entregas</h1>
      <p className="mt-1 text-gray-300">Trilhas de aprendizagem e entregas dos colaboradores</p>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setAba("trilhas")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "trilhas" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          Trilhas
        </button>
        <button
          onClick={() => setAba("entregas")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "entregas" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          Entregas
        </button>
        <button
          onClick={() => setAba("progresso")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "progresso" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          Progresso
        </button>
      </div>
      {aba === "trilhas" && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {trilhas.map((t) => (
            <div key={t.id} className="card-white p-6">
              <h3 className="text-lg font-semibold text-white">{t.titulo}</h3>
              <p className="mt-2 text-sm text-gray-400">{t.descricao}</p>
              {t.modulos && t.modulos.length > 0 && (
                <ul className="mt-4 list-disc space-y-1 pl-6 text-sm text-gray-300">
                  {t.modulos.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
      {aba === "entregas" && (
        <div className="mt-6 card-white overflow-hidden">
          <table className="w-full divide-y divide-blue-500/30">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Colaborador</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Trilha</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Entrega</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {entregas.map((e) => (
                <tr key={e.id} className="text-gray-300">
                  <td className="px-4 py-3">{e.colaboradorId}</td>
                  <td className="px-4 py-3">{trilhas.find((t) => t.id === e.trilhaId)?.titulo ?? e.trilhaId}</td>
                  <td className="px-4 py-3">{e.titulo}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-0.5 text-xs ${
                        e.status === "aprovado"
                          ? "bg-green-900/50 text-green-400"
                          : e.status === "entregue"
                          ? "bg-blue-900/50 text-blue-400"
                          : e.status === "em_andamento"
                          ? "bg-yellow-900/50 text-yellow-400"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {e.status ?? "pendente"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{formatDate(e.dataEntrega)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {aba === "progresso" && (
        <div className="mt-6 card-white p-6">
          <p className="text-gray-400">Visão geral do progresso dos colaboradores nas trilhas.</p>
        </div>
      )}
    </div>
  );
}
