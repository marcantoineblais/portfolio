import { useEffect, useState } from "react";

type HackTypingProps = {
  children: string;
  initialDelay?: number;
  typingStepDuration?: number;
  typingSpeed?: number;
};

export default function HackTyping({
  initialDelay = 0,
  typingStepDuration = 100,
  typingSpeed = 10,
  children,
  ...props
}: HackTypingProps & React.HTMLAttributes<HTMLSpanElement>) {
  if (typingStepDuration < typingSpeed) throw new Error("typingStepDuration must be greater than typingSpeed");

  const [text, setText] = useState("");
  const symbols = "!@#$%&[]{}".split("");

  useEffect(() => {
    if (children.length === 0) return;

    const timeout = setTimeout(() => {
      let i = 0;
      let text = "";
      
      const symbolChangeInterval = setInterval(() => {
        const random = Math.floor(Math.random() * symbols.length);
        setText(text + symbols[random]);
      }, typingSpeed);

      const textUpdateInterval = setInterval(() => {
        if (i < children.length) {
          text += children[i++];
        } else {
          clearInterval(textUpdateInterval);
          clearInterval(symbolChangeInterval);
          setText(text);
        }
      }, typingStepDuration);
    }, initialDelay);

    return () => {
      setText("");
      clearTimeout(timeout);
    };
  }, [typingStepDuration, typingSpeed, children]);
  
  return <span {...props}>{text}</span>;
}
