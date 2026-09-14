"use client";

import { useEffect, useState, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  animateOnHover?: boolean;
}

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  characters = "0123456789ABCDEF$#@*!~%&",
  className = "",
  parentClassName = "",
  animateOnHover = true,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((_) =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / (maxIterations / text.length || 1);
    }, speed);
  };

  useEffect(() => {
    startAnimation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span
      className={`inline-block cursor-default select-none ${parentClassName}`}
      onMouseEnter={() => {
        if (animateOnHover && !isHovered) {
          setIsHovered(true);
          startAnimation();
        }
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
}
