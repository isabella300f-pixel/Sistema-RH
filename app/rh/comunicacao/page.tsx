"use client";

import { useState } from "react";
import { MOCK_COMUNICADOS, MOCK_SUGESTOES } from "@/lib/data";
import type { Comunicado, Sugestao } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function ComunicacaoPage() {
  const [aba, setAba] = useState<"comunicados" | "sugestoes" | "biblioteca">("comunicados");

  return (
    <div>
      <h1 className="text-3xl font-bold text-venda-cream">Comunicação Interna</h1>
      <p className="mt-1 text-venda-cream/80">Comunicados e caixa de sugestões</p>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setAba("comunicados")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "comunicados" ? "bg-venda-gold text-venda-dark" : "bg-amber-900/20 text-venda-cream/80 hover:bg-amber-900/30"}`}
        >
          Comunicados
        </button>
        <button
          onClick={() => setAba("sugestoes")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "sugestoes" ? "bg-venda-gold text-venda-dark" : "bg-amber-900/20 text-venda-cream/80 hover:bg-amber-900/30"}`}
        >
          Caixa de Sugestões
        </button>
        <button
          onClick={() => setAba("biblioteca")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "biblioteca" ? "bg-venda-gold text-venda-dark" : "bg-amber-900/20 text-venda-cream/80 hover:bg-amber-900/30"}`}
        >
          Biblioteca
        </button>
      </div>
      {aba === "comunicados" && (
        <>
          <button className="mt-6 rounded-lg bg-venda-gold px-4 py-2 text-venda-dark hover:opacity-90">
            Novo Comunicado
          </button>
          <div className="mt-6 card-white overflow-hidden">
            <table className="w-full divide-y divide-amber-900/30">
              <thead className="bg-amber-900/20">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Título</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Tipo</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Data</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-900/30">
                {MOCK_COMUNICADOS.map((c) => (
                  <tr key={c.id} className="text-venda-cream/80">
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
          <table className="w-full divide-y divide-amber-900/30">
            <thead className="bg-amber-900/20">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Título</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/30">
              {MOCK_SUGESTOES.map((s) => (
                <tr key={s.id} className="text-venda-cream/80">
                  <td className="px-4 py-3">{s.titulo}</td>
                  <td className="px-4 py-3">{s.status ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {aba === "biblioteca" && <div className="mt-6 card-white p-6 text-venda-cream/70">Biblioteca de documentos.</div>}
    </div>
  );
}
