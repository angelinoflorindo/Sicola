import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { converterString, getUserIdFromToken } from "../../actions/server";
import { Disponibilidade } from "@/models/Disponibilidade";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromToken(req);

    initDB();

    const income = await req.json();

    const formato = income.formato;
    const agendas = income.datas; // já é array de datas

    if (!agendas?.length) {
      return NextResponse.json(
        { message: "Erro nas datas geradas" },
        { status: 400 },
      );
    }

    // CONVERTER PARA FORMATO DO BANCO
    const payload = agendas.map((data: string) => ({
      user_id: userId,
      data_sessao: data, // cada item é uma data
      formato: formato,
    })); 

    // INSERÇÃO EM LOTE (CORRETO)
    const result = await Disponibilidade.bulkCreate(payload);

    return NextResponse.json({
      message: "Disponibilidade criada com sucesso",
      total: result.length,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}

// buscar todas disponibilidades
export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    await initDB();

    const result = await Disponibilidade.findAll({
      where: { user_id: userId },
    });

    return NextResponse.json( result , { status: 200 });
  } catch (error: any) {
    console.error("ERRO BUSCAR:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
