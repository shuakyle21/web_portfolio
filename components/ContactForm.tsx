"use client";

import { useEffect, useRef, useState } from "react";
import { contactSchema } from "@/lib/contact-schema";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "failed">("idle");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set =
    (key: "name" | "email" | "message") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setStatus("submitting");
    try {
      const company = (
        e.currentTarget.elements.namedItem("company") as HTMLInputElement | null
      )?.value;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          company: company ?? "",
          startedAt: startedAt.current,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  if (status === "sent") {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", gap: 10, padding: "14px 0" }}
        aria-live="polite"
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-accent)" }}>
          ✓ message sent
        </span>
        <h3 style={{ fontSize: 20, margin: 0 }}>Thanks — that landed.</h3>
        <p style={{ margin: 0, fontSize: 14, color: "color-mix(in srgb, var(--color-text) 75%, transparent)" }}>
          I&apos;ll get back to {form.email || "you"} within a business day.
        </p>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            setStatus("idle");
            setForm({ name: "", email: "", message: "" });
            setErrors({});
            startedAt.current = Date.now();
          }}
          style={{ alignSelf: "flex-start", marginTop: 8, fontSize: 13 }}
        >
          Send another
        </button>
      </div>
    );
  }

  const field = (
    key: "name" | "email",
    label: string,
    type: string,
    autoComplete: string,
  ) => (
    <div className="field">
      <label htmlFor={`cf-${key}`}>{label}</label>
      <input
        className="input"
        id={`cf-${key}`}
        name={key}
        type={type}
        autoComplete={autoComplete}
        value={form[key]}
        onChange={set(key)}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={`cf-${key}-err`}
      />
      <span
        id={`cf-${key}-err`}
        style={{
          display: errors[key] ? "block" : "none",
          fontSize: 11,
          color: "var(--color-accent-300)",
          marginTop: 5,
        }}
      >
        {errors[key]}
      </span>
    </div>
  );

  return (
    <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {field("name", "Name", "text", "name")}
      {field("email", "Email", "email", "email")}
      <div className="field">
        <label htmlFor="cf-message">What do you need checked or written?</label>
        <textarea
          className="input"
          id="cf-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={set("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby="cf-message-err"
        />
        <span
          id="cf-message-err"
          style={{
            display: errors.message ? "block" : "none",
            fontSize: 11,
            color: "var(--color-accent-300)",
            marginTop: 5,
          }}
        >
          {errors.message}
        </span>
      </div>
      {/* Honeypot: hidden from people, tempting for bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
      />
      <button
        className="btn btn-primary btn-block"
        type="submit"
        disabled={status === "submitting"}
        style={{ padding: "11px 18px", fontSize: 14 }}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
      <p
        aria-live="polite"
        style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--color-neutral-600)" }}
      >
        {status === "failed"
          ? "// that didn't send — email me directly instead"
          : "// replies within one business day"}
      </p>
    </form>
  );
}
