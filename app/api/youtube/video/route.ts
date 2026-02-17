import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("videoId");

    const API_KEY = process.env.YOUTUBE_API_KEY;

    if (!videoId) {
      return NextResponse.json(
        { error: "videoId não informado" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`
    );

    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: "Vídeo não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(data.items[0]);

  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno", details: String(error) },
      { status: 500 }
    );
  }
}