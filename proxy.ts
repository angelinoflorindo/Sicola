import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { buscarPersonalUsuario, buscarUser } from "./app/api/actions/server";


const rotasProtegidas = [
  "/dashboard",
  "/develop",
  "/resultados",
  "/resultados/anos/primeiro",
  "/resultados/anos/primeiro/matematica1",
  "/resultados/anos/primeiro/matematica1/exame",
  "/resultados/anos/primeiro/matematica1/p2",
  "/resultados/anos/primeiro/metodos",
  "/resultados/anos/primeiro/metodos/exame",
  "/resultados/anos/primeiro/metodos/p2",
  "/resultados/anos/segundo",
  "/resultados/anos/segundo/calculo",
  "/resultados/anos/segundo/calculo/exame",
  "/resultados/anos/segundo/calculo/p2",
  "/resultados/anos/segundo/contabilidade2",
  "/resultados/anos/segundo/contabilidade2/exame",
  "/resultados/anos/segundo/contabilidade2/p2",
  "/resultados/anos/segundo/estatistica",
  "/resultados/anos/segundo/estatistica/exame",
  "/resultados/anos/segundo/estatistica/p2",
  "/resultados/anos/terceiro",
  "/resultados/anos/quarto/",
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
  
  const user = await buscarPersonalUsuario(String(token?.email))
  // Se a rota for protegida e o usuário não estiver logado, redireciona para a página inicial

  if(user == null){
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isProtegida && !token ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Se a rota for pública, mas o usuário já estiver logado, redireciona para o dashboard
  //
  if (isPublica && token && user) {
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
