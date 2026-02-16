type Modulo = {
  id: string;
  nome: string;
  playlistId: string;
};

type Curso = {
  id: string;
  nome: string;
  modulos: Modulo[];
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