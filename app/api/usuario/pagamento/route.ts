import { NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import {
  converterString,
  getUserIdFromToken,
  registarPagamento,
} from "@/app/api/actions/server";
import { Pagamento } from "@/models/Pagamento";
import { User } from "@/models/User";

// Registar pagamento
export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    const id = await converterString(userId);
    const data = await req.json();
    const planoIn = data.plano;

    if (!id || !planoIn) {
      return NextResponse.json(
        { message: "Sessão inválida ou Erro de informação" },
        { status: 401 }
      );
    }

    await initDB();
    const pagamento = await registarPagamento(id, planoIn);

    if (!pagamento) {
      return NextResponse.json({ message: "Acesso expirado" }, { status: 403 });
    }

    // continua a lógica da prova
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}



// Rota para buscar todos os registos
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 5);
    const offset = (page - 1) * limit;

    const estadoParam = searchParams.get("estado");
    const status = searchParams.get("status");
    const orderBy = searchParams.get("order") || "created_at"

    const where: any = {};

    // filtros seguros
    if (estadoParam !== null) {
      where.estado = estadoParam === "true";
    }

    if (status) {
      where.status = status;
    }

  

    await initDB();

    const { rows, count } = await Pagamento.findAndCountAll({
      raw:false,
      where,
      include: [
        {
          model: User,
          as:"Usuario",
          attributes: [
            "id",
            "primeiro_nome",
            "segundo_nome",
            "email",
            "telemovel",
          ],
        },
      ],
      limit,
      offset,
      order: [[`${orderBy}`, "DESC"]],
    });

    return NextResponse.json(
      {
        data: rows,
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("ERRO PAGAMENTOS:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
