"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllColaboradores } from "@/lib/data";
import type { Colaborador } from "@/lib/types";
import { formatDate, getDaysSince } from "@/lib/utils";

export default function GestaoPessoasPage() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [filtroArea, setFiltroArea] = useState("");

  useEffect(() => {
    getAllColaboradores().then((data) => {
      setColaboradores(data);
      setLoading(false);
    });
  }, []);

  const areas = Array.from(new Set(colaboradores.map((c) => c.area).filter(Boolean))) as string[];
  const filtrados = colaboradores.filter((c) => {
    const matchBusca = !busca || c.nome.toLowerCase().includes(busca.toLowerCase()) || (c.email?.toLowerCase().includes(busca.toLowerCase()));
    const matchArea = !filtroArea || c.area === filtroArea;
    return matchBusca && matchArea;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-ecosystem-red border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Gestão de Pessoas</h1>
      <p className="mt-1 text-gray-300">Colaboradores e organograma</p>
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
              <th className="px-4 py-3 text-left text-sm font-medium text-white">Cargo</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white">Área</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white">Admissão</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white">Tempo de casa</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filtrados.map((c) => (
              <tr key={c.id} className="text-gray-300">
                <td className="px-4 py-3">{c.nome}</td>
                <td className="px-4 py-3">{c.cargo ?? "-"}</td>
                <td className="px-4 py-3">{c.area ?? "-"}</td>
                <td className="px-4 py-3">{formatDate(c.dataAdmissao)}</td>
                <td className="px-4 py-3">{getDaysSince(c.dataAdmissao)} dias</td>
                <td className="px-4 py-3">
                  <Link href={`/rh/colaboradores/${c.id}`} className="text-blue-400 hover:underline">
                    Ver Perfil
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
