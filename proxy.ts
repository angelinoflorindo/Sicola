import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


const rotasProtegidas = [
  "/dashboard",
  "/develop",
  "/anos/",
  "/anos/primeiro",
  "/anos/primeiro/matematica1",
  "/anos/primeiro/matematica1/exame",
  "/anos/primeiro/matematica1/p2",
  "/anos/primeiro/metodos",
  "/anos/primeiro/metodos/exame",
  "/anos/primeiro/metodos/p2",
  "/anos/segundo",
  "/anos/segundo/calculo",
  "/anos/segundo/calculo/exame",
  "/anos/segundo/calculo/p2",
  "/anos/segundo/contabilidade2",
  "/anos/segundo/contabilidade2/exame",
  "/anos/segundo/contabilidade2/p2",
  "/anos/segundo/estatistica",
  "/anos/segundo/estatistica/exame",
  "/anos/segundo/estatistica/p2",
  "/anos/terceiro",
  "/anos/quarto/",
  "resultados",
  "/gestao/sugestoes",
  "/gestao/pagamentos",
  "/gestao/reclamacoes",
  "/gestao/usuario",
  "/usuario",
  "/usuario/pagamentos",
  "/usuario/pagamentos/renovar",
  "/usuario/reclamacoes",
  "/usuario/sugestoes"
];

const rotasPublicas = ["/", "/registar"];

// Função para verificar se a rota é protegida
function isRotaProtegida(path: any) {
  return rotasProtegidas.some((route) => path.startsWith(route));
}

// Função para verificar se a rota é pública
function isRotaPublica(path: any) {
  return rotasPublicas.includes(path);
}


export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Verificar se a rota é pública ou protegida
  const isProtegida = isRotaProtegida(path);
  const isPublica = isRotaPublica(path);

  // Recuperar o token do usuário (Verifica se está logado)
  const token = await getToken({ req, secret:process.env.NEXTAUTH_SECRET});
  
  // Se a rota for protegida e o usuário não estiver logado, redireciona para a página inicial

  if (isProtegida && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Se a rota for pública, mas o usuário já estiver logado, redireciona para o dashboard
  //
  if (isPublica && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/gestao/:path*",
    "/usuario/:path*",
    "/anos/:path*",
    "/resultados/:path*"
  ],
};
