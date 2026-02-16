import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const playlistId = searchParams.get("playlistId");

    const API_KEY = process.env.YOUTUBE_API_KEY;

    if (!playlistId) {
      return NextResponse.json(
        { error: "Playlist ID não informado" },
        { status: 400 }
      );
    }

    let allVideos: any[] = [];
    let nextPageToken: string | undefined = undefined;

    do {
      const url = new URL(
        "https://www.googleapis.com/youtube/v3/playlistItems"
      );

      url.searchParams.append("part", "snippet");
      url.searchParams.append("maxResults", "50");
      url.searchParams.append("playlistId", playlistId);
      url.searchParams.append("key", API_KEY!);

      if (nextPageToken) {
        url.searchParams.append("pageToken", nextPageToken);
      }

      const res = await fetch(url.toString());
      const data = await res.json();

      allVideos = [...allVideos, ...data.items];
      nextPageToken = data.nextPageToken;

    } while (nextPageToken);

    return NextResponse.json(allVideos);

  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno", details: String(error) },
      { status: 500 }
    );
  }
}