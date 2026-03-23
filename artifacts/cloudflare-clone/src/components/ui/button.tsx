import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "white";
  size?: "default" | "sm" | "lg" | "icon";
}

type ButtonVariantProps = {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
};

const variantClasses = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(30,58,138,0.25)] hover:shadow-[0_0_22px_rgba(30,58,138,0.35)]",
  outline: "border-2 border-border bg-transparent hover:bg-card hover:border-primary/50 text-foreground",
  ghost: "hover:bg-card hover:text-primary text-foreground",
  link: "text-primary underline-offset-4 hover:underline",
  white: "bg-white text-background hover:bg-white/90",
}

const sizeClasses = {
  default: "h-11 px-6 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-14 rounded-md px-8 text-lg font-semibold",
  icon: "h-10 w-10",
}

export function buttonVariants({ variant = "default", size = "default", className }: ButtonVariantProps = {}) {
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className
  )
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
