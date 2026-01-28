import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { Pagamento } from "@/models/Pagamento";
import { Acesso } from "@/models/Acesso";
import { buscarPagamentoId, calcularDataFim } from "@/app/api/actions/server";
import { sequelize } from "@/lib/sequelize";

// Aprovar pagamentos

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // Agora é uma Promise
) {
  const { id } = await context.params;
  const uuid = Number(id);
  try {
    await initDB();

    const dataPagamento = await buscarPagamentoId(uuid);
    //const pagamento = dataPagamento?.dataValues
    const plano = dataPagamento!.get("plano");
    const tempoActual = new Date();
    const info = {
      inicio: tempoActual,
      fim: await calcularDataFim(plano, tempoActual),
      plano: plano,
    };

    const result = await sequelize.transaction(async (t) => {
      const respPagamento = await Pagamento.update(
        { status: "PAGO" },
        { where: { id: uuid }, transaction: t }
      );

      const [respAcesso] = await Acesso.findOrCreate({
        where: { user_id: dataPagamento?.get("user_id"), estado: true },
        defaults: info,
        transaction: t,
      });

      if (respAcesso) {
        const novoTempo = respAcesso.get("fim");
        const updateAcesso = {
          inicio: new Date(),
          fim: await calcularDataFim(plano, novoTempo),
          plano: plano,
        };

        await Acesso.update(updateAcesso, {
          where: {
            estado: true,
            id: respAcesso.id,
          },
          transaction: t,
        });
      }

      return [respPagamento, respAcesso];
    });

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

// Reverter pagamentos aprovados, mas indevidamente validados
export async function PUT(
    req: NextRequest,
  context: { params: Promise<{ id: string }> } // Agora é uma Promise
) {
  const { id } = await context.params;
  const uuid = Number(id);

  try {
    await initDB();
    const dataPagamento = await buscarPagamentoId(uuid);
    const pagamento = dataPagamento?.dataValues;
    const plano = await String(pagamento.plano);

    const result = await sequelize.transaction(async (t) => {
      const respPagamento = await Pagamento.update(
        { status: "PENDENTE" },
        { where: { id: uuid, estado: true, status: "PAGO" }, transaction: t }
      );

      const respAcesso = await Acesso.update(
        { estado: false },
        {
          where: {
            estado: true,
            plano: plano,
            user_id: pagamento.user_id,
          },
          transaction: t,
        }
      );

      return [respPagamento, respAcesso];
    });

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

// DELETE - Remover historico de pagamento por ID
export async function DELETE(
   req: NextRequest,
  context: { params: Promise<{ id: string }> } // Agora é uma Promise
) {
  const { id } = await context.params;
  const uuid = Number(id);
  try {
    await initDB();

    await Pagamento.update({ estado: false }, { where: { id: uuid } });

    return NextResponse.json({ message: "Registo eliminado" });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
