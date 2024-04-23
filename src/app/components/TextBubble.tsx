import { ReactNode } from "react";

export default function TextBubble({ children, className }: { children: ReactNode, className: string }) {
  return (
    <div className={`p-5 grow flex justify-center items-center shadow-md max-w-96 ${className} rounded`}>
      <p>{ children }</p>
    </div>
  )
}