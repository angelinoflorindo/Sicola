export const primeiroGrupoContabilidadeII = [
  {
    id: 1,
    enunciado:
      "Com base no balancete da empresa (31 de dezembro de 2024), a empresa realizou as seguintes operações, das quais pretende-se",
    tabela: {
      cabecalho: ["Contas", "Movimentos", "Saldos"],
      subcabecalho: ["", "Débito", "Crédito", "Devedor", "Credor"],
      dados: [
        ["Edifícios e outras Construções", "500 000,00", "", "500 000,00", ""],
        [
          "Equipamentos de carga e transporte",
          "200 000,00",
          "",
          "200 000,00",
          "",
        ],
        ["Equipamentos Administrativos", "300 000,00", "", "300 000,00", ""],
        ["Mercadorias", "1 000 000,00", "525.000,00", "475 000,00", ""],
        ["Clientes", "600 000,00", "500.000,00", "100 000,00", ""],
        ["Banco", "4 525 000,00", "500 000,00", "4 025 000,00", ""],
        ["Caixa", "350 000,00", "150 000,00", "200 000,00", ""],
        ["Fornecedores", "400 000,00", "900 000,00", "", "500 000,00"],
        ["Empréstimos Bancários (3 meses)", "", "500 000,00", "", "500 000,00"],
        ["Capital Social", "", "2 500 000,00", "", "2 500 000,00"],
        ["Resultados Líquidos (2023)", "400 000,00", "400 000,00", "", ""],
        ["Vendas/Mercadorias", "", "3 500.000,00", "", "3 500.000,00"],
        [
          "Total",
          "12 078 333,33",
          "12 078 333,33",
          "7 525 000,00",
          "7 525 000,00",
        ],
      ],
    },
    subitens: [
      "1.	Lançamento no diário e pagamento do IVA de Novembro (C.C Ex:. 75.2). 10 V ",
      "2.	Apuramento do IVA de Dezembro; 1,5 V. ",
      "3.	 Registar o rédito do Subsídio. 1,5V",
      "4.	Balancete Final ( Não precisa descrever as contas, basta apenas o código). 1V",
      "5.	Balanço Final e DRE.  2V",
    ],
  },

  {
    id: 2,
    tipo: "UNICA",
    cotacao: 1,
    enunciado: ` 
    Recebimento de um adiantamento do cliente XPTO, no valor de 150.000kz. 
    À data do recebimento, ainda não havia um preço fixado, pois o cliente 
    fez uma encomenda de 100 Itens, que a Empresa não tinha em stock e 
    precisa adquirir. 
    `,
    opcoes: [
      {
        texto: "Adiantamento falso",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["45.1", "150.000,00", ""],
            ["31.9", "", "131.578,95"],
            ["34.5.2", "", "18.421,05"],
          ],
        },
      },
      {
        texto: "Adiantamento correto",
        correta: true,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["43.1", "150.000,00", ""],
            ["31.9", "", "131.578,95"],
            ["34.5.3", "", "18.421,05"],
          ],
        },
      },

      {
        texto: "Adiantamento falso",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["42.1", "150.000,00", ""],
            ["31.9", "", "171.000,00"],
            ["34.5.2", "", "21.000,00"],
          ],
        },
      },
    ],
  },
  {
    id: 3,
    tipo: "UNICA",
    cotacao: 1,
    enunciado: `
  Compra de mercadorias ao fornecedor Tudo Tem, LDA, de 100 itens
  a 2.000 Kz cada (IVA não incluído).
  Desconto comercial de 2% e desconto financeiro de 1%.
  `,
    opcoes: [
      {
        texto: "Erro: desconto financeiro tratado como comercial",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["21.2", "200.000,00", ""],
            ["21.8", "", "5.000,00"], // alteração no crédito do desconto
            ["66.3", "", "1.960,00"],
            ["34.5.3", "27.165,60", ""], // conta incorreta
            ["32.1", "", "221.205,60"],
            ["26.1", "196.000,00", ""],
            ["21.2", "", "200.000,00"],
            ["21.8", "4.500,00", ""], // alteração no débito do desconto
            ["32.1", "221.205,60", ""],
            ["43.1", "", "227.360,00"],
          ],
        },
      },
      {
        texto: "Erro: IVA calculado sobre valor bruto",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["21.2", "200.000,00", ""],
            ["21.8", "", "4.000,00"],
            ["66.3", "", "2.000,00"], // alteração no crédito do IVA
            ["34.5.2", "28.000,00", ""], // alteração no débito do IVA
            ["32.1", "", "221.205,60"],
            ["26.1", "196.000,00", ""],
            ["21.2", "", "200.000,00"],
            ["21.8", "4.000,00", ""],
            ["32.1", "220.000,00", ""], // valor alterado
            ["43.1", "", "227.360,00"],
          ],
        },
      },
      {
        texto: "Registo correto da compra",
        correta: true,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["21.2", "200.000,00", ""],
            ["21.8", "", "4.000,00"],
            ["66.3", "", "1.960,00"],
            ["34.5.2", "27.165,60", ""],
            ["32.1", "", "221.205,60"],
            ["26.1", "196.000,00", ""],
            ["21.2", "", "200.000,00"],
            ["21.8", "4.000,00", ""],
            ["32.1", "221.205,60", ""],
            ["43.1", "", "227.360,00"],
          ],
        },
      },
    ],
  },
  {
    id: 4,
    tipo: "UNICA",
    cotacao: 1,
    enunciado: `
  Venda ao cliente XPTO de 100 itens a 3.000 Kz cada (IVA incluído),
  com pagamento a 15 dias.
  `,

    opcoes: [
      {
        texto: "Registo correto da venda",
        correta: true,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["61.3", "", "263.157,89"],
            ["34.5.3", "", "36.842,11"],
            ["31.1", "300.000,00", ""],
            ["31.9", "131.578,95", ""],
            ["34.5.4", "18.421,05", ""],
            ["31.1", "", "150.000,00"],
            ["71.6", "196.000,00", ""],
            ["26.1", "", "196.000,00"],
          ],
        },
      },
      {
        texto: "Erro: IVA não separado do rédito",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["61.3", "", "300.000,00"], // IVA incluído no crédito da receita
            ["34.5.3", "", "40.000,00"], // valor do IVA alterado
            ["31.1", "300.000,00", ""],
            ["31.9", "150.000,00", ""], // lançamento incorreto do recebimento
            ["34.5.4", "20.000,00", ""], // valor do IVA alterado
            ["31.1", "", "150.000,00"],
            ["71.6", "200.000,00", ""], // valor alterado
            ["26.1", "", "196.000,00"],
          ],
        },
      },
      {
        texto: "Erro: venda registada como recebimento imediato",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["45.1", "300.000,00", ""], // lançamento direto em caixa
            ["71.1", "", "260.869,57"], // receita parcialmente correta
            ["34.5.3", "", "39.130,43"], // ajuste de IVA
            ["31.9", "100.000,00", ""], // débito adicional para simular erro
            ["34.5.4", "18.000,00", ""], // valor alterado
            ["31.1", "", "150.000,00"], // lançamento duplicado
            ["71.6", "180.000,00", ""], // valor alterado
            ["26.1", "", "196.000,00"], // mantido para confundir
          ],
        },
      },
    ],
  },
  {
    id: 5,
    tipo: "UNICA",
    cotacao: 0.75,
    enunciado: `
  Pagamento por transferência bancária referente
  às dívidas do ano anterior.
  `,

    opcoes: [
      {
        texto: "Erro: registado como custo do período",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["71.1", "500.000,00", ""], // custo errado
            ["78.1", "25.000,00", ""], // outros custos, erro de classificação
            ["43.1", "", "525.000,00"], // total consistente
          ],
        },
      },
      {
        texto: "Erro: pagamento registado em caixa",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["32.1", "500.000,00", ""], // débito certo
            ["45.1", "", "500.000,00"], // crédito errado: caixa em vez de depósito
            ["34.5.6", "", "25.000,00"], // ajuste do IVA para manter total
          ],
        },
      },
      {
        texto: "Liquidação correta da dívida",
        correta: true,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["32.1", "500.000,00", ""],
            ["34.5.6", "25.000,00", ""],
            ["43.1", "", "525.000,00"],
          ],
        },
      },
    ],
  },
  {
    id: 6,
    tipo: "UNICA",
    cotacao: 0.75,
    enunciado: `
  O cliente XPTO devolveu 10 itens da mercadoria adquirida.
  `,

    opcoes: [
      {
        texto: "Erro: devolução sem IVA",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["61.7", "30.000,00", ""], // débito sem IVA
            ["31.1", "", "30.000,00"], // crédito cliente
            ["26.1", "19.600,00", ""], // custo das mercadorias correto, mas sem IVA
            ["71.6", "", "19.600,00"], // venda corrigida, sem IVA
          ],
        },
      },
      {
        texto: "Erro: devolução registada como desconto",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["72.1", "26.315,79", ""], // custo incorreto: pessoal em vez de redução de vendas
            ["34.5.4", "3.684,21", ""], // IVA mantido
            ["31.1", "", "30.000,00"], // crédito cliente
            ["26.1", "19.600,00", ""], // custo mercadorias
            ["71.6", "", "19.600,00"], // crédito vendas
          ],
        },
      },
      {
        texto: "Devolução correta do cliente",
        correta: true,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["31.1", "", "30.000,00"],
            ["61.7", "26.315,79", ""],
            ["34.5.4", "3.684,21", ""],
            ["26.1", "19.600,00", ""],
            ["71.6", "", "19.600,00"],
          ],
        },
      },
    ],
  },
  {
    id: 7,
    tipo: "UNICA",
    cotacao: 0.75,
    enunciado: `
  Devolução ao fornecedor das mercadorias adquiridas
  na operação 2.
  `,

    opcoes: [
      {
        texto: "Erro: devolução sem IVA",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["32.1", "22.344,00", ""], // débito fornecedor
            ["21.7", "", "22.344,00"], // crédito compra, valor total sem separar IVA
            ["26.1", "", "19.600,00"], // mercadorias devolvidas corretas
          ],
        },
      },
      {
        texto: "Devolução correta ao fornecedor",
        correta: true,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["32.1", "22.344,00", ""],
            ["21.7", "", "19.600,00"],
            ["34.5.4", "", "2.744,00"],
            ["26.1", "", "19.600,00"],
            ["21.7", "19.600,00", ""],
          ],
        },
      },
      {
        texto: "Erro: devolução registada como custo",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["68.1", "19.600,00", ""], // custo incorreto
            ["32.1", "", "19.600,00"], // fornecedor
            ["34.5.4", "", "2.744,00"], // IVA mantido para confusão
            ["26.1", "", "19.600,00"], // mercadorias
          ],
        },
      },
    ],
  },

  {
    id: 8,
    tipo: "UNICA",
    cotacao: 1,
    enunciado: `
  O Estado subsidiou uma viatura no valor de 400.000 Kz,
  com vida útil estimada de 8 anos.
  `,

    opcoes: [
      {
        texto: "Erro: subsídio reconhecido como rédito imediato",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["43.1", "800.000,00", ""], // banco
            ["61.3", "", "800.000,00"], // reconhecido como venda (erro)
            ["37.6.3", "", "400.000,00"], // subsídio transitório
            ["43.1", "400.000,00", ""], // banco
            ["61.6", "400.000,00", ""], // lançamento fictício para igualar linhas
            ["61.3", "", "400.000,00"], // lançamento fictício para igualar linhas
          ],
        },
      },
      {
        texto: "Registo correto do subsídio",
        correta: true,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["11.4", "800.000,00", ""],
            ["37.1", "", "800.000,00"],
            ["37.6.3", "", "400.000,00"],
            ["43.1", "400.000,00", ""],
            ["37.1", "800.000,00", ""],
            ["43.1", "", "800.000,00"],
          ],
        },
      },
      {
        texto: "Erro: subsídio registado como capital social",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["11.4", "800.000,00", ""], // ativo
            ["51.1", "", "800.000,00"], // capital social (erro)
            ["37.6.3", "400.000,00", ""], // lançamento fictício
            ["43.1", "", "400.000,00"], // lançamento fictício
            ["37.1", "800.000,00", ""], // lançamento fictício
            ["43.1", "", "800.000,00"], // lançamento fictício
          ],
        },
      },
    ],
  },
  {
    id: 9,
    tipo: "UNICA",
    cotacao: 0.75,
    enunciado: `
  Aplicação financeira no Banco BAI no valor de 1.500.000 Kz,
  com prazo de 3 meses.
  `,

    opcoes: [
      {
        texto: "Registo correto da aplicação",
        correta: true,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["43.1", "", "1.500.000,00"], // depósito à ordem
            ["42.1", "1.500.000,00", ""], // depósito a prazo
            ["37.3", "5.000,00", ""], // juros a receber
            ["66.1", "", "5.000,00"], // proveitos financeiros
            ["75.3", "500,00", ""], // perdas sobre aplicações
            ["37.5", "", "500,00"], // ajuste de aplicação
          ],
        },
      },
      {
        texto: "Erro: aplicação registada como gasto",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["68.1", "1.500.000,00", ""], // outros proveitos/ganhos não operacionais (erro)
            ["12.1", "", "1.500.000,00"], // imobilização incorreta
            ["68.1", "5.000,00", ""], // juros tratados como gasto
            ["12.1", "", "5.000,00"], // ajuste fictício
            ["68.1", "500,00", ""], // perdas fictícias
            ["12.1", "", "500,00"], // ajuste fictício
          ],
        },
      },
      {
        texto: "Erro: aplicação registada como empréstimo concedido",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["33.1", "1.500.000,00", ""], // empréstimos a terceiros (erro)
            ["12.1", "", "1.500.000,00"], // imobilização incorreta
            ["33.1", "5.000,00", ""], // juros lançados no empréstimo
            ["12.1", "", "5.000,00"], // ajuste fictício
            ["33.1", "500,00", ""], // perdas fictícias
            ["12.1", "", "500,00"], // ajuste fictício
          ],
        },
      },
    ],
  },
  {
    id: 10,
    tipo: "UNICA",
    cotacao: 1,
    enunciado: `
  Registo da amortização dos activos fixos, considerando
  as taxas e vidas úteis indicadas.
  `,

    opcoes: [
      {
        texto: "Amortização correta",
        correta: true,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["43.1", "", "201.057,40"], // depósito à ordem usado para pagamento
            ["33.1", "166.163,14", ""], // redução do empréstimo
            ["76.1", "34.894,26", ""], // custo financeiro (juros)
          ],
        },
      },
      {
        texto: "Erro: amortização registada como pagamento",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["12.1", "166.163,14", ""], // imobilizado (incorreto)
            ["28.1", "", "166.163,14"], // adiantamentos ou amortizações fictícias
            ["12.1", "34.894,26", ""], // juros lançados como imobilizado
          ],
        },
      },
      {
        texto: "Erro: amortização registada no capital próprio",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["51.1", "166.163,14", ""], // capital social (erro)
            ["28.1", "", "166.163,14"], // adiantamentos ou amortizações fictícias
            ["51.1", "34.894,26", ""], // juros lançados como capital
          ],
        },
      },
    ],
  },

  {
    id: 11,
    tipo: "UNICA",
    cotacao: 1,
    enunciado: `
  Registo da amortização dos activos fixos, considerando
  as taxas e vidas úteis indicadas.
  `,

    opcoes: [
      {
        texto: "Erro: amortização registada como pagamento",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["12.1", "50.000,00", ""], // imobilizado incorreto
            ["28.1", "", "50.000,00"], // adiantamento fictício
            ["12.1", "25.000,00", ""], // outra parcela lançada errado
            ["28.1", "", "25.000,00"], // adiantamento fictício
            ["12.1", "8.333,33", ""], // juros ou custo fictício
          ],
        },
      },
      {
        texto: "Amortização correta",
        correta: true,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["18.1.2", "", "50.000,00"], // amortização acumulada I
            ["18.1.4", "", "25.000,00"], // amortização acumulada II
            ["18.1.5", "", "25.000,00"], // amortização acumulada III
            ["18.1.4.2", "", "8.333,33"], // parcela do período
            ["73.1", "108.333,33", ""], // custo do exercício
          ],
        },
      },
      {
        texto: "Erro: amortização registada no capital próprio",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["51.1", "50.000,00", ""], // capital social incorreto
            ["28.1", "", "50.000,00"], // adiantamento fictício
            ["51.1", "25.000,00", ""], // outra parcela lançada errado
            ["28.1", "", "25.000,00"], // adiantamento fictício
            ["51.1", "8.333,33", ""], // juros ou custo fictício
          ],
        },
      },
    ],
  },

  {
    id: 12,
    tipo: "UNICA",
    cotacao: 1.5,
    enunciado: "Registo do Rédito do Subsídio",

    opcoes: [
      {
        texto: "Erro: proveito registado como pagamento",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["12.1", "4.166,67", ""], // imobilizado incorreto
            ["28.1", "", "4.166,67"], // adiantamento fictício
          ],
        },
      },
      {
        texto: "Erro: proveito registado no capital próprio",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["51.1", "4.166,67", ""], // capital social incorreto
            ["28.1", "", "4.166,67"], // adiantamento fictício
          ],
        },
      },
      {
        texto: "Reconhecimento correto do proveito",
        correta: true,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["63.4", "", "4.166,67"], // proveito operacional específico
            ["37.6.3", "4.166,67", ""], // a receber
          ],
        },
      },
    ],
  },

  {
    id: 13,
    tipo: "UNICA",
    cotacao: 1.5,
    enunciado: "Apuramento do IVA de Dezembro",
    opcoes: [
      {
        texto: "Amortização correta",
        correta: true,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["34.5.2", "", "27.165,60"],
            ["34.5.2", "", "22.105,26"],
            ["34.5.3", "55.263,16", ""],
            ["34.5.4.1", "2.744,00", ""],
            ["34.5.5", "49.270,86", ""],
            ["34.5.5", "", "58.007,16"],
            ["34.5.5", "8.736,29", ""],
            ["34.5.6", "", "8.736,29"],
          ],
        },
      },
      {
        texto: "Erro: amortização registada como pagamento",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["12.1", "27.000,00", ""],
            ["12.2", "22.000,00", ""],
            ["28.1", "", "55.000,00"],
            ["28.2", "", "2.700,00"],
            ["12.3", "49.500,00", ""],
            ["28.3", "", "58.000,00"],
            ["12.4", "8.700,00", ""],
            ["28.4", "", "8.730,00"],
          ],
        },
      },
      {
        texto: "Erro: amortização registada no capital próprio",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["51.1", "27.165,60", ""],
            ["51.2", "22.105,26", ""],
            ["51.3", "55.263,16", ""],
            ["51.4", "2.744,00", ""],
            ["51.5", "49.270,86", ""],
            ["51.6", "", "58.007,16"],
            ["51.7", "8.736,29", ""],
            ["51.8", "", "8.736,29"],
          ],
        },
      },
    ],
  },

  {
    id: 14,
    cotacao: 1,
    enunciado:
      "Balancete Final da Empresa após o registo de todas as operações do período:",
    opcoes: [
      {
        texto: "Registo errado do Balancete Final",
        correta: false,
        tabela: {
          cabecalho: ["Contas", "Movimentos", "Saldos"],
          subcabecalho: ["", "Débito", "Crédito", "Devedor", "Credor"],
          dados: [
            [
              "Edifícios e outras construções",
              "500 000,00",
              "",
              "500 000,00",
              "",
            ],
            [
              "Equipamento de carga e transporte",
              "200 000,00",
              "",
              "200 000,00",
              "",
            ],
            [
              "Equipamento de carga e transporte 2",
              "800 000,00",
              "",
              "800 000,00",
              "",
            ],
            ["Equipamento administrativo", "300 000,00", "", "300 000,00", ""],

            // ❌ erro: amortização acumulada subavaliada mas compensada noutros gastos
            ["Amortização acumulada", "", "100 000,00", "", "100 000,00"],

            ["Compras / Mercadorias", "700 000,00", "700 000,00", "", ""],
            ["Desconto comercial", "4 000,00", "4 000,00", "", ""],

            // ❌ devolução registada corretamente em valor, mas errada em natureza
            ["Devolução de mercadorias", "19 600,00", "19 600,00", "", ""],

            // ❌ saldo correto matematicamente, mas baseado em CMVMC errado
            ["Mercadorias", "1 215 600,00", "740 600,00", "475 000,00", ""],

            // ❌ clientes inflacionados (devolução mal tratada)
            ["Clientes c/c", "900 000,00", "660 000,00", "240 000,00", ""],

            ["Adiantamento de cliente", "131 578,95", "131 578,95", "", ""],

            ["Depósito a prazo", "1 500 000,00", "", "1 500 000,00", ""],

            // ❌ banco correto em total, errado em origem (juros reconhecidos antes)
            ["Banco c/c", "5 075 000,00", "3 747 263,00", "1 327 737,00", ""],

            ["Caixa", "350 000,00", "150 000,00", "200 000,00", ""],

            // ❌ fornecedores corretos em saldo, errados em composição
            [
              "Fornecedores c/c",
              "1 143 549,60",
              "1 121 205,60",
              "22 344,00",
              "",
            ],

            [
              "Empréstimos bancários",
              "166 163,14",
              "500 000,00",
              "",
              "333 836,86",
            ],

            // ❌ imposto industrial compensado com resultado
            [
              "Imposto Industrial",
              "133 333,33",
              "559 043,63",
              "",
              "425 710,29",
            ],

            ["IVA Dedutível", "188 165,60", "188 165,60", "", ""],
            ["IVA Liquidado", "545 263,16", "545 263,16", "", ""],
            [
              "IVA Regularização Sujeito Passivo",
              "22 105,26",
              "22 105,26",
              "",
              "",
            ],
            ["IVA Regularização Estado", "2 744,00", "2 744,00", "", ""],
            ["IVA Apuramento", "548 007,16", "548 007,16", "", ""],

            // ❌ IVA a pagar correto em valor, errado em origem
            ["IVA a pagar", "329 000,00", "337 736,29", "", "8 736,29"],

            ["Fornecedores de Imobilizado", "800 000,00", "800 000,00", "", ""],

            // ❌ juros reconhecidos antes do vencimento
            ["Proveitos a facturar (Juros)", "5 000,00", "", "5 000,00", ""],

            ["Encargos a pagar", "", "500,00", "", "500,00"],

            // ❌ subsídio reconhecido quase todo como rédito
            [
              "Proveitos a repartir (Subsídio ao investimento)",
              "50 000,00",
              "400 000,00",
              "",
              "350 000,00",
            ],

            ["Capital social", "", "2 500 000,00", "", "2 500 000,00"],
            ["Resultados transitados", "", "500 000,00", "", "500 000,00"],

            ["Água", "250 000,00", "250 000,00", "", ""],
            ["Electricidade", "150 000,00", "150 000,00", "", ""],
            [
              "Outros custos e perdas operacionais",
              "250 500,00",
              "250 500,00",
              "",
              "",
            ],
            ["Outros custos com o pessoal", "550 000,00", "550 000,00", "", ""],

            // ❌ CMVMC ajustado artificialmente
            ["CMVMC", "721 000,00", "721 000,00", "", ""],

            ["Amortização do exercício", "100 000,00", "100 000,00", "", ""],

            ["Vendas / Mercadorias", "3 763 157,89", "3 763 157,89", "", ""],
            ["Devolução de mercadorias", "26 315,79", "26 315,79", "", ""],

            ["Subsídio de investimento", "50 000,00", "50 000,00", "", ""],
            [
              "Desconto de pronto pagamento obtido",
              "1 960,00",
              "1 960,00",
              "",
              "",
            ],
            ["Juros de empréstimos", "34 894,26", "34 894,26", "", ""],
            [
              "Juros sobre aplicação de capital",
              "5 000,00",
              "5 000,00",
              "",
              "",
            ],

            // ❌ resultado final matematicamente certo, economicamente errado
            [
              "Resultados líquidos do exercício",
              "1 000 000,00",
              "2 277 130,88",
              "",
              "1 277 130,88",
            ],

            // ✅ totais PERFEITAMENTE equilibrados
            [
              "Total",
              "26 505 822,69",
              "26 505 822,69",
              "5 550 081,00",
              "5 550 081,00",
            ],
          ],
        },
      },
      {
        texto: "Registo correto do Balancete Final",
        correta: true,
        tabela: {
          cabecalho: ["Contas", "Movimentos", "Saldos"],
          subcabecalho: ["", "Débito", "Crédito", "Devedor", "Credor"],
          dados: [
            [
              "Edifícios e outras construções",
              "500 000,00",
              "",
              "500 000,00",
              "",
            ],
            [
              "Equipamento de carga e transporte",
              "200 000,00",
              "",
              "200 000,00",
              "",
            ],
            [
              "Equipamento de carga e transporte 2",
              "800 000,00",
              "",
              "800 000,00",
              "",
            ],
            ["Equipamento administrativo", "300 000,00", "", "300 000,00", ""],
            ["Amortização acumulada", "", "108 333,33", "", "108 333,33"],

            ["Compras / Mercadorias", "700 000,00", "700 000,00", "", ""],
            ["Desconto comercial", "4 000,00", "4 000,00", "", ""],
            ["Devolução de mercadorias", "19 600,00", "19 600,00", "", ""],

            ["Mercadorias", "1 215 600,00", "740 600,00", "475 000,00", ""],
            ["Clientes c/c", "900 000,00", "680 000,00", "220 000,00", ""],
            ["Adiantamento de cliente", "131 578,95", "131 578,95", "", ""],

            ["Depósito a prazo", "1 500 000,00", "", "1 500 000,00", ""],
            ["Banco c/c", "5 075 000,00", "3 747 263,00", "1 327 737,00", ""],
            ["Caixa", "350 000,00", "150 000,00", "200 000,00", ""],

            [
              "Fornecedores c/c",
              "1 143 549,60",
              "1 121 205,60",
              "22 344,00",
              "",
            ],
            [
              "Empréstimos bancários",
              "166 163,14",
              "500 000,00",
              "",
              "333 836,86",
            ],

            [
              "Imposto Industrial",
              "133 333,33",
              "559 043,63",
              "",
              "425 710,29",
            ],

            ["IVA Dedutível", "188 165,60", "188 165,60", "", ""],
            ["IVA Liquidado", "545 263,16", "545 263,16", "", ""],
            [
              "IVA Regularização – Sujeito Passivo",
              "22 105,26",
              "22 105,26",
              "",
              "",
            ],
            ["IVA Regularização – Estado", "2 744,00", "2 744,00", "", ""],
            ["IVA Apuramento", "548 007,16", "548 007,16", "", ""],
            ["IVA a pagar", "329 000,00", "337 736,29", "", "8 736,29"],

            ["Fornecedores de imobilizado", "800 000,00", "800 000,00", "", ""],

            ["Proveitos a facturar (Juros)", "5 000,00", "", "5 000,00", ""],
            ["Encargos a pagar", "", "500,00", "", "500,00"],

            [
              "Proveitos a repartir (Subsídio ao investimento)",
              "4 166,67",
              "400 000,00",
              "",
              "395 833,33",
            ],

            ["Capital social", "", "2 500 000,00", "", "2 500 000,00"],
            ["Resultados transitados", "", "500 000,00", "", "500 000,00"],

            ["Água", "250 000,00", "250 000,00", "", ""],
            ["Electricidade", "150 000,00", "150 000,00", "", ""],
            [
              "Outros custos e perdas operacionais",
              "250 500,00",
              "250 500,00",
              "",
              "",
            ],
            ["Outros custos com o pessoal", "550 000,00", "550 000,00", "", ""],

            ["CMVMC", "721 000,00", "721 000,00", "", ""],
            ["Amortização do exercício", "108 333,33", "108 333,33", "", ""],

            ["Vendas / Mercadorias", "3 763 157,89", "3 763 157,89", "", ""],
            [
              "Devolução de mercadorias (vendas)",
              "26 315,79",
              "26 315,79",
              "",
              "",
            ],

            ["Subsídio de investimento", "4 166,67", "4 166,67", "", ""],
            [
              "Desconto de pronto pagamento obtido",
              "1 960,00",
              "1 960,00",
              "",
              "",
            ],
            ["Juros de empréstimos", "34 894,26", "34 894,26", "", ""],
            [
              "Juros sobre aplicação de capital",
              "5 000,00",
              "5 000,00",
              "",
              "",
            ],

            ["Resultados operacionais", "3 741 008,77", "3 741 008,77", "", ""],
            ["Resultados financeiros", "34 894,26", "34 894,26", "", ""],
            ["Imposto corrente", "425 710,29", "425 710,29", "", ""],

            [
              "Resultados líquidos do exercício",
              "855 604,55",
              "2 132 735,44",
              "",
              "1 277 130,88",
            ],

            [
              "Total",
              "26 505 822,69",
              "26 505 822,69",
              "5 550 081,00",
              "5 550 081,00",
            ],
          ],
        },
      },
    ],
  },

  {
    id: 15,
    cotacao: 1,
    enunciado: "Balanço  Final  do período:",
    opcoes: [
      {
        texto: "Balanço corretamente elaborado",
        correta: true,
        tabela: {
          cabecalho: [
            "ACTIVO",
            "",
            "ANO N",
            "PASSIVO + CAPITAL PRÓPRIO",
            "",
            "ANO N",
          ],
          subcabecalho: [
            "Código",
            "Título",
            "Valor (Kz)",
            "Código",
            "Título",
            "Valor (Kz)",
          ],
          dados: [
            // ───── ACTIVO NÃO CORRENTE / CAPITAL PRÓPRIO ─────
            ["", "A.N.C", "", "51.1", "Capital Social", "2 500 000,00"],
            [
              "11.2",
              "Edifícios",
              "500 000,00",
              "81.1",
              "Resultados Transitados",
              "500 000,00",
            ],
            [
              "11.4",
              "Equipamento de Transporte",
              "1 000 000,00",
              "88.9",
              "Resultado Líquido do Exercício",
              "1 277 130,88",
            ],
            ["11.5", "Equipamento Administrativo", "300 000,00", "", "", ""],
            ["18.1", "Amortização Acumulada", "-108 333,33", "", "", ""],
            [
              "",
              "TOTAL A.N.C",
              "1 691 666,67",
              "",
              "TOTAL CAPITAL PRÓPRIO",
              "4 277 130,88",
            ],

            // ───── ACTIVO CORRENTE / PASSIVO CORRENTE ─────
            ["", "A.CORRENTE", "", "", "P.CORRENTE", ""],
            [
              "26.1",
              "Mercadorias",
              "475 000,00",
              "33.1",
              "Empréstimos Bancários",
              "333 836,86",
            ],
            [
              "31.1",
              "Clientes",
              "220 000,00",
              "34.1",
              "Imposto Industrial",
              "425 710,29",
            ],
            [
              "32.1",
              "Fornecedores (Saldo Devedor)",
              "22 344,00",
              "37.5",
              "Encargos a Pagar",
              "500,00",
            ],
            [
              "43.1",
              "Depósitos à Ordem",
              "2 827 737,00",
              "34.9",
              "IVA a Pagar",
              "8 736,29",
            ],
            [
              "45.1",
              "Caixa",
              "200 000,00",
              "37.6",
              "Proveitos a Repartir",
              "395 833,33",
            ],
            ["37.3", "Proveitos a Facturar", "5 000,00", "", "", ""],
            [
              "",
              "TOTAL A.CORRENTE",
              "3 750 081,00",
              "",
              "TOTAL PASSIVO CORRENTE",
              "1 164 616,78",
            ],

            // ───── TOTAIS ─────
            [
              "",
              "TOTAL ACTIVO",
              "5 441 747,66",
              "",
              "CAPITAL PRÓPRIO + PASSIVO",
              "5 441 747,66",
            ],
          ],
        },
      },
      {
        texto: "Balanço mal elaborado",
        correta: false,
        tabela: {
          cabecalho: [
            "ACTIVO",
            "",
            "ANO N",
            "PASSIVO + CAPITAL PRÓPRIO",
            "",
            "ANO N",
          ],
          subcabecalho: [
            "Código",
            "Título",
            "Valor (Kz)",
            "Código",
            "Título",
            "Valor (Kz)",
          ],
          dados: [
            // ❌ Amortização omitida do ANC
            ["", "A.N.C", "", "51.1", "Capital Social", "2 500 000,00"],
            [
              "11.2",
              "Edifícios",
              "500 000,00",
              "81.1",
              "Resultados Transitados",
              "1 777 130,88",
            ],
            [
              "11.4",
              "Equipamento de Transporte",
              "1 000 000,00",
              "",
              "TOTAL CAPITAL PRÓPRIO",
              "4 277 130,88",
            ],
            ["11.5", "Equipamento Administrativo", "300 000,00", "", "", ""],
            ["", "TOTAL A.N.C", "1 800 000,00", "", "", ""],

            // ❌ Amortização lançada no corrente
            ["", "A.CORRENTE", "", "", "P.CORRENTE", ""],
            [
              "18.1",
              "Amortização Acumulada",
              "-108 333,33",
              "33.1",
              "Empréstimos Bancários",
              "333 836,86",
            ],
            [
              "26.1",
              "Mercadorias",
              "475 000,00",
              "34.1",
              "Imposto Industrial",
              "425 710,29",
            ],
            [
              "31.1",
              "Clientes",
              "220 000,00",
              "34.9",
              "IVA a Pagar",
              "8 736,29",
            ],
            [
              "43.1",
              "Depósitos à Ordem",
              "2 827 737,00",
              "37.6",
              "Proveitos a Repartir",
              "395 833,33",
            ],
            ["45.1", "Caixa", "226 343,99", "", "", ""],
            [
              "",
              "TOTAL A.CORRENTE",
              "3 641 747,66",
              "",
              "TOTAL PASSIVO CORRENTE",
              "1 164 616,78",
            ],

            // ✅ Totais corretos
            [
              "",
              "TOTAL ACTIVO",
              "5 441 747,66",
              "",
              "CAPITAL PRÓPRIO + PASSIVO",
              "5 441 747,66",
            ],
          ],
        },
      },
    ],
  },

  {
    id: 16,
    cotacao: 1,
    enunciado: "Demonstração de Resultados do período:",
    opcoes: [
      {
        texto: "Demonstração de Resultados correta",
        correta: true,
        tabela: {
          cabecalho: ["Código", "Descrição", "Valor (Kz)"],
          dados: [
            ["61.3", "Vendas", "3 736 842,11"],
            ["63.1", "Outros proveitos", "4 166,67"],

            ["71.6", "CMVMC", "701 400,00"],
            ["72.1", "Custos com o pessoal", "550 000,00"],
            ["73.1", "Amortização do exercício", "108 333,33"],
            ["75.2", "Outros custos e perdas operacionais", "650 500,00"],

            ["", "RESULTADO OPERACIONAL", "1 730 775,44"],

            ["66.1", "Juros obtidos", "5 000,00"],
            ["66.2", "Descontos obtidos", "1 960,00"],
            ["76.1", "Juros pagos", "34 894,26"],

            ["", "RESULTADO FINANCEIRO", "-27 934,26"],

            ["", "RESULTADO ANTES DE IMPOSTOS (RAI)", "1 702 841,18"],

            ["81.1", "Imposto Industrial", "425 710,29"],

            ["", "RESULTADO LÍQUIDO DO EXERCÍCIO", "1 277 130,88"],
          ],
        },
      },
      {
        texto: "Demonstração de Resultados alternativa",
        correta: false,
        tabela: {
          cabecalho: ["Código", "Descrição", "Valor (Kz)"],
          dados: [
            // ❌ Vendas subavaliadas
            ["61.3", "Vendas", "3 700 000,00"],

            // ❌ Subsídio + regularizações misturados
            ["63.1", "Outros proveitos operacionais", "41 008,78"],

            // ❌ CMVMC inflacionado
            ["71.6", "CMVMC", "721 000,00"],
            ["72.1", "Custos com o pessoal", "550 000,00"],

            // ❌ Amortização inferior
            ["73.1", "Amortizações do exercício", "100 000,00"],

            // ❌ Custos financeiros escondidos aqui
            ["75.2", "Outros custos e perdas operacionais", "639 391,23"],

            // ✅ Resultado operacional fecha igual
            ["", "RESULTADO OPERACIONAL", "1 730 775,44"],

            // ❌ Juros reconhecidos fora do período correto
            ["66.1", "Juros obtidos", "5 000,00"],

            // ❌ Desconto tratado como financeiro
            ["66.2", "Descontos obtidos", "1 960,00"],

            ["76.1", "Juros pagos", "34 894,26"],

            // ✅ Resultado financeiro correto
            ["", "RESULTADO FINANCEIRO", "-27 934,26"],

            ["", "RESULTADO ANTES DE IMPOSTOS (RAI)", "1 702 841,18"],

            // ❌ Imposto certo por coincidência, base errada
            ["81.1", "Imposto Industrial", "425 710,29"],

            // ✅ Resultado líquido bate
            ["", "RESULTADO LÍQUIDO DO EXERCÍCIO", "1 277 130,88"],
          ],
        },
      },
    ],
  },
];

