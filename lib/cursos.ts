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
    nome: "Estatística",
    modulos: [
      {
        id: "geral",
        nome: "Conteudo Geral",
        playlistId: "PLX-4skTGVrWUNh2VGFIyoWVGEVRQq3gkB&index=1",
      },
    ],
  },
  {
    id: "Analitica",
    nome: "Contabilidade Analítica",
    modulos: [
      {
        id: "reparticao",
        nome: "Repartição de Encargos Indirectos",
        playlistId: "PLMEU9-QjzhJjcHXKeao3HhVOcMxDyxMMt",
      },
      {
        id: "exercicios",
        nome: "Exercícios Resolvidos",
        playlistId: "PLMEU9-QjzhJiKzarpLNqfFLsmQYhsHuPK",
      },
      {
        id: "concurso",
        nome: "Resolução de Provas de Concurso",
        playlistId: "PLMEU9-QjzhJgAsI74bXHPSMeTNWb5iTyO",
      },
      {
        id: "custo",
        nome: "Custo Industrial",
        playlistId: "PLMEU9-QjzhJgjB6NuWuC6f04X9oztLerR",
      },
    ],
  },
  {
    id: "fiscalidade",
    nome: "Fiscalidade",
    modulos: [
      {
        id: "tudofiscalidade",
        nome: "Conceitos de Fiscalidade",
        playlistId: "PLMEU9-QjzhJhvvmmE_naKkhlkGdDZkmmd",
      },
    ],
  },

  {
    id: "fisica",
    nome: "Física",
    modulos: [
      {
        id: "cinematica1",
        nome: "Parte 1: Cinemática",
        playlistId: "PLzjR7HXQnrccLJC47rXCJVJMHSBYjDTyy",
      },
      {
        id: "cinematica2",
        nome: "Parte 2: Cinemática",
        playlistId: "PLzjR7HXQnrceNJ2pUl9afkCMkTubbvCbz",
      },

      {
        id: "tudocinematica",
        nome: "Tudo sobre Cinemática",
        playlistId: "PLzjR7HXQnrcf1rHb6E33Rbo5xP7ZbMM6s",
      },
      {
        id: "electrodinamica",
        nome: "Electrodinamica",
        playlistId: "PLzjR7HXQnrcfSiQpi_1nGHZLKS6AKtv9O",
      },

      {
        id: "tudElectrodinamica",
        nome: "Tudo sobre Electrodinamica",
        playlistId: "PLzjR7HXQnrccZoUGxqJuN2SFd83PH0yRz",
      },
      {
        id: "optica",
        nome: "Fundamentos de Óptica",
        playlistId: "PLzjR7HXQnrcdqSPfvOvU2Z2IGXfKRP0u3",
      },
      {
        id: "opticageometrica",
        nome: "Óptica Geométrica",
        playlistId: "PLzjR7HXQnrcejt6bCK57Wxnwa6K9rqt3X",
      },
      {
        id: "termologia",
        nome: "Termologia",
        playlistId: "PLzjR7HXQnrccNvQPKqmf5DIgHIB2gEtv8",
      },

      {
        id: "cursoDinamica",
        nome: "Curso de Dinâmica",
        playlistId: "PLzjR7HXQnrcd5texPyBTomAFef7oN2Bd0",
      },
      {
        id: "dinamica",
        nome: "Conceitos de Dinâmica",
        playlistId: "PLzjR7HXQnrcdJSrrM2DbJ-LHuFwRR31Uc",
      },
      {
        id: "eletromagnetismo",
        nome: "Fundamentos de Eletromagnetismo",
        playlistId: "PLzjR7HXQnrcd0_HOcaVJ5BNRdoIBy9A36",
      },
    ],
  },

  {
    id: "portugues",
    nome: "Comunicação: Língua Portuguesa",
    modulos: [
      {
        id: "cursoPortugues",
        nome: "Curso de Língua Portuguesa",
        playlistId: "PLToTKj2C0mWCvfKFw2ppQkd3qv6PfShu9",
      },

      {
        id: "gramatica",
        nome: "Gramática de Língua Portuguesa",
        playlistId: "PLToTKj2C0mWDJowVTjT0FWL14dhXOVP9p",
      },
    ],
  },
];
