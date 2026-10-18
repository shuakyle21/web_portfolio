/**
 * Which edges of a horizontal scroller hide content. Pure so it can be checked
 * without a DOM — the case worth guarding is a strip that does not overflow,
 * where a fade on either side would promise cards that are not there.
 */
export function edgeState(
  scrollLeft: number,
  clientWidth: number,
  scrollWidth: number,
): { left: boolean; right: boolean } {
  // 1px slack: fractional scroll positions and sub-pixel layout never land
  // exactly on 0 or on the maximum.
  return {
    left: scrollLeft > 1,
    right: scrollLeft < scrollWidth - clientWidth - 1,
  };
}
