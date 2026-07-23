"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  className?: string;
  fit?: "cover" | "contain";
  label?: string;
  alwaysPlay?: boolean;
  poster?: string;
};

/**
 * Muted autoplay for iOS Safari + desktop.
 * Shows poster until the first frame is ready — never empty grey.
 */
export function AutoVideo({
  src,
  className,
  fit = "cover",
  label,
  alwaysPlay = false,
  poster,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    setReady(false);
    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.setAttribute("muted", "");
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");

    const tryPlay = async () => {
      try {
        el.muted = true;
        await el.play();
        setReady(true);
      } catch {
        /* retry below */
      }
    };

    void tryPlay();

    const onVis = () => {
      if (document.visibilityState === "visible") void tryPlay();
    };
    document.addEventListener("visibilitychange", onVis);

    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) void tryPlay();
          else if (!alwaysPlay) el.pause();
        },
        { threshold: 0.12, rootMargin: "100px" },
      );
      io.observe(el);
    }

    const onReady = () => {
      setReady(true);
      void tryPlay();
    };
    el.addEventListener("loadeddata", onReady);
    el.addEventListener("canplay", onReady);
    el.addEventListener("playing", () => setReady(true));

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      el.removeEventListener("loadeddata", onReady);
      el.removeEventListener("canplay", onReady);
      io?.disconnect();
    };
  }, [src, alwaysPlay]);

  return (
    <div
      className={cn(
        "overflow-hidden bg-[#1c1814]",
        className,
      )}
    >
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-500",
            fit === "contain" ? "object-contain" : "object-cover",
            ready ? "opacity-0" : "opacity-100",
          )}
        />
      ) : null}
      <video
        ref={ref}
        src={src}
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-500",
          fit === "contain" ? "object-contain" : "object-cover",
          ready ? "opacity-100" : poster ? "opacity-0" : "opacity-100",
        )}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        aria-label={label}
        disablePictureInPicture
      />
    </div>
  );
}

/** /path/03.mp4 → /path/03-poster.jpg */
export function videoPosterSrc(videoSrc: string) {
  return videoSrc.replace(/\.(mp4|webm|mov)(\?.*)?$/i, "-poster.jpg$2");
}
