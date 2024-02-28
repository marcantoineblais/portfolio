import { ReactNode } from "react";

export default function FormInput(
    { children, name, className = "" }:
    { children: ReactNode, name: string, className?: string }
) {
    return (
        <div className={`w-full flex flex-col gap-1 ${className}`}>
            <h3>{ name }</h3>
            { children }
        </div>
    )
}