import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { Pagamento } from "@/models/Pagamento";
import { Ebook } from "@/models/Ebook";
import { converterString, getUserFromToken } from "@/app/api/actions/server";

// Validar se está ou não pago pelo código

export async function GET(
  req: Request,
  context: { params: Promise<{ codigo: string }> }, // Agora é uma Promise
) {
  
    const user = await getUserFromToken(req);
    const id = await converterString(user?.id);
    const { codigo } = await context.params;
  
    if (!id || !user) {
      console.log("erro de autenticação");
      return NextResponse.json(
        { message: "Usuario não autenticado" },
        { status: 400 },
      );
    }
  


  try {
    await initDB();

    const result = await Ebook.findOne(
      { where: { codigo: codigo , status:'PAGO', user_id:id} },
    );

    return NextResponse.json(result );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

