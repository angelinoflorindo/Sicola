// eliminei o sequelize.authenticate e sync

export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import {
  buscarPersonalUsuario,
  getUserIdFromToken,
  hashPassword,
} from "@/app/api/actions/server";
import { initDB } from "@/lib/db";
import { sequelize } from "@/lib/sequelize";
import { User } from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email é obrigatório" },
        { status: 400 },
      );
    }

    const user = await buscarPersonalUsuario(email);

    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 },
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}

// Lugar para atualização do perfil

export async function POST(req: NextRequest) {
  try {
    await initDB();

    const userId = await getUserIdFromToken(req);

    const formData = await req.formData();

    const file = formData.get("file") as File | any;
    const hashedPassword = await hashPassword(String(formData.get("password")));

    // ============================
    // 📂 Upload comprovativo
    // ============================

    // ✅ TRATAR IMAGEM
    let filename = null;

    console.log(file);

    if (file === null || !file || file === 'null') {
      const input = {
        primeiro_nome: formData.get("primeiro_nome"),
        segundo_nome: formData.get("segundo_nome"),
        telemovel: formData.get("telemovel"),
        email: formData.get("email"),
        password: hashedPassword,
        filename: formData.get("filename"),
        universidade_id: formData.get("universidade_id"),
      };

      console.log(input);
      const result = await User.update(input, { where: { id: userId } });

      return NextResponse.json(result, { status: 201 });
    } else {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      filename = `${Date.now()}-${file.name}`;

      const fs = require("fs");
      const path = require("path");

      const uploadDir = path.join(process.cwd(), "public/candidatos");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, buffer);

      const input = {
        primeiro_nome: formData.get("primeiro_nome"),
        segundo_nome: formData.get("segundo_nome"),
        telemovel: formData.get("telemovel"),
        email: formData.get("email"),
        password: hashedPassword,
        filename: filename,
        universidade_id: formData.get("universidade_id"),
      };

      console.log(input);
      const result = await User.update(input, { where: { id: userId } });

      return NextResponse.json(result, { status: 201 });
    }

    // ✅ TRANSAÇÃO
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
