import assert from "node:assert/strict";
import test from "node:test";
import {
  ARC,
  TOP,
  fanHeight,
  fanMetrics,
  fanTransform,
  fanWindow,
  type FanGeometry,
} from "./fan-layout.ts";

const geo: FanGeometry = { step: 100, arc: 10, tilt: 5, window: 3 };

test("active card sits square at the centre", () => {
  const t = fanTransform(4, 4, null, geo);
  assert.deepEqual(t, {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    alpha: 1,
    zIndex: 100,
  });
});

test("neighbours mirror each other", () => {
  const left = fanTransform(3, 4, null, geo);
  const right = fanTransform(5, 4, null, geo);
  assert.equal(left.x, -100);
  assert.equal(right.x, 100);
  assert.equal(left.rotation, -5);
  assert.equal(right.rotation, 5);
  assert.equal(left.y, right.y);
});

test("a card past the window is faded out entirely", () => {
  assert.equal(fanTransform(0, 4, null, geo).alpha, 0);
  assert.ok(fanTransform(1, 4, null, geo).alpha > 0);
  assert.equal(fanTransform(8, 4, null, geo).alpha, 0);
  assert.ok(fanTransform(7, 4, null, geo).alpha > 0);
});

test("further cards shrink and sit behind", () => {
  const near = fanTransform(5, 4, null, geo);
  const far = fanTransform(7, 4, null, geo);
  assert.ok(far.scale < near.scale);
  assert.ok(far.zIndex < near.zIndex);
});

test("hover lifts the card and straightens it", () => {
  const t = fanTransform(5, 4, 5, geo);
  assert.ok(t.y < 0, "hovered card should rise");
  assert.equal(t.scale, 1 - 0.045, "hovered card keeps its own scale");
  assert.ok(Math.abs(t.rotation) < geo.tilt, "hovered card straightens");
  assert.equal(t.zIndex, 200);
});

test("hover opens the fan instead of covering neighbours", () => {
  // Hovering the right neighbour pushes cards right of it further right.
  const leftOf = fanTransform(3, 4, 5, geo);
  const rightOf = fanTransform(6, 4, 5, geo);
  assert.ok(leftOf.x < 0, "cards left of the hovered card move left");
  assert.ok(rightOf.x > 100, "cards right of the hovered card move right");
});

test("a card outside the window is never lifted by hover", () => {
  const t = fanTransform(0, 4, 0, geo);
  assert.equal(t.alpha, 0);
  assert.ok(t.y >= 0, "hidden cards must not rise into view");
});

test("cards recede with distance, and the lifted one stays legible", () => {
  assert.equal(fanTransform(4, 4, null, geo).alpha, 1, "the centre card is fully opaque");
  assert.ok(fanTransform(6, 4, null, geo).alpha < 1, "outer cards fade back");
  assert.ok(
    fanTransform(7, 4, null, geo).alpha < fanTransform(6, 4, null, geo).alpha,
    "fading increases with distance",
  );
  assert.equal(fanTransform(0, 4, null, geo).alpha, 0, "cards past the window are gone");
  assert.equal(fanTransform(6, 4, 6, geo).alpha, 1, "the hovered card is never dimmed");
});

test("narrow containers show a smaller fan", () => {
  assert.equal(fanWindow(1120), 3);
  assert.equal(fanWindow(900), 3);
  assert.equal(fanWindow(899), 2);
  assert.equal(fanWindow(620), 2);
  assert.equal(fanWindow(619), 1);
  assert.equal(fanWindow(320), 1);
});

test("the fan never runs wider than the container it sits in", () => {
  // Every width the projects section is ever laid out at, including the phone
  // sizes where an over-wide fan would push cards off the screen.
  const widths = [320, 375, 414, 560, 619, 620, 768, 899, 900, 1024, 1120, 1260, 1440];
  for (const width of widths) {
    const win = fanWindow(width);
    const { cardW, step } = fanMetrics(width, 800, win);
    const span = 2 * win * step + cardW;
    assert.ok(
      span <= width + 1,
      `${width}px container: fan spans ${span}px (${win} either side)`,
    );
  }
});

test("a short viewport shrinks the cards rather than clipping them", () => {
  const wide = 1120;
  assert.ok(fanMetrics(wide, 600, 3).cardW < fanMetrics(wide, 1000, 3).cardW);
  assert.equal(fanMetrics(wide, 600, 3).cardW, Math.round((600 * 0.56) / 1.55));
});

test("card width stays within sane bounds at any width", () => {
  for (const width of [240, 320, 375, 768, 1120, 1920]) {
    const { cardW } = fanMetrics(width, 800, fanWindow(width));
    assert.ok(cardW >= 160 && cardW <= 300, `${width}px container gave a ${cardW}px card`);
  }
});

test("container height leaves room for the arc, the lift and the tilt", () => {
  assert.equal(fanHeight(470, 3), TOP + 470 + ARC * 3 + 28);
  assert.ok(fanHeight(470, 3) > 470 + ARC * 3);
});
