"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { m, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-body text-sm tracking-[0.08em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-ink text-ivory hover:bg-charcoal shadow-soft",
        gold: "gradient-gold text-ink shadow-gold hover:brightness-105",
        outline:
          "border border-ink/15 bg-transparent text-ink hover:border-gold hover:text-gold-deep",
        ghost: "bg-transparent text-ink hover:text-gold-deep",
        glass: "glass text-ink hover:shadow-lift",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-10 px-5 text-xs",
        lg: "h-14 px-10 text-xs",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  magnetic?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      magnetic = true,
      children,
      ...props
    },
    ref,
  ) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 280, damping: 18 });
    const springY = useSpring(y, { stiffness: 280, damping: 18 });

    const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      x.set(dx * 0.22);
      y.set(dy * 0.22);
    };

    const reset = () => {
      x.set(0);
      y.set(0);
    };

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <m.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        whileTap={{ scale: 0.97 }}
        type={props.type ?? "button"}
        disabled={props.disabled}
        onClick={props.onClick}
        name={props.name}
        value={props.value}
        form={props.form}
        aria-label={props["aria-label"]}
      >
        <span className="relative z-10">{children}</span>
      </m.button>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
