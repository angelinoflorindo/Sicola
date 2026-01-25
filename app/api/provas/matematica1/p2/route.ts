import { NextResponse } from "next/server";
import { sequelize } from "@/lib/sequelize";
import { Prova } from "@/models/Prova";
import { Resposta } from "@/models/Resposta";
import { Detalhes } from "@/models/Detalhes";
import {
  buscarDisciplina,
  buscarProva,
  converterString,
  getUserIdFromToken,
} from "@/app/api/actions/server";
import { avaliar } from "@/lib/provas/matematica1/avaliacao";
import { questoesMatematicaI } from "@/lib/provas/matematica1/questoes";
import { initDB } from "@/lib/db";

function segundosParaTime(segundos: number) {
  const h = Math.floor(segundos / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((segundos % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (segundos % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

// ROTA PARA REGISTAR A P2 DE MATEMATICA1I
export async function POST(req: Request) {
  try {
    // 1️⃣ Autenticação
    const userId = await getUserIdFromToken(req);
    const id = await converterString(userId);

    if (!id) {
      return NextResponse.json({ message: "Sessão inválida" }, { status: 401 });
    }

    // 2️⃣ Dados enviados pelo cliente
    const { respostas, tempoGasto, codigo } = await req.json();

    // 3️⃣ Avaliação
    const { total, detalhes } = avaliar(respostas, questoesMatematicaI);

    initDB();
    const disciplina = await buscarDisciplina(codigo);

    // 4️⃣ Transaction para gravar tudo
    const prova = await sequelize.transaction(async (t) => {
      // 4.1 Criar PROVA (tentativa)
      const provaCriada = await Prova.create(
        {
          nome: "P2", // ou EXAME / RECURSO
          tempo: segundosParaTime(tempoGasto),
          user_id: id,
          disciplina_id: disciplina?.get("id"),
        },
        { transaction: t },
      );

      // 4.2 Criar respostas e detalhes
      for (const item of detalhes) {
        const resposta = await Resposta.create(
          {
            prova_id: provaCriada.id,
            questao_id: item.questaoId,
            nota: item.nota,
            resposta: respostas ?? null,
          },
          { transaction: t },
        );

        // 4.3 Detalhes da correção (cada alternativa da questão)
        for (const det of item.detalhes) {
          await Detalhes.create(
            {
              resposta_id: resposta.id,
              acertou: det.acertou,
              correta: det.correta,
              indice: det.indice,
              marcada: det.respostaAluno,
            },
            { transaction: t },
          );
        }
      }

      return provaCriada;
    });
    
    // 5️⃣ Retornar dados para o frontend
    return NextResponse.json({prova}, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}

