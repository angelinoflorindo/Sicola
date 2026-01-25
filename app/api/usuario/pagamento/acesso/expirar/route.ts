import { NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import {
  buscarAcesso,
  converterString,
  getUserIdFromToken,
} from "@/app/api/actions/server";
import { Acesso } from "@/models/Acesso";
import { sequelize } from "@/lib/sequelize";
import { Pagamento } from "@/models/Pagamento";

// Rora de expiração do acesso
export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    const id = await converterString(userId);

    if (!id) {
      return NextResponse.json({ message: "Sessão inválida" }, { status: 401 });
    }

    initDB();

    const result = await sequelize.transaction(async (t) => {
      const respAcesso = await Acesso.update(
        {
          estado: false,
        },
        {
          where: {
            estado: true,
            user_id: id,
          },
          transaction: t,
        }
      );

      const respPagamento = await Pagamento.update(
        { status: "EXPIRADO", estado: false },
        { where: { user_id: id, estado: true }, transaction: t }
      );

      return [respPagamento, respAcesso];
    });

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
