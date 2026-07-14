"use client";

import { m, useInView, type HTMLMotionProps } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { fadeUp, luxEase } from "@/lib/animations/variants";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  once = true,
  ...props
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-12% 0px" });

  return (
    <m.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ ...luxEase, delay }}
      {...props}
    >
      {children}
    </m.div>
  );
}

export function RevealImage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <m.div
        initial={{ scale: 1.12, opacity: 0 }}
        animate={
          inView
            ? { scale: 1, opacity: 1 }
            : { scale: 1.12, opacity: 0 }
        }
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full"
      >
        <m.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={
            inView
              ? { clipPath: "inset(0 0 0% 0)" }
              : { clipPath: "inset(0 0 100% 0)" }
          }
          transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
          className="h-full w-full"
        >
          {children}
        </m.div>
      </m.div>
    </div>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <m.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <m.div key={i} variants={fadeUp}>
              {child}
            </m.div>
          ))
        : children}
    </m.div>
  );
}
