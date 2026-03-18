"use client";

export default function PerfilPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-venda-cream">Perfil - Adriana</h1>
      <p className="mt-1 text-venda-cream/80">Dados do seu perfil de usuário</p>
      <div className="mt-8 card-white p-6">
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-venda-cream/70">Nome</dt>
            <dd className="mt-1 text-venda-cream">Adriana</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-venda-cream/70">E-mail</dt>
            <dd className="mt-1 text-venda-cream">adriana@empresa.com</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-venda-cream/70">Função</dt>
            <dd className="mt-1 text-venda-cream">RH</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
