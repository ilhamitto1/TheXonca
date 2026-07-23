"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { AnimatePresence, m } from "motion/react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { AutoVideo, videoPosterSrc } from "@/components/shared/auto-video";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  src: string;
  type: "image" | "video";
  alt: string;
};

type Props = {
  items: GalleryItem[];
  collectionName: string;
};

function useSwipe(onLeft: () => void, onRight: () => void) {
  const startX = useRef<number | null>(null);
  const swiped = useRef(false);

  const onPointerDown = (e: ReactPointerEvent) => {
    startX.current = e.clientX;
    swiped.current = false;
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) < 48) return;
    swiped.current = true;
    if (dx < 0) onLeft();
    else onRight();
  };

  const consumeSwipe = () => {
    if (!swiped.current) return false;
    swiped.current = false;
    return true;
  };

  return { onPointerDown, onPointerUp, consumeSwipe };
}

export function CollectionGallery({ items, collectionName }: Props) {
  const media = useMemo(() => items, [items]);

  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const current = media[active] ?? media[0];
  const images = media.filter((m) => m.type === "image");
  const videos = media.filter((m) => m.type === "video");

  const go = useCallback(
    (dir: -1 | 1) => {
      if (!media.length) return;
      setActive((i) => (i + dir + media.length) % media.length);
    },
    [media.length],
  );

  const goLightbox = useCallback(
    (dir: -1 | 1) => {
      if (lightbox === null || !media.length) return;
      setLightbox((i) => ((i ?? 0) + dir + media.length) % media.length);
    },
    [lightbox, media.length],
  );

  const stageSwipe = useSwipe(
    () => go(1),
    () => go(-1),
  );
  const lightSwipe = useSwipe(
    () => goLightbox(1),
    () => goLightbox(-1),
  );

  useEffect(() => {
    if (lightbox === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") goLightbox(-1);
      if (e.key === "ArrowRight") goLightbox(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, goLightbox]);

  useEffect(() => {
    if (!current || current.type === "video" || media.length < 2) return;
    const t = window.setTimeout(() => go(1), 4500);
    return () => window.clearTimeout(t);
  }, [active, current, go, media.length]);

  if (!media.length || !current) {
    return (
      <div className="media-frame media-stage flex items-center justify-center rounded-[1.25rem] sm:rounded-[1.75rem]">
        <p className="font-display text-2xl text-stone">{collectionName}</p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 space-y-3 sm:space-y-5">
      {/* Featured stage */}
      <div className="relative min-w-0">
        <button
          type="button"
          onClick={() => {
            if (stageSwipe.consumeSwipe()) return;
            setLightbox(active);
          }}
          onPointerDown={stageSwipe.onPointerDown}
          onPointerUp={stageSwipe.onPointerUp}
          className="group relative block w-full min-w-0 touch-pan-y overflow-hidden rounded-[1.1rem] bg-ink shadow-lift sm:rounded-[1.75rem]"
          aria-label={`${collectionName} — böyüt`}
        >
          <div className="media-frame media-stage w-full">
            <AnimatePresence mode="wait">
              <m.div
                key={current.src}
                className="absolute inset-0"
                initial={{ opacity: 0.35, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {current.type === "video" ? (
                  <AutoVideo
                    src={current.src}
                    poster={videoPosterSrc(current.src)}
                    label={current.alt}
                    className="absolute inset-0 h-full w-full"
                    alwaysPlay
                  />
                ) : (
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 55vw"
                    className="object-cover"
                  />
                )}
              </m.div>
            </AnimatePresence>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/10" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:gap-3 sm:p-6">
              <div className="min-w-0 text-left">
                <p className="font-body text-[9px] uppercase tracking-[0.24em] text-ivory/70 sm:text-[10px] sm:tracking-[0.28em]">
                  {current.type === "video" ? "Video" : "Foto"} · {active + 1}/
                  {media.length}
                </p>
                <p className="mt-0.5 truncate font-display text-lg text-ivory sm:mt-1 sm:text-2xl">
                  {collectionName}
                </p>
              </div>
              {current.type === "video" ? (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ivory/15 backdrop-blur-md sm:h-10 sm:w-10">
                  <Play className="h-3.5 w-3.5 fill-ivory text-ivory sm:h-4 sm:w-4" />
                </span>
              ) : null}
            </div>
          </div>
        </button>

        {media.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-1.5 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-ink/45 text-ivory backdrop-blur-md transition hover:bg-ink/65 sm:left-4 sm:h-11 sm:w-11"
              aria-label="Əvvəlki"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-1.5 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-ink/45 text-ivory backdrop-blur-md transition hover:bg-ink/65 sm:right-4 sm:h-11 sm:w-11"
              aria-label="Növbəti"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </>
        ) : null}
      </div>

      {/* Filmstrip */}
      {media.length > 1 ? (
        <div className="touch-scroll-x -mx-[var(--xonca-gutter)] px-[var(--xonca-gutter)] sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {media.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-[4/5] w-[19vw] min-w-[3.75rem] max-w-[5.5rem] shrink-0 snap-start overflow-hidden rounded-lg border-2 transition sm:w-auto sm:min-w-0 sm:max-w-none sm:rounded-xl",
                i === active
                  ? "border-gold shadow-soft"
                  : "border-transparent opacity-75 hover:opacity-100",
              )}
              aria-label={`${item.type === "video" ? "Video" : "Foto"} ${i + 1}`}
              aria-current={i === active}
            >
              {item.type === "video" ? (
                <>
                  <video
                    src={item.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/25">
                    <Play className="h-3.5 w-3.5 fill-ivory text-ivory" />
                  </span>
                </>
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      ) : null}

      {/* Portfolio — neat separated sections */}
      <section className="space-y-8 pt-6 sm:space-y-12 sm:pt-10">
        {videos.length > 0 ? (
          <div>
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.35em] text-gold-deep">
                  Videolar
                </p>
                <h2 className="mt-1 font-display text-xl text-ink sm:text-3xl">
                  Video təqdimat
                </h2>
              </div>
              <p className="font-body text-[11px] text-stone sm:text-xs">
                {videos.length} video · avtomatik
              </p>
            </div>

            <div
              className={cn(
                "mt-4 grid gap-3 sm:mt-6 sm:gap-5",
                videos.length > 1 && "lg:grid-cols-2 lg:gap-6",
              )}
            >
              {videos.map((item, vi) => {
                const globalIndex = media.findIndex((m) => m.src === item.src);
                const poster = videoPosterSrc(item.src);
                return (
                  <button
                    key={`vid-${item.src}`}
                    type="button"
                    onClick={() => {
                      setActive(globalIndex);
                      setLightbox(globalIndex);
                    }}
                    className="group relative w-full overflow-hidden rounded-[1.15rem] bg-ink text-left shadow-soft sm:rounded-[1.5rem]"
                  >
                    <div className="relative mx-auto aspect-[9/16] w-full max-h-[min(72svh,640px)] max-w-md sm:max-h-[min(68vh,680px)] lg:max-h-[min(70vh,720px)] lg:max-w-none">
                      <AutoVideo
                        src={item.src}
                        poster={poster}
                        label={item.alt}
                        alwaysPlay
                        className="absolute inset-0 h-full w-full"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] text-ivory">
                        <Play className="h-3.5 w-3.5 fill-ivory" />
                        Video {vi + 1}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {images.length > 0 ? (
          <div>
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.35em] text-gold-deep">
                  Fotolar
                </p>
                <h2 className="mt-1 font-display text-xl text-ink sm:text-3xl">
                  Bütün media
                </h2>
              </div>
              <p className="font-body text-[11px] text-stone sm:text-xs">
                {images.length} foto
                {videos.length > 0 ? ` · ${videos.length} video` : ""}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-4 md:grid-cols-3">
              {images.map((item, ii) => {
                const globalIndex = media.findIndex((m) => m.src === item.src);
                return (
                  <button
                    key={`img-${item.src}`}
                    type="button"
                    onClick={() => {
                      setActive(globalIndex);
                      setLightbox(globalIndex);
                    }}
                    className="group relative aspect-[4/5] min-w-0 overflow-hidden rounded-xl bg-ink/5 text-left shadow-soft sm:rounded-2xl"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 font-body text-[9px] uppercase tracking-[0.18em] text-ivory sm:bottom-3 sm:left-3 sm:text-[10px]">
                      Foto {ii + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && media[lightbox] ? (
          <m.div
            className="fixed inset-0 z-[100] flex flex-col bg-ink/96 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal
            aria-label="Media baxışı"
            onPointerDown={lightSwipe.onPointerDown}
            onPointerUp={lightSwipe.onPointerUp}
            onKeyDown={(e: ReactKeyboardEvent) => {
              if (e.key === "Escape") setLightbox(null);
            }}
          >
            <div className="flex items-center justify-between gap-3 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-8 sm:pt-4">
              <p className="min-w-0 truncate font-body text-[9px] uppercase tracking-[0.22em] text-ivory/60 sm:text-[10px] sm:tracking-[0.28em]">
                {collectionName} · {lightbox + 1}/{media.length} ·{" "}
                {media[lightbox].type === "video" ? "Video" : "Foto"}
              </p>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/20 text-ivory"
                aria-label="Bağla"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-1 py-3 sm:px-10 sm:py-6">
              {media.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => goLightbox(-1)}
                    className="absolute left-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 bg-ink/50 text-ivory sm:left-6 sm:h-12 sm:w-12"
                    aria-label="Əvvəlki"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goLightbox(1)}
                    className="absolute right-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 bg-ink/50 text-ivory sm:right-6 sm:h-12 sm:w-12"
                    aria-label="Növbəti"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </>
              ) : null}

              <div className="relative h-[min(72svh,780px)] w-full max-w-5xl px-8 sm:px-14">
                {media[lightbox].type === "video" ? (
                  <div className="relative mx-auto h-full w-full max-w-md">
                    <AutoVideo
                      src={media[lightbox].src}
                      poster={videoPosterSrc(media[lightbox].src)}
                      label={media[lightbox].alt}
                      fit="contain"
                      alwaysPlay
                      className="absolute inset-0 h-full w-full rounded-md sm:rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="relative mx-auto h-full w-full">
                    <Image
                      src={media[lightbox].src}
                      alt={media[lightbox].alt}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="safe-pb flex justify-center gap-2 overflow-x-auto px-4">
              {media.map((item, i) => (
                <button
                  key={`lb-${item.src}`}
                  type="button"
                  onClick={() => setLightbox(i)}
                  className={cn(
                    "h-1.5 w-5 shrink-0 rounded-full transition sm:w-6",
                    i === lightbox ? "bg-gold" : "bg-ivory/25",
                  )}
                  aria-label={`Media ${i + 1}`}
                />
              ))}
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function buildGalleryItems(
  images: string[],
  videos: string[],
  name: string,
): GalleryItem[] {
  const imgs = images.map((src, i) => ({
    src,
    type: "image" as const,
    alt: `${name} — foto ${i + 1}`,
  }));
  const vids = videos.map((src, i) => ({
    src,
    type: "video" as const,
    alt: `${name} — video ${i + 1}`,
  }));

  if (!vids.length) return imgs;
  if (!imgs.length) return vids;

  return [imgs[0], ...vids, ...imgs.slice(1)];
}
