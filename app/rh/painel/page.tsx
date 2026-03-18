"use client";

import Link from "next/link";

export default function PainelPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-venda-cream">Painel</h1>
      <p className="mt-1 text-venda-cream/80">Bem-vinda, Adriana!</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="card-white p-6">
          <h3 className="text-lg font-semibold text-venda-cream">Gestão de Pessoas</h3>
          <p className="mt-2 text-venda-cream/70">Acesse colaboradores e organograma</p>
          <Link href="/rh/gestao-pessoas" className="mt-4 inline-block text-venda-gold hover:underline">
            Acessar →
          </Link>
        </div>
        <div className="card-white p-6">
          <h3 className="text-lg font-semibold text-venda-cream">Avaliação Individual</h3>
          <p className="mt-2 text-venda-cream/70">Scores e avaliações 1:1</p>
          <Link href="/rh/avaliacao" className="mt-4 inline-block text-venda-gold hover:underline">
            Acessar →
          </Link>
        </div>
        <div className="card-white p-6">
          <h3 className="text-lg font-semibold text-venda-cream">NPS</h3>
          <p className="mt-2 text-venda-cream/70">Pesquisa de satisfação</p>
          <Link href="/rh/nps" className="mt-4 inline-block text-venda-gold hover:underline">
            Acessar →
          </Link>
        </div>
      </div>
    </div>
  );
}
