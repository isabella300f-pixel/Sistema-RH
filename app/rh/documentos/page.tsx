"use client";

import { useEffect, useState } from "react";
import { MOCK_DOCUMENTOS_COMPLIANCE, MOCK_DOCUMENTOS_COLABORADOR } from "@/lib/data";
import type { DocumentoCompliance, DocumentoColaborador } from "@/lib/types";

export default function DocumentosPage() {
  const [aba, setAba] = useState<"compliance" | "colaboradores" | "vencimentos">("compliance");
  const [docsCompliance] = useState<DocumentoCompliance[]>(MOCK_DOCUMENTOS_COMPLIANCE);
  const [docsColab] = useState<DocumentoColaborador[]>(MOCK_DOCUMENTOS_COLABORADOR);

  return (
    <div>
      <h1 className="text-3xl font-bold text-venda-cream">Documentos</h1>
      <p className="mt-1 text-venda-cream/80">Documentos e compliance</p>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setAba("compliance")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "compliance" ? "bg-venda-gold text-venda-dark" : "bg-amber-900/20 text-venda-cream/80 hover:bg-amber-900/30"}`}
        >
          Compliance
        </button>
        <button
          onClick={() => setAba("colaboradores")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "colaboradores" ? "bg-venda-gold text-venda-dark" : "bg-amber-900/20 text-venda-cream/80 hover:bg-amber-900/30"}`}
        >
          Documentos de Colaboradores
        </button>
        <button
          onClick={() => setAba("vencimentos")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "vencimentos" ? "bg-venda-gold text-venda-dark" : "bg-amber-900/20 text-venda-cream/80 hover:bg-amber-900/30"}`}
        >
          Vencimentos
        </button>
      </div>
      <div className="mt-6 card-white overflow-hidden">
        {aba === "compliance" && (
          <table className="w-full divide-y divide-amber-900/30">
            <thead className="bg-amber-900/20">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Tipo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Título</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Versão</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/30">
              {docsCompliance.map((d) => (
                <tr key={d.id} className="text-venda-cream/80">
                  <td className="px-4 py-3">{d.tipo}</td>
                  <td className="px-4 py-3">{d.titulo}</td>
                  <td className="px-4 py-3">{d.versao ?? "-"}</td>
                  <td className="px-4 py-3">{d.status ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {aba === "colaboradores" && (
          <table className="w-full divide-y divide-amber-900/30">
            <thead className="bg-amber-900/20">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Colaborador ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Tipo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Título</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-venda-cream">Data Upload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/30">
              {docsColab.map((d) => (
                <tr key={d.id} className="text-venda-cream/80">
                  <td className="px-4 py-3">{d.colaboradorId}</td>
                  <td className="px-4 py-3">{d.tipo}</td>
                  <td className="px-4 py-3">{d.titulo}</td>
                  <td className="px-4 py-3">{d.dataUpload ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {aba === "vencimentos" && (
          <div className="p-6 text-venda-cream/70">Nenhum documento com vencimento próximo.</div>
        )}
      </div>
    </div>
  );
}
