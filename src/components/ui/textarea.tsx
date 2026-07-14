import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-32 w-full border border-ink/10 bg-pearl/70 px-4 py-3 font-body text-sm text-ink placeholder:text-stone/70 backdrop-blur-sm transition-all focus-visible:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft/40 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";
