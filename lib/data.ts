import type {
  Colaborador,
  Avaliacao11,
  AvaliacaoRH,
  Treinamento,
  DocumentoCompliance,
  DocumentoColaborador,
  PesquisaClima,
  Comunicado,
  Sugestao,
  NPSResposta,
  EntregaTrilha,
  TrilhaAprendizagem,
} from "./types";

// Mock: usuário Adriana (perfil RH)
export const ADRIANA_USER = {
  id: "adriana-1",
  email: "adriana@empresa.com",
  nome: "Adriana",
  role: "rh" as const,
};

// Colaboradores mock
export const MOCK_COLABORADORES: Colaborador[] = [
  { id: "1", nome: "João Silva", email: "joao@empresa.com", cargo: "Analista", area: "TI", dataAdmissao: "2022-01-15" },
  { id: "2", nome: "Maria Santos", email: "maria@empresa.com", cargo: "Coordenadora", area: "RH", dataAdmissao: "2021-06-01" },
  { id: "3", nome: "Pedro Costa", email: "pedro@empresa.com", cargo: "Desenvolvedor", area: "TI", dataAdmissao: "2023-03-10" },
];

// Avaliações 1:1 mock
export const MOCK_AVALIACOES_11: Avaliacao11[] = [
  { id: "a1", colaboradorId: "1", data: "2024-01-10", classificacao: 4, observacoes: "Bom desempenho" },
  { id: "a2", colaboradorId: "1", data: "2024-02-15", classificacao: 5, observacoes: "Excelente" },
  { id: "a3", colaboradorId: "2", data: "2024-01-20", classificacao: 4, observacoes: "Ótimo" },
];

// Avaliações RH mock
export const MOCK_AVALIACOES_RH: AvaliacaoRH[] = [
  { id: "r1", colaboradorId: "1", data: "2024-02-20", classificacao: 4, riscoDesligamento: "baixo" },
  { id: "r2", colaboradorId: "2", data: "2024-02-18", classificacao: 5, riscoDesligamento: "baixo" },
];

// Treinamentos mock
export const MOCK_TREINAMENTOS: Treinamento[] = [
  { id: "t1", titulo: "Liderança", descricao: "Curso de liderança", tipo: "online", cargaHoraria: 20, dataInicio: "2024-01-01", dataFim: "2024-01-31", status: "concluido" },
  { id: "t2", titulo: "Comunicação", descricao: "Comunicação assertiva", tipo: "presencial", cargaHoraria: 8, dataInicio: "2024-03-01", dataFim: "2024-03-02", status: "em_andamento" },
];

// Documentos mock
export const MOCK_DOCUMENTOS_COMPLIANCE: DocumentoCompliance[] = [
  { id: "d1", tipo: "Política", titulo: "Política de RH", versao: "1.0", status: "ativo" },
  { id: "d2", tipo: "Regulamento", titulo: "Regulamento Interno", versao: "2.1", status: "ativo" },
];

export const MOCK_DOCUMENTOS_COLABORADOR: DocumentoColaborador[] = [
  { id: "dc1", colaboradorId: "1", tipo: "Contrato", titulo: "Contrato CLT", dataUpload: "2022-01-15" },
];

// Pesquisas clima mock
export const MOCK_PESQUISAS_CLIMA: PesquisaClima[] = [
  { id: "p1", titulo: "Pesquisa Pulse Março", descricao: "Pesquisa rápida", tipo: "pulse", dataInicio: "2024-03-01", dataFim: "2024-03-15", status: "aberta" },
];

// Comunicados mock
export const MOCK_COMUNICADOS: Comunicado[] = [
  { id: "c1", titulo: "Novo horário", conteudo: "A partir de abril...", tipo: "geral", dataPublicacao: "2024-03-10", status: "publicado" },
];

// Sugestões mock
export const MOCK_SUGESTOES: Sugestao[] = [
  { id: "s1", titulo: "Melhorar cafeteria", conteudo: "Sugestão de melhorias...", status: "aberta" },
];

// NPS mock
export const MOCK_NPS: NPSResposta[] = [
  { id: "n1", colaboradorId: "1", nota: 9, comentario: "Ótimo ambiente", data: "2024-03-01" },
  { id: "n2", colaboradorId: "2", nota: 8, data: "2024-03-02" },
];

// Trilhas de aprendizagem mock
export const MOCK_TRILHAS: TrilhaAprendizagem[] = [
  { id: "tr1", titulo: "Trilha Liderança", descricao: "Desenvolvimento de líderes", modulos: ["Módulo 1", "Módulo 2"] },
  { id: "tr2", titulo: "Trilha Técnica", descricao: "Competências técnicas", modulos: ["Módulo 1", "Módulo 2", "Módulo 3"] },
];

// Entregas trilha mock
export const MOCK_ENTREGAS_TRILHA: EntregaTrilha[] = [
  { id: "e1", trilhaId: "tr1", colaboradorId: "1", titulo: "Entrega 1 - Liderança", status: "entregue", dataEntrega: "2024-02-28" },
  { id: "e2", trilhaId: "tr1", colaboradorId: "2", titulo: "Entrega 1 - Liderança", status: "em_andamento" },
];

// Funções de acesso aos dados
export async function getAllColaboradores(): Promise<Colaborador[]> {
  return MOCK_COLABORADORES;
}

export async function getColaboradorById(id: string): Promise<Colaborador | null> {
  return MOCK_COLABORADORES.find((c) => c.id === id) ?? null;
}

export async function getAllAvaliacoes11(): Promise<Avaliacao11[]> {
  return MOCK_AVALIACOES_11;
}

export async function getAvaliacoes11ByColaborador(colaboradorId: string): Promise<Avaliacao11[]> {
  return MOCK_AVALIACOES_11.filter((a) => a.colaboradorId === colaboradorId);
}

export async function getAllAvaliacoesRH(): Promise<AvaliacaoRH[]> {
  return MOCK_AVALIACOES_RH;
}

export async function getAvaliacoesRHByColaborador(colaboradorId: string): Promise<AvaliacaoRH[]> {
  return MOCK_AVALIACOES_RH.filter((a) => a.colaboradorId === colaboradorId);
}

export async function getUltimaAvaliacao(colaboradorId: string): Promise<Avaliacao11 | null> {
  const list = (await getAvaliacoes11ByColaborador(colaboradorId)).sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );
  return list[0] ?? null;
}

export function getRiscoDesligamento(colaboradorId: string, avaliacoesRH: AvaliacaoRH[]): "baixo" | "medio" | "alto" {
  const last = avaliacoesRH.find((a) => a.colaboradorId === colaboradorId);
  return last?.riscoDesligamento ?? "baixo";
}

export async function createAvaliacaoRH(data: Partial<AvaliacaoRH>): Promise<AvaliacaoRH> {
  const newId = `r${Date.now()}`;
  const nova: AvaliacaoRH = {
    id: newId,
    colaboradorId: data.colaboradorId ?? "",
    data: data.data ?? new Date().toISOString().split("T")[0],
    classificacao: data.classificacao,
    observacoes: data.observacoes,
    riscoDesligamento: data.riscoDesligamento ?? "baixo",
    intervencoes: data.intervencoes,
  };
  MOCK_AVALIACOES_RH.push(nova);
  return nova;
}
