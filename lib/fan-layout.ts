export type FanTransform = {
  x: number;
  y: number;
  rotation: number;
  scale: number;
  zIndex: number;
  /** Beyond the visible window the card is faded out and must leave tab order. */
  visible: boolean;
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
    // Offset from 100, not 0: the active card must still paint under a hovered
    // one, so the lifted card is pushed above everything.
    zIndex: hovered === index ? 200 : 100 - distance,
    visible,
  };
}
