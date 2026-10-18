export const ARC = 10;
export const TILT = 4.5;
/** Room above the top card for the hover lift, in px. Mirrored in globals.css. */
export const TOP = 36;

export type FanTransform = {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  /** Opacity, including the depth fall-off: 0 past the window, which is what
   *  takes the card out of tab order once autoAlpha applies it. */
  alpha: number;
  zIndex: number;
};

export type FanGeometry = {
  /** Horizontal distance between neighbouring cards. */
  step: number;
  /** How far a card drops per step away from the centre, making the arc. */
  arc: number;
  /** Degrees of rotation per step. */
  tilt: number;
  /** Cards shown either side of the active one. */
  window: number;
};

/**
 * Cards shown either side of the active one for a given container width. Three
 * each side needs the full 1120px container; below that the fan would spill
 * past the edge of the screen, so it shows fewer cards instead.
 */
export function fanWindow(width: number): number {
  return width < 620 ? 1 : width < 900 ? 2 : 3;
}

/**
 * Card size and spacing for the space available. The step is capped so the
 * whole fan — both wings plus the centre card — stays inside the container.
 */
export function fanMetrics(width: number, viewportHeight: number, win: number) {
  // Card height lands near 1.55x its width (16:9 visual plus the text block),
  // so the width is capped by the shorter of the two axes.
  const cardW = Math.round(
    Math.min(300, Math.max(160, Math.min(width * 0.3, (viewportHeight * 0.56) / 1.55))),
  );
  const step = Math.max(44, Math.min(cardW * 0.62, (width - cardW) / (2 * win)));
  return { cardW, step };
}

/** Height the container needs, given the measured height of one card. */
export function fanHeight(cardH: number, win: number) {
  return TOP + cardH + ARC * win + 28;
}

/**
 * Position of one card in the fan. Pure so the geometry can be checked without
 * a DOM — the cases that matter are a card outside the window (must not take
 * focus) and hover, which has to open the fan rather than let neighbours hide
 * behind the lifted card.
 */
export function fanTransform(
  index: number,
  active: number,
  hovered: number | null,
  { step, arc, tilt, window: win }: FanGeometry,
): FanTransform {
  const d = index - active;
  const distance = Math.abs(d);
  const visible = distance <= win;

  let x = d * step;
  let y = distance * arc;

  if (hovered === index && visible) {
    // Lifted: straighten and rise clear of the arc.
    y -= arc * 2.2;
  } else if (hovered !== null && visible) {
    // Open the fan around the lifted card. Cards left of it move further left,
    // cards right of it further right, so the hovered card is never covered.
    const hoveredOffset = hovered - active;
    x += d < hoveredOffset ? -step * 0.28 : step * 0.28;
  }

  return {
    x,
    y,
    rotation: hovered === index ? d * tilt * 0.25 : d * tilt,
    scale: 1 - Math.min(distance, 3) * 0.045,
    // Cards recede with distance, so the fan reads as depth rather than a row
    // of cards that happen to overlap. The lifted card is always legible.
    alpha: !visible ? 0 : hovered === index ? 1 : 1 - Math.min(distance, 3) * 0.08,
    // Offset from 100, not 0: the active card must still paint under a hovered
    // one, so the lifted card is pushed above everything.
    zIndex: hovered === index ? 200 : 100 - distance,
  };
}
