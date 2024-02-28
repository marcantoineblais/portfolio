import { ReactNode } from "react";

export default function TextBubble({ children, className }: { children: ReactNode, className: string }) {
  return (
    <div className={`p-5 grow flex justify-center items-center ${className} rounded`}>
      { children }
    </div>
  )
}