"use client";

import Image from "next/image";
import { AutoVideo, videoPosterSrc } from "@/components/shared/auto-video";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  variant?: "card" | "hero" | "gallery" | "fill";
  priority?: boolean;
  sizes?: string;
};

function isVideo(src: string) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(src);
}

export function CollectionMedia({
  src,
  alt,
  className,
  variant = "card",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: Props) {
  const aspect =
    variant === "hero"
      ? "aspect-[4/5] max-h-[min(72svh,860px)] sm:max-h-[min(78svh,920px)] lg:max-h-none"
      : variant === "gallery"
        ? "aspect-[16/11] max-h-[min(56svh,640px)] lg:max-h-none"
        : variant === "fill"
          ? "h-full w-full"
          : "aspect-[4/5] max-h-[min(68svh,720px)] lg:max-h-none";

  if (isVideo(src)) {
    return (
      <div
        className={cn(
          "relative min-w-0 overflow-hidden bg-ink/5",
          aspect,
          className,
        )}
      >
        <AutoVideo
          src={src}
          poster={videoPosterSrc(src)}
          label={alt}
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative min-w-0 overflow-hidden bg-ink/5",
        aspect,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition duration-700 group-hover:scale-[1.03]"
      />
    </div>
  );
}

type CoverProps = {
  images: string[];
  videos?: string[];
  alt: string;
  className?: string;
  variant?: "card" | "hero" | "gallery" | "fill";
  priority?: boolean;
  preferVideo?: boolean;
  sizes?: string;
};

export function CollectionCover({
  images,
  videos = [],
  alt,
  className,
  variant = "card",
  priority = false,
  preferVideo = false,
  sizes,
}: CoverProps) {
  const src =
    (preferVideo ? videos[0] : undefined) ||
    images[0] ||
    videos[0];

  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-[#2a2420] via-[#3a322c] to-[#1c1814]",
          variant === "hero" || variant === "card"
            ? "aspect-[4/5]"
            : "aspect-[16/11]",
          className,
        )}
      >
        <p className="font-display text-2xl text-ivory/80">{alt}</p>
      </div>
    );
  }

  return (
    <CollectionMedia
      src={src}
      alt={alt}
      className={className}
      variant={variant}
      priority={priority}
      sizes={sizes}
    />
  );
}
