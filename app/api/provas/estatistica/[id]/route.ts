

import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { Prova } from "@/models/Prova";
import { Resposta } from "@/models/Resposta";
import { Detalhes } from "@/models/Detalhes";


export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // Agora é uma Promise
) {
  const { id } = await context.params;
  const uuid = Number(id);


  try {
    await initDB();

    
    const data = await Prova.findOne({
      raw:false,
      where: { id: uuid},
      include: [
        {
          model: Resposta,
          as: "Respostas",
          include: [
            {
              model: Detalhes,
              as: "Detalhes",
            },
          ],
        },
      ],
      //order: [[{ model: Resposta, as: "Respostas" }, "questao_id", "ASC"]],
    });

    const prova = data?.dataValues
    if (!prova || !prova.Respostas) {
      return NextResponse.json(
        { message: "Prova não encontrada" },
        { status: 404 }
      );
    }

    const notaFinal = prova.Respostas.reduce(
      (acc:any, r:any) => acc + (r.nota ?? 0),
      0
    );

    // 🎯 normalizar dados para o frontend
    const detalhes = prova.Respostas.map((r:any) => ({
      questaoId: r.questao_id,
      nota: r.nota,
      respostaAluno:
        typeof r.resposta === "string"
          ? JSON.parse(r.resposta)
          : r.resposta,
      detalhes: (r.Detalhes || []).map((d:any) => ({
        marcada: d.marcada,
        correta: d.correta,
      })),
    }));

    return NextResponse.json({
      notaFinal,
      detalhes,
    });
  } catch (error) {
    console.error("Erro ao buscar prova:", error);
    return NextResponse.json(
      { message: "Erro interno" },
      { status: 500 }
    );
  }
}
