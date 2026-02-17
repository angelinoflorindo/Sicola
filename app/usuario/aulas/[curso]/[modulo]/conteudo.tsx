"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { cursos } from "@/lib/cursos";

export default function Conteudo() {
  const { curso, modulo } = useParams();
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const cursoSelecionado = cursos.find((c) => c.id === curso);
  const moduloSelecionado = cursoSelecionado?.modulos.find(
    (m) => m.id === modulo,
  );

  useEffect(() => {
    if (!moduloSelecionado) return;

    fetch(`/api/youtube/playlist?playlistId=${moduloSelecionado.playlistId}`)
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, [moduloSelecionado]);

  if (!cursoSelecionado) {
    return <p>Curso não encontrado</p>;
  }
  if (!moduloSelecionado) return <p>Módulo não encontrado</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{moduloSelecionado.nome}</h1>

      {selectedVideo && (
        <iframe
          key={selectedVideo}
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&mute=1`}
          allowFullScreen
          className="mb-6 rounded-xl"
        />
      )}

      <div className="grid md:grid-cols-3 gap-4">
      
{videos.map((video) => {
  const videoId = video?.snippet?.resourceId?.videoId;
  const thumbnail = video?.snippet?.thumbnails?.medium?.url;

  return (
    <div
      key={videoId}
      className={`cursor-pointer border p-3 rounded-xl transition hover:shadow-xl ${
        selectedVideo === videoId ? "ring-2 ring-blue-500" : ""
      }`}
      onClick={() => setSelectedVideo(videoId)}
    >
      {thumbnail && (
        <Image
          src={thumbnail}
          alt={video?.snippet?.title || "Thumbnail"}
          width={320}
          height={180}
          className="rounded-lg w-full object-cover"
        />
      )}

      <p className="mt-2 text-sm font-semibold line-clamp-2">
        {video?.snippet?.title}
      </p>
    </div>
  );
})}
      </div>
    </div>
  );
}
