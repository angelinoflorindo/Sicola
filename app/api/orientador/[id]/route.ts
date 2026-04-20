export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import { initDB } from "@/lib/db";
import { UserDisciplina } from "@/models/UserDisciplina";
import { Disciplina } from "@/models/Disciplina";
  

// Buscar Informações do usuario por id
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;

  try {
    await initDB();

    const resp = await User.findOne({
      where:{id},    
      include: [
            {
              model: UserDisciplina,
              as: "UserDisciplina",
    
              include: [
                {
                  model: Disciplina,
                  as: "Disciplina",
                },
              ],
            },
          ]
        });

    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 404 },
    );
  }
}
