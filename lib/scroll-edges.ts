export type EdgeState = {
  /** Content is hidden to the left of the viewport. */
  start: boolean;
  /** Content is hidden to the right of the viewport. */
  end: boolean;
};

/** Which edges of a horizontally scrolled row still hide content. */
export function edgeState(
  scrollLeft: number,
  clientWidth: number,
  scrollWidth: number,
  /** Sub-pixel scroll positions are not "scrolled"; browsers land on 0.5px. */
  slack = 2,
): EdgeState {
  return {
    start: scrollLeft > slack,
    end: scrollLeft + clientWidth < scrollWidth - slack,
  };
}

/**
 * Mask for a scrolling row. Only an edge that actually hides cards fades, and a
 * row that fits entirely gets no mask at all — a fade that hides nothing is
 * just a smudge on the first and last card.
 */
export function edgeMask({ start, end }: EdgeState, fade = 56): string | undefined {
  if (!start && !end) return undefined;
  if (start && end) {
    return `linear-gradient(90deg, transparent, #000 ${fade}px, #000 calc(100% - ${fade}px), transparent)`;
  }
  if (start) return `linear-gradient(90deg, transparent, #000 ${fade}px)`;
  return `linear-gradient(90deg, #000 calc(100% - ${fade}px), transparent)`;
}
