import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-sans transition-all duration-200 ease-premium outline-none focus-visible:ring-2 focus-visible:ring-renox-copper",
          "hover:-translate-y-1 active:translate-y-0",
          {
            "bg-renox-copper text-renox-black hover:shadow-[0_0_15px_var(--color-renox-copper-glow)] hover:bg-renox-copper-bright":
              variant === "primary",
            "bg-renox-surface border border-renox-copper/40 text-renox-ivory hover:border-renox-copper hover:bg-renox-surface-2 hover:shadow-[0_0_10px_var(--color-renox-copper-glow)]":
              variant === "secondary",
            "bg-transparent border border-renox-line text-renox-ivory hover:border-renox-copper hover:text-renox-copper":
              variant === "outline",
            "h-11 px-6 py-2 text-sm": size === "default",
            "h-9 px-4 text-xs": size === "sm",
            "h-14 px-8 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
