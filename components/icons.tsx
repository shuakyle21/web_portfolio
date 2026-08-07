export function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-2.91-.88-2.91-2.79 0-.55.2-1.02.51-1.39-.05-.13-.22-.65.05-1.35 0 0 .68-.21 2.23.82a4.6 4.6 0 0 1 2.03-.42c.69 0 1.38.09 2.03.42 1.55-1.05 2.23-.82 2.23-.82.27.7.1 1.22.05 1.35.32.37.51.84.51 1.39 0 1.92-1.14 2.59-2.92 2.79.29.26.55.75.55 1.51 0 1.09-.01 1.96-.01 2.23 0 .21.15.46.55.38A7.99 7.99 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

export function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146Zm4.943 12.248V6.169H2.542v7.225h2.401Zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016Zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.868 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4Z" />
    </svg>
  );
}

export function SubstackIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M15 3.604H1V1.5h14v2.104ZM1 5.708h14V16l-7-3.926L1 16V5.708ZM15 9.24H1V7.135h14V9.24Z" />
    </svg>
  );
}

export function GlobeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM1.5 8a6.5 6.5 0 0 1 .43-2.32h2.3a15.6 15.6 0 0 0 0 4.64h-2.3A6.5 6.5 0 0 1 1.5 8Zm.99 3.82h2.02c.28.94.66 1.77 1.11 2.42a6.52 6.52 0 0 1-3.13-2.42ZM4.5 8c0-.82.06-1.6.17-2.32h6.66c.11.72.17 1.5.17 2.32s-.06 1.6-.17 2.32H4.67A15.4 15.4 0 0 1 4.5 8Zm1.11-6.24c-.45.65-.83 1.48-1.11 2.42H2.49a6.52 6.52 0 0 1 3.12-2.42ZM8 1.5c.85 0 1.79 1 2.35 2.68H5.65C6.21 2.5 7.15 1.5 8 1.5Zm0 13c-.85 0-1.79-1-2.35-2.68h4.7C9.79 13.5 8.85 14.5 8 14.5Zm2.39-.26c.45-.65.83-1.48 1.11-2.42h2.01a6.52 6.52 0 0 1-3.12 2.42Zm1.38-3.92a15.6 15.6 0 0 0 0-4.64h2.3a6.5 6.5 0 0 1 0 4.64h-2.3Zm-.27-6.24c-.28-.94-.66-1.77-1.11-2.42a6.52 6.52 0 0 1 3.12 2.42h-2.01Z" />
    </svg>
  );
}

/**
 * Solid star, always filled — the rating widget animates `color`, never the
 * path. Swapping an outline path for a filled one would mean a DOM mutation
 * on every pointer move and can't be expressed in CSS.
 */
export function StarIcon({ size = 26 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1.8l3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 17.56l-6.18 3.25L7 13.93l-5-4.87 6.91-1L12 1.8Z" />
    </svg>
  );
}

/** Brand mark: rounded accent tile with a chevron-and-underscore prompt glyph. */
export function BrandMark() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 28,
        height: 28,
        borderRadius: 7,
        border: "1px solid color-mix(in srgb, var(--color-accent) 55%, transparent)",
        background: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="7 9 10 12 7 15" />
        <line x1="13" y1="15" x2="17" y2="15" />
      </svg>
    </span>
  );
}
