"use client";

import { useEffect, useState } from "react";
import { getAllColaboradores, getAllAvaliacoes11 } from "@/lib/data";
import { calculateScore } from "@/lib/utils";
import type { Colaborador } from "@/lib/types";

export default function RelatoriosPage() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<{ colaboradorId: string; classificacao?: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllColaboradores(), getAllAvaliacoes11()]).then(([cols, avs]) => {
      setColaboradores(cols);
      setAvaliacoes(avs);
      setLoading(false);
    });
  }, []);

  const exportCSV = () => {
    const rows = colaboradores.map((c) => {
      const avs = avaliacoes.filter((a) => a.colaboradorId === c.id);
      const score = calculateScore(avs);
      return [c.nome, c.cargo ?? "", c.area ?? "", c.gestorId ?? "", score.toFixed(1), avs.length].join(",");
    });
    const header = "Nome,Cargo,Área,Gestor,Score Médio,Total Avaliações";
    const csv = [header, ...rows].join("\n");
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio-colaboradores.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-ecosystem-red border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Relatórios</h1>
      <p className="mt-1 text-gray-300">Exporte dados e relatórios</p>
      <div className="mt-8 space-y-6">
        <div className="card-white p-6">
          <h2 className="text-lg font-semibold text-white">Relatório de Colaboradores</h2>
          <p className="mt-2 text-sm text-gray-400">Exporta CSV com nome, cargo, área, gestor, score médio e total de avaliações.</p>
          <button
            onClick={exportCSV}
            className="mt-4 rounded-lg bg-ecosystem-red px-4 py-2 text-white hover:opacity-90"
          >
            Exportar CSV
          </button>
        </div>
        <div className="card-white p-6">
          <h2 className="text-lg font-semibold text-white">Relatórios disponíveis</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-gray-300">
            <li>Colaboradores com scores</li>
            <li>Avaliações 1:1</li>
            <li>Treinamentos realizados</li>
            <li>NPS por período</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
