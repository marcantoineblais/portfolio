import { kode_mono } from "@/src/fonts"
import { useMemo } from "react";
import { twMerge } from "tailwind-merge"

type CustomButtonProps = {
  color?: "default" | "primary" | "secondary" | "ternary";
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>

export default function CustomButton({ color = "primary", className, children, ...props }: CustomButtonProps) {
  const themeClasses = useMemo(() => {
    switch (color) {
      case "primary":
        return "bg-linear-120 from-primary/75 via-primary to-primary/75 text-primary-foreground hover:from-primary-foreground/75 hover:via-primary-foreground hover:to-primary-foreground/75 hover:text-primary";
      case "secondary":
        return "bg-linear-120 from-secondary/75 via-secondary to-secondary/75 text-secondary-foreground hover:from-secondary-foreground/75 hover:via-secondary-foreground hover:to-secondary-foreground/75 hover:text-secondary";
      case "ternary":
        return "bg-linear-120 from-ternary/75 via-ternary to-ternary/75 text-ternary-foreground hover:from-ternary-foreground/75 hover:via-ternary-foreground hover:to-ternary-foreground/75 hover:text-ternary";
      default:
        return "bg-linear-120 from-default/75 via-default to-default/75 text-default-foreground hover:opacity-50";
    }
  }, [color]);

  return (
    <button
      className={twMerge(
        "py-3 px-8 text-base sm:text-xl rounded cursor-pointer duration-200",
        kode_mono.className,
        themeClasses,
        className
      )}
      {...props}
    >
      {children}     
    </button>
  )
}