import assert from "node:assert/strict";
import test from "node:test";
import { fanTransform, type FanGeometry } from "./fan-layout.ts";

const geo: FanGeometry = { step: 100, arc: 10, tilt: 5, window: 3 };

test("active card sits square at the centre", () => {
  const t = fanTransform(4, 4, null, geo);
  assert.deepEqual(t, { x: 0, y: 0, rotation: 0, scale: 1, zIndex: 100, visible: true });
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

test("a card past the window is not visible", () => {
  assert.equal(fanTransform(0, 4, null, geo).visible, false);
  assert.equal(fanTransform(1, 4, null, geo).visible, true);
  assert.equal(fanTransform(8, 4, null, geo).visible, false);
  assert.equal(fanTransform(7, 4, null, geo).visible, true);
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
  assert.equal(t.visible, false);
  assert.ok(t.y >= 0, "hidden cards must not rise into view");
});
