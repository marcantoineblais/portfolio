import { ReactNode } from "react";

export default function TextBubble({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <div
      className={`py-1 px-3 grow flex justify-center items-center text-justify shadow-md min-w-72 max-w-96 ${className} rounded`}
    >
      <p>{children}</p>
    </div>
  );
}
