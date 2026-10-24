type Props = { videoId: string; titulo: string };

// youtube-nocookie evita cookies de rastreio até o usuário dar play.
export function VideoEmbed({ videoId, titulo }: Props) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&playsinline=1`}
        title={titulo}
        loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
