"use client";

import Link from "next/link";

export default function PainelPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Painel RH</h1>
      <p className="mt-1 text-gray-300">Bem-vinda, Adriana!</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="card-white p-6">
          <h3 className="text-lg font-semibold text-white">Gestão de Pessoas</h3>
          <p className="mt-2 text-gray-400">Acesse colaboradores e organograma</p>
          <Link href="/rh/gestao-pessoas" className="mt-4 inline-block text-blue-400 hover:underline">
            Acessar →
          </Link>
        </div>
        <div className="card-white p-6">
          <h3 className="text-lg font-semibold text-white">Avaliação Individual</h3>
          <p className="mt-2 text-gray-400">Scores e avaliações 1:1</p>
          <Link href="/rh/avaliacao" className="mt-4 inline-block text-blue-400 hover:underline">
            Acessar →
          </Link>
        </div>
        <div className="card-white p-6">
          <h3 className="text-lg font-semibold text-white">NPS</h3>
          <p className="mt-2 text-gray-400">Pesquisa de satisfação</p>
          <Link href="/rh/nps" className="mt-4 inline-block text-blue-400 hover:underline">
            Acessar →
          </Link>
        </div>
      </div>
    </div>
  );
}
