"use client";

import { m, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { charReveal, staggerFast } from "@/lib/animations/variants";

type TextRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  once?: boolean;
};

export function TextReveal({
  text,
  as = "h2",
  className,
  delay = 0,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });
  const words = text.split(" ");
  const Tag = as;

  return (
    <div ref={ref}>
      <Tag className={cn("overflow-hidden", className)} aria-label={text}>
        <m.span
          className="contents"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.035, delayChildren: delay },
            },
          }}
        >
          {words.map((word, wi) => (
            <span
              key={`${word}-${wi}`}
              className="mr-[0.28em] inline-block overflow-hidden"
            >
              <m.span className="inline-block" variants={charReveal}>
                {word}
              </m.span>
            </span>
          ))}
        </m.span>
      </Tag>
    </div>
  );
}

export function SplitLines({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <m.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerFast}
    >
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden">
          <m.span className="block" variants={charReveal}>
            {line}
          </m.span>
        </span>
      ))}
    </m.div>
  );
}
