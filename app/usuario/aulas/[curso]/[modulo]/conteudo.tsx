"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { cursos } from "@/lib/cursos";



export default function Conteudo() {
  const { curso, modulo } = useParams();
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const cursoSelecionado = cursos.find(c => c.id === curso);
  const moduloSelecionado = cursoSelecionado?.modulos.find(
    m => m.id === modulo
  );

  useEffect(() => {
    if (!moduloSelecionado) return;

    fetch(
      `/api/youtube/playlist?playlistId=${moduloSelecionado.playlistId}`
    )
      .then(res => res.json())
      .then(data => setVideos(data));
  }, [moduloSelecionado]);

  if (!cursoSelecionado) {
  return <p>Curso não encontrado</p>;
}
  if (!moduloSelecionado) return <p>Módulo não encontrado</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {moduloSelecionado.nome}
      </h1>

      {selectedVideo && (
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${selectedVideo}`}
          allowFullScreen
          className="mb-6 rounded-xl"
        />
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {videos.map(video => (
          <div
            key={video.id}
            className="cursor-pointer border p-2 rounded-lg hover:shadow-lg"
            onClick={() =>
              setSelectedVideo(video.snippet.resourceId.videoId)
            }
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="rounded"
            />
            <p className="mt-2 text-sm font-semibold">
              {video.snippet.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}