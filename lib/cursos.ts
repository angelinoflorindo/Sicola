type Modulo = {
  id: string;
  nome: string;
  playlistId: string;
};
type Video = {
  id: string;
  nome: string;
  videoId: string;
};
type Curso = {
  id: string;
  nome: string;
  modulos: Modulo[];
  videos?: Video[];
};

export const cursos: Curso[] = [
  {
    id: "calculo",
    nome: "Cálculo Financeiro",
    modulos: [
      {
        id: "geral",
        nome: "Conteúdo Geral",
        playlistId: "PLX-4skTGVrWWTbH72P6u7d_VtgMcxk7dn",
      },
      {
        id: "seria-pa-pg",
        nome: "Cálculo: Séries Varáveis",
        playlistId: "PLairnsnZ1EeT1bxYLpEQaG8CdxU-y0yjs",
      },
    ],
    videos: [
      {
        id: "factoring",
        nome: "Factoring",
        videoId: "RL3hEtdV1UQ",
      },
    ],
  },

  {
    id: "contabilidade",
    nome: "Contabilidade",
    modulos: [
      {
        id: "salario",
        nome: "Processamento de Salário",
        playlistId: "PLMEU9-QjzhJhvvmmE_naKkhlkGdDZkmmd",
      },
      {
        id: "iva",
        nome: "Registo do IVA",
        playlistId: "PLXqqg0LhbpFndyhBsu21yunkxBUb6DPhJ&index=2",
      },
      {
        id: "operacoes",
        nome: "Operações do exercício",
        playlistId: "PLMEU9-QjzhJj1Qpf0mgPcKRc6OEsQYAWL",
      },
    ],
    videos: [
      {
        id: "inventario",
        nome: "Inventário Patrimonial",
        videoId: "1G-TfJPkUjs",
      },
      {
        id: "balanco",
        nome: "Balanço inicial e Final",
        videoId: "JR_CEn73KKE",
      },
      
       {
        id: "quotas-constantes",
        nome: "Amortização: Quotas Constantes",
        videoId: "mg09MXSpIRA",
      },
      {
        id: "quotas-degressivas",
        nome: "Amortização: Quotas Degressivas",
        videoId: "mX8ITy-6p7w",
      },
    ],
  },
  {
    id: "matematica",
    nome: "Matemática",
    modulos: [
      {
        id: "calculo",
        nome: "Cálculo: Noções  Fundamentais",
        playlistId: "PLEfwqyY2ox86LhxKybOY3_IG-7R5herLC",
      },
      {
        id: "matrizes",
        nome: "Matrizes e Determinantes",
        playlistId: "PLEfwqyY2ox868TPa8vjL-QPfQlmtqRGa5",
      },
      {
        id: "funcoes",
        nome: "Estudo completo de funções",
        playlistId: "PLTPg64KdGgYiYqKmotPzPJVchCwKpTLzm&index",
      },
    ],
  },

  {
    id: "estatisticaI",
    nome: "Estatística I",
    modulos: [
      {
        id: "geral",
        nome: "Conteudo Geral",
        playlistId: "PLX-4skTGVrWUNh2VGFIyoWVGEVRQq3gkB&index=1",
      },
    ],
  },
];
