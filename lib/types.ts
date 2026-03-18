export type UserRole = "rh" | "gestao" | "colaborador";

export interface User {
  id: string;
  email: string;
  nome: string;
  role: UserRole;
}

export interface Colaborador {
  id: string;
  nome: string;
  email: string;
  cargo?: string;
  area?: string;
  gestorId?: string;
  dataAdmissao?: string;
}

export interface Avaliacao11 {
  id: string;
  colaboradorId: string;
  data: string;
  classificacao?: number;
  observacoes?: string;
}

export interface AvaliacaoRH {
  id: string;
  colaboradorId: string;
  data: string;
  classificacao?: number;
  observacoes?: string;
  riscoDesligamento?: "baixo" | "medio" | "alto";
  intervencoes?: string;
}

export interface DocumentoCompliance {
  id: string;
  tipo: string;
  titulo: string;
  versao?: string;
  status?: string;
  arquivo?: string;
}

export interface DocumentoColaborador {
  id: string;
  colaboradorId: string;
  tipo: string;
  titulo: string;
  dataUpload?: string;
  arquivo?: string;
}

export interface PesquisaClima {
  id: string;
  titulo: string;
  descricao?: string;
  tipo: "pulse" | "completa";
  dataInicio?: string;
  dataFim?: string;
  status?: string;
}

export interface RespostaPesquisa {
  id: string;
  pesquisaId: string;
  colaboradorId?: string;
  respostas: Record<string, unknown>;
}

export interface Comunicado {
  id: string;
  titulo: string;
  conteudo: string;
  tipo: "geral" | "area" | "individual";
  canais?: ("email" | "whatsapp" | "app")[];
  dataPublicacao?: string;
  status?: string;
}

export interface Sugestao {
  id: string;
  titulo: string;
  conteudo: string;
  status?: string;
}

export interface Treinamento {
  id: string;
  titulo: string;
  descricao?: string;
  tipo?: string;
  cargaHoraria?: number;
  dataInicio?: string;
  dataFim?: string;
  status?: string;
}

export interface Certificado {
  id: string;
  colaboradorId: string;
  titulo: string;
  instituicao?: string;
  dataEmissao?: string;
}

export interface TrilhaAprendizagem {
  id: string;
  titulo: string;
  descricao?: string;
  modulos?: string[];
}

export interface NPSResposta {
  id: string;
  colaboradorId?: string;
  nota: number;
  comentario?: string;
  data?: string;
}

export interface EntregaTrilha {
  id: string;
  trilhaId: string;
  colaboradorId: string;
  titulo: string;
  status?: "pendente" | "em_andamento" | "entregue" | "aprovado";
  dataEntrega?: string;
}
