// eliminei o sequelize.authenticate e sync
 

import { NextRequest, NextResponse } from 'next/server'
import { buscarUsuarioPorEmail, criarUsuario } from '../actions/server'

export const dynamic = 'force-dynamic'

// 🔎 BUSCAR USUÁRIO
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json(
      { message: 'Email é obrigatório' },
      { status: 400 }
    )
  }

  const user = await buscarUsuarioPorEmail(email)

  if (!user) {
    return NextResponse.json(
      { message: 'Usuário não encontrado' },
      { status: 404 }
    )
  }

  return NextResponse.json(user)
}

//  REGISTAR USUÁRIO
export async function POST(req: NextRequest) {
  const data = await req.json()

  if (!data.email?.includes('@isaf')) {
    return NextResponse.json(
      { message: 'Email institucional inválido' },
      { status: 400 }
    )
  }

  const user = await criarUsuario({
    primeiro_nome: data.primeiro_nome,
    segundo_nome: data.segundo_nome,
    email: data.email,
    password: data.password,
    curso: data.curso,
    telemovel: data.telemovel,
  })

  return NextResponse.json(
    { id: user.id, email: user.email },
    { status: 201 }
  )
}


