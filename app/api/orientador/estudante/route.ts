 import { NextRequest, NextResponse } from "next/server";
 import { initDB } from "@/lib/db";
 import { sequelize } from "@/lib/sequelize";
 import { User } from "@/models/User";
 import { Sugestao } from "@/models/Sugestao";
 import { UserDisciplina } from "@/models/UserDisciplina";
 import { Disciplina } from "@/models/Disciplina";
 import { converterString, getUserIdFromToken } from "@/app/api/actions/server";
 import { Orientacao } from "@/models/Orientacao";
 import { Sessao } from "@/models/Sessao";
 export const dynamic = "force-dynamic";
 
 
 // buscar Estudantes aprovados
 export async function GET(req: Request) {
   try {
     const { searchParams } = new URL(req.url);
     const page = Number(searchParams.get("page") || 1);
     const limit = Number(searchParams.get("limit") || 5);
     const offset = (page - 1) * limit;
 
     const estadoParam = searchParams.get("estado") || false;
     const orderBy = searchParams.get("order") || "created_at";
 
     const where: any = { 
     };
 
     await initDB();
 
     const { rows, count } = await Orientacao.findAndCountAll({
       raw: false,
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
       ],
       where,
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
       { status: 200 },
     );
   } catch (error: any) {
     console.error("ERRO BUSCAR:", error);
 
     return NextResponse.json({ message: error.message }, { status: 500 });
   }
 }
 
 //
 