"use client";

export default function PerfilPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Perfil - Adriana</h1>
      <p className="mt-1 text-gray-300">Dados do seu perfil de usuário</p>
      <div className="mt-8 card-white p-6">
        <dl className="space-y-4">
          <div>
            <dt className="text-sm font-medium text-gray-400">Nome</dt>
            <dd className="mt-1 text-white">Adriana</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-400">E-mail</dt>
            <dd className="mt-1 text-white">adriana@empresa.com</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-400">Função</dt>
            <dd className="mt-1 text-white">RH</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
