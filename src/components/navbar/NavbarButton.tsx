import { twMerge } from "tailwind-merge";

type NavbarButtonProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export default function NavbarButton({ className, children, ...props }: NavbarButtonProps) {
  return (
    <button
      className={twMerge(
        "py-3 px-3 w-full border-b border-primary-foreground hover:opacity-50 cursor-pointer duration-200 bg-primary",
        "md:py-1 md:w-fit md:bg-transparent",
        className
      )}
      {...props}
    >
      {children}     
    </button>
  )
}