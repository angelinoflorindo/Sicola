export interface UserPerfonal {
  id: any;
  email: any;
  curso: any;
  password: any;
  primeiro_nome: any;
  segundo_nome: any;
  telemovel: any;
  perfil: any;
  filename: any;
  estado: any;
  situacao: any;
  createdAt: any;
  updatedAt: any;
}

export interface AcessoProps {
  id: any;
  inicio: any;
  fim: any;
  plano: any;
  user_id: any;
  estado: any;
  createdAt: any;
  updatedAt: any;
}

export interface PagamentoProps {
  id: any;
  valor: any;
  status: any;
  plano: any;
  user_id: any;
  estado: any;
  createdAt: any;
  updatedAt: any;
}

export interface SugestaoInfo {
  id: any;
  descricao: any;
  estado: any;
  createdAt: any;
  updatedAt: any;
  Usuario: {
    id: any;
    primeiro_nome: any;
    segundo_nome: any;
    email: any;
    telemovel: any;
    perfil: any;
  };
}

export interface PagamentoInfo {
  id: any;
  valor: any;
  status: any;
  plano: any;
  user_id: any;
  estado: any;
  createdAt: any;
  updatedAt: any;
  Usuario: {
    id: any;
    primeiro_nome: any;
    segundo_nome: any;
    email: any;
    telemovel: any;
  };
}

export interface OrientadorInfo {
  id: any;
  email: any;
  curso: any;
  password: any;
  primeiro_nome: any;
  segundo_nome: any;
  telemovel: any;
  perfil: any;
  filename: any;
  estado: any;
  situacao: any;
  createdAt: any;
  updatedAt: any;
  UserDisciplina: Cadeiras[];
}
export interface Cadeiras {
  id: any;
  user_id: any;
  disciplina_id: any;
  estado: any;
  createdAt: any;
  updatedAt: any;
  Disciplina: {
    id: any;
    nome: any;
    codigo: any;
    createdAt: any;
    updatedAt: any;
  };
}
