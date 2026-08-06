"use client";

import { useRef, useState } from "react";

/** CopyButton equivalent: copies the email, shows a checkmark state briefly. */
export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const t = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  return (
    <button
      className="btn btn-secondary"
      type="button"
      aria-label="Copy email address"
      onClick={() => {
        navigator.clipboard?.writeText(email).catch(() => {});
        setCopied(true);
        clearTimeout(t.current);
        t.current = setTimeout(() => setCopied(false), 1800);
      }}
      style={{ fontSize: 12, fontFamily: "var(--font-mono)" }}
    >
      {copied ? "✓ copied" : "copy"}
    </button>
  );
}
