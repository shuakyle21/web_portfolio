/**
 * JSON-LD is injected with dangerouslySetInnerHTML, so the serialised object is
 * parsed as raw markup. Escaping `<` stops any value from closing the <script>
 * element early. Harmless while this data is static and authored by hand, but
 * it makes the injection safe the day a value comes from anywhere else.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
