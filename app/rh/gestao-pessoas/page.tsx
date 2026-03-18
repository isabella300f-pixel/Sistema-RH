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
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-venda-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-venda-cream">Gestão de Pessoas</h1>
      <p className="mt-1 text-venda-cream/80">Colaboradores e organograma</p>
      <div className="mt-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="rounded-lg border border-amber-900/40 bg-venda-charcoal px-4 py-2 text-venda-cream placeholder-amber-200/50"
        />
        <select
          value={filtroArea}
          onChange={(e) => setFiltroArea(e.target.value)}
          className="rounded-lg border border-amber-900/40 bg-venda-charcoal px-4 py-2 text-venda-cream"
        >
          <option value="">Todas as áreas</option>
          {areas.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>
      <div className="mt-6 card-white overflow-hidden">
        <table className="w-full divide-y divide-amber-900/30">
          <thead className="bg-amber-900/20">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Nome</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Cargo</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Área</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Admissão</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Tempo de casa</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-900/30">
            {filtrados.map((c) => (
              <tr key={c.id} className="text-venda-cream/80">
                <td className="px-4 py-3">{c.nome}</td>
                <td className="px-4 py-3">{c.cargo ?? "-"}</td>
                <td className="px-4 py-3">{c.area ?? "-"}</td>
                <td className="px-4 py-3">{formatDate(c.dataAdmissao)}</td>
                <td className="px-4 py-3">{getDaysSince(c.dataAdmissao)} dias</td>
                <td className="px-4 py-3">
                  <Link href={`/rh/colaboradores/${c.id}`} className="text-venda-gold hover:underline">
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
