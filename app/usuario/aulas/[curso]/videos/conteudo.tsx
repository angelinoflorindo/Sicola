"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { cursos } from "@/lib/cursos";
import LoadingPage from "@/components/LoadingPage";

type Video = {
  id: string;
  snippet: {
    title: string;
    thumbnails?: {
      medium?: { url: string };
      high?: { url: string };
    };
  };
};

export default function ConteudoComplementar() {
  const { curso } = useParams();
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const cursoSelecionado = cursos.find((c) => c.id === curso);
  const listaVideos = cursoSelecionado?.videos ?? [];

  useEffect(() => {
    if (!listaVideos) return;

    async function fetchVideos() {
      try {
        setLoading(true);

        const responses = await Promise.all(
          listaVideos.map((item) =>
            fetch(`/api/youtube/video?videoId=${item.videoId}`)
              .then((res) => res.json())
          )
        );

        setVideos(responses);

        // Seleciona automaticamente o primeiro vídeo
        if (responses.length > 0) {
          setSelectedVideo(responses[0].id);
        }

      } catch (error) {
        console.error("Erro ao carregar vídeos", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [listaVideos]);

  if (!cursoSelecionado) return <p>Curso não encontrado</p>;
  if (!listaVideos) return <p>Conteúdos não encontrados</p>;

  if (loading) return <LoadingPage/>

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* PLAYER */}
      {selectedVideo && (
        <iframe
          key={selectedVideo}
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&mute=1`}
          allow="autoplay"
          allowFullScreen
          className="mb-8 rounded-2xl shadow-lg"
        />
      )}

      {/* GRID DE VÍDEOS */}
      <div className="grid md:grid-cols-3 gap-6">
        {videos.map((video) => {
          const videoId = video.id;
          const thumbnail =
            video?.snippet?.thumbnails?.high?.url ||
            video?.snippet?.thumbnails?.medium?.url;

          return (
            <div
              key={videoId}
              className={`cursor-pointer border p-3 rounded-2xl transition hover:shadow-xl ${
                selectedVideo === videoId ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedVideo(videoId)}
            >
              {thumbnail && (
                <Image
                  src={thumbnail}
                  alt={video.snippet.title}
                  width={320}
                  height={180}
                  className="rounded-xl w-full object-cover"
                />
              )}

              <p className="mt-3 text-sm font-semibold line-clamp-2">
                {video.snippet.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}