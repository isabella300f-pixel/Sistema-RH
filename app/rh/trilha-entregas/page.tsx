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
      <h1 className="text-3xl font-bold text-venda-cream">Trilha de Entregas</h1>
      <p className="mt-1 text-venda-cream/80">Trilhas de aprendizagem e entregas dos colaboradores</p>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setAba("trilhas")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "trilhas" ? "bg-blue-600 text-venda-cream" : "bg-amber-900/20 text-venda-cream/80 hover:bg-amber-900/30"}`}
        >
          Trilhas
        </button>
        <button
          onClick={() => setAba("entregas")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "entregas" ? "bg-blue-600 text-venda-cream" : "bg-amber-900/20 text-venda-cream/80 hover:bg-amber-900/30"}`}
        >
          Entregas
        </button>
        <button
          onClick={() => setAba("progresso")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "progresso" ? "bg-blue-600 text-venda-cream" : "bg-amber-900/20 text-venda-cream/80 hover:bg-amber-900/30"}`}
        >
          Progresso
        </button>
      </div>
      {aba === "trilhas" && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {trilhas.map((t) => (
            <div key={t.id} className="card-white p-6">
              <h3 className="text-lg font-semibold text-venda-cream">{t.titulo}</h3>
              <p className="mt-2 text-sm text-venda-cream/70">{t.descricao}</p>
              {t.modulos && t.modulos.length > 0 && (
                <ul className="mt-4 list-disc space-y-1 pl-6 text-sm text-venda-cream/80">
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
          <table className="w-full divide-y divide-amber-900/30">
            <thead className="bg-amber-900/20">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Colaborador</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Trilha</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Entrega</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/30">
              {entregas.map((e) => (
                <tr key={e.id} className="text-venda-cream/80">
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
                          : "bg-amber-900/30 text-venda-cream/70"
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
          <p className="text-venda-cream/70">Visão geral do progresso dos colaboradores nas trilhas.</p>
        </div>
      )}
    </div>
  );
}