export const segundoGrupoContabilidadeII = [
  {
    id: 1,
    enunciado: `
    A empresa XPTO, LDA adquiriu uma máquina fotográfica em dezembro de 2014 com as seguintes despesas:
    • 03/12/2014: Compra dos materiais necessários à montagem da máquina – despesa de 513.000 Kz (IVA incluído)
    • 20/12/2014: Montagem da primeira estrutura da máquina – despesa de 400.000 Kz + IVA
    • 30/12/2014: Finalização da montagem da máquina – despesa de 570.000 Kz (IVA incluído)
    • 31/12/2014: Finalização dos testes e disponibilização da máquina à empresa – despesa de 300.000 Kz + IVA
    • 02/01/2015: Formação do pessoal que usará a máquina – despesa de 114.000 Kz (IVA incluído)
    • 03/01/2015: Início da utilização da máquina pela XPTO, Lda.
    
    A máquina tem uma vida útil estimada de 5 anos, valor residual 150.000 Kz e capacidade para tirar 40.000 fotografias. 
    A actividade real de cada ano é apresentada no quadro abaixo:`,
    subitens: [
      "a) Elabore o quadro de amortizações, para toda a vida útil do bem, utilizando o método das Quotas degressivas",
      "b)	Sabendo que em janeiro de 2019, a máquina foi alienada por $400.000\text{kz}$ + IVA efectue o registo contabilístico da alienação. ",
    ],
    tabela: {
      cabecalho: ["Ano", "Fotografias (unidades)"],
      dados: [
        ["2015", "8.500"],
        ["2016", "5.800"],
        ["2017", "11.950"],
        ["2018", "6.250"],
        ["2019", "7.500"],
      ],
    },
  },

  {
    id: 2,
    tipo: "UNICA",
    cotacao: 2,
    enunciado: `
  Elabore o quadro de amortizações da máquina fotográfica para toda a sua vida útil,
  utilizando o método das Quotas Degressivas.
  `,
    opcoes: [
      {
        texto: "Quadro com base de cálculo errada",
        correta: false,
        tabela: {
          cabecalho: [
            "Ano",
            "Valor de aquisição",
            "Quantia depreciável",
            "Amortização",
            "Amortização acumulada",
            "Valor contabilístico",
          ],
          dados: [
            [
              "2015",
              "1.750.000",
              "1.600.000",
              "500.000",
              "500.000",
              "1.250.000",
            ],
            ["2016", "1.750.000", "1.600.000", "400.000", "900.000", "850.000"],
            [
              "2017",
              "1.750.000",
              "1.600.000",
              "300.000",
              "1.200.000",
              "550.000",
            ],
            [
              "2018",
              "1.750.000",
              "1.600.000",
              "200.000",
              "1.400.000",
              "350.000",
            ],
            [
              "2019",
              "1.750.000",
              "1.600.000",
              "200.000",
              "1.600.000",
              "150.000",
            ],
          ],
        },
      },
      {
        texto: "Quadro com valor residual incorreto",
        correta: false,
        tabela: {
          cabecalho: [
            "Ano",
            "Valor de aquisição",
            "Quantia depreciável",
            "Amortização",
            "Amortização acumulada",
            "Valor contabilístico",
          ],
          dados: [
            [
              "2015",
              "1.750.000",
              "1.650.000",
              "550.000",
              "550.000",
              "1.200.000",
            ],
            ["2016", "1.750.000", "1.650.000", "440.000", "990.000", "760.000"],
            [
              "2017",
              "1.750.000",
              "1.650.000",
              "330.000",
              "1.320.000",
              "430.000",
            ],
            [
              "2018",
              "1.750.000",
              "1.650.000",
              "220.000",
              "1.540.000",
              "210.000",
            ],
            [
              "2019",
              "1.750.000",
              "1.650.000",
              "60.000",
              "1.600.000",
              "150.000",
            ],
          ],
        },
      },
      {
        texto: "Quadro correcto – Quotas Degressivas",
        correta: true,
        tabela: {
          cabecalho: [
            "Ano",
            "Valor de aquisição",
            "Quantia depreciável",
            "Amortização",
            "Amortização acumulada",
            "Valor contabilístico",
          ],
          dados: [
            [
              "2015",
              "1.750.000",
              "1.600.000",
              "533.000",
              "533.000",
              "1.217.000",
            ],
            ["2016", "1.750.000", "1.600.000", "427.000", "960.000", "790.000"],
            [
              "2017",
              "1.750.000",
              "1.600.000",
              "320.000",
              "1.280.000",
              "470.000",
            ],
            [
              "2018",
              "1.750.000",
              "1.600.000",
              "213.000",
              "1.493.000",
              "257.000",
            ],
            [
              "2019",
              "1.750.000",
              "1.600.000",
              "107.000",
              "1.600.000",
              "150.000",
            ],
          ],
        },
      },
    ],
  },

  {
    id: 3,
    tipo: "UNICA",
    cotacao: 2,
    enunciado: `
  Sabendo que em janeiro de 2019 a máquina foi alienada por
  400.000 Kz + IVA, efectue o registo contabilístico da alienação.
  `,

    opcoes: [
      {
        texto: "Registo errado da alienação",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["45.1", "400.000", ""],
            ["68.3", "", "400.000"],
            ["34.5.3", "", "50.000"],
            ["11.5", "", "1.700.000"],
            ["68.3", "1.700.000", ""],
            ["18.1", "1.480.000", ""],
            ["68.3", "", "1.480.000"],
          ],
        },
      },
      {
        texto: "Registo correcto da alienação",
        correta: true,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["45.1", "456.000", ""],
            ["68.3", "", "400.000"],
            ["34.5.3", "", "56.000"],
            ["11.5", "", "1.750.000"],
            ["68.3", "1.750.000", ""],
            ["18.1", "1.493.000", ""],
            ["68.3", "", "1.493.000"],
          ],
        },
      },
      {
        texto: "Registo errado da alienação com IVA incorrectamente tratado",
        correta: false,
        tabela: {
          cabecalho: ["Conta", "Débito", "Crédito"],
          dados: [
            ["45.1", "456.000", ""],
            ["68.3", "", "400.000"],
            ["34.5.3", "", "60.000"],
            ["11.5", "", "1.700.000"],
            ["68.3", "1.700.000", ""],
            ["18.1", "1.480.000", ""],
            ["68.3", "", "1.480.000"],
          ],
        },
      },
    ],
  },
];
