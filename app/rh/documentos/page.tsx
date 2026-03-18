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
      <h1 className="text-3xl font-bold text-white">Documentos</h1>
      <p className="mt-1 text-gray-300">Documentos e compliance</p>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setAba("compliance")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "compliance" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          Compliance
        </button>
        <button
          onClick={() => setAba("colaboradores")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "colaboradores" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          Documentos de Colaboradores
        </button>
        <button
          onClick={() => setAba("vencimentos")}
          className={`rounded-lg px-4 py-2 text-sm ${aba === "vencimentos" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
        >
          Vencimentos
        </button>
      </div>
      <div className="mt-6 card-white overflow-hidden">
        {aba === "compliance" && (
          <table className="w-full divide-y divide-blue-500/30">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Tipo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Título</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Versão</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {docsCompliance.map((d) => (
                <tr key={d.id} className="text-gray-300">
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
          <table className="w-full divide-y divide-blue-500/30">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Colaborador ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Tipo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Título</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-white">Data Upload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {docsColab.map((d) => (
                <tr key={d.id} className="text-gray-300">
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
          <div className="p-6 text-gray-400">Nenhum documento com vencimento próximo.</div>
        )}
      </div>
    </div>
  );
}
