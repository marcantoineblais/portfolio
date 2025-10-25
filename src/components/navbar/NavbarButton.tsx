import { twMerge } from "tailwind-merge";

type NavbarButtonProps = {
  isDisabled?: boolean;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export default function NavbarButton({ className, isDisabled = false, children, ...props }: NavbarButtonProps) {
  return (
    <button
      className={twMerge(
        "py-3 px-3 w-full border-b border-primary-foreground hover:opacity-50 cursor-pointer duration-200 bg-primary",
        "md:py-1 md:w-fit md:bg-transparent",
        "disabled:opacity-50 disabled:cursor-default",
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {children}     
    </button>
  )
}