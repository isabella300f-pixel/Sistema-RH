"use client";

import { useEffect, useState } from "react";
import { MOCK_TREINAMENTOS } from "@/lib/data";
import type { Treinamento } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function TreinamentosPage() {
  const [treinamentos, setTreinamentos] = useState<Treinamento[]>([]);

  useEffect(() => {
    setTreinamentos(MOCK_TREINAMENTOS);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Treinamentos</h1>
      <p className="mt-1 text-gray-300">Treinamentos e desenvolvimento</p>
      <div className="mt-6 flex gap-2">
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Treinamentos
        </button>
        <button className="rounded-lg bg-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">
          Trilhas de Aprendizagem
        </button>
        <button className="rounded-lg bg-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">
          Certificados
        </button>
        <button className="rounded-lg bg-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">
          Vencimentos
        </button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {treinamentos.map((t) => (
          <div key={t.id} className="card-white p-6">
            <h3 className="text-lg font-semibold text-white">{t.titulo}</h3>
            <p className="mt-2 text-sm text-gray-400">{t.descricao}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-500">
              <span>{t.tipo}</span>
              <span>{t.cargaHoraria}h</span>
              <span>{formatDate(t.dataInicio)} - {formatDate(t.dataFim)}</span>
              <span className="rounded bg-gray-700 px-2 py-0.5">{t.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
