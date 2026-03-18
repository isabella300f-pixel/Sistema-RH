"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getAllColaboradores,
  getAllAvaliacoes11,
  getAllAvaliacoesRH,
  getUltimaAvaliacao,
  getRiscoDesligamento,
} from "@/lib/data";
import { calculateScore, formatDate } from "@/lib/utils";
import type { Colaborador } from "@/lib/types";

export default function AvaliacaoPage() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [filtroArea, setFiltroArea] = useState("");

  useEffect(() => {
    Promise.all([getAllColaboradores(), getAllAvaliacoes11(), getAllAvaliacoesRH()]).then(
      ([cols, a11, aRh]) => {
        const comScore = cols.map((c) => {
          const avs = a11.filter((a) => a.colaboradorId === c.id);
          const score = calculateScore(avs);
          const ultima = avs.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())[0];
          const risco = getRiscoDesligamento(c.id, aRh);
          return { ...c, score, ultimaData: ultima?.data, risco };
        });
        setColaboradores(comScore);
        setLoading(false);
      }
    );
  }, []);

  const areas = [...new Set(colaboradores.map((c) => c.area).filter(Boolean))];
  const filtrados = colaboradores.filter((c) => {
    const matchBusca = !busca || c.nome.toLowerCase().includes(busca.toLowerCase());
    const matchArea = !filtroArea || c.area === filtroArea;
    return matchBusca && matchArea;
  });

  const riscoColor = (r: string) => {
    if (r === "baixo") return "text-green-400";
    if (r === "medio") return "text-yellow-400";
    return "text-red-400";
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
      <h1 className="text-3xl font-bold text-white">Avaliação Individual</h1>
      <p className="mt-1 text-gray-300">Scores e risco de desligamento</p>
      <div className="mt-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white placeholder-gray-500"
        />
        <select
          value={filtroArea}
          onChange={(e) => setFiltroArea(e.target.value)}
          className="rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white"
        >
          <option value="">Todas as áreas</option>
          {areas.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>
      <div className="mt-6 card-white overflow-hidden">
        <table className="w-full divide-y divide-blue-500/30">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-white">Nome</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white">Cargo / Área</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white">Score atual</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white">Última avaliação</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white">Risco</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filtrados.map((c: Colaborador & { score: number; ultimaData?: string; risco: string }) => (
              <tr key={c.id} className="text-gray-300">
                <td className="px-4 py-3">{c.nome}</td>
                <td className="px-4 py-3">{c.cargo ?? "-"} / {c.area ?? "-"}</td>
                <td className="px-4 py-3">{c.score?.toFixed(1) ?? "-"}</td>
                <td className="px-4 py-3">{formatDate(c.ultimaData)}</td>
                <td className={`px-4 py-3 capitalize ${riscoColor(c.risco)}`}>{c.risco}</td>
                <td className="px-4 py-3">
                  <Link href={`/rh/colaboradores/${c.id}`} className="text-blue-400 hover:underline">
                    Avaliar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
