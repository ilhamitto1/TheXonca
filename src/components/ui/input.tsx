import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-12 w-full rounded-xl border border-ink/10 bg-pearl/70 px-4 py-2 font-body text-base text-ink placeholder:text-stone/70 backdrop-blur-sm transition-all focus-visible:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/40 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";
