"use client";

import React from "react";

export default function CopyButton({
  value,
  label,
  copiedLabel,
}: {
  value: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable: ignore silently
    }
  };

  return (
    <button
      onClick={copy}
      className="font-mono shrink-0 cursor-pointer rounded-md border border-gray-900/20 px-2.5 py-1 text-xs font-bold transition-colors hover:bg-gray-900 hover:text-yellow-50"
      aria-live="polite"
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
