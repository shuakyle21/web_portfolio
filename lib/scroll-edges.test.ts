import assert from "node:assert/strict";
import test from "node:test";
import { edgeMask, edgeState } from "./scroll-edges.ts";

test("a row that fits has no edges and no fade", () => {
  assert.deepEqual(edgeState(0, 1000, 1000), { start: false, end: false });
  assert.equal(edgeMask({ start: false, end: false }), undefined);
});

test("at the left edge only the right fades", () => {
  assert.deepEqual(edgeState(0, 600, 1800), { start: false, end: true });
  assert.equal(edgeMask({ start: false, end: true }), "linear-gradient(90deg, #000 calc(100% - 56px), transparent)");
});

test("in the middle both edges fade", () => {
  assert.deepEqual(edgeState(600, 600, 1800), { start: true, end: true });
  assert.equal(
    edgeMask({ start: true, end: true }),
    "linear-gradient(90deg, transparent, #000 56px, #000 calc(100% - 56px), transparent)",
  );
});

test("at the right edge only the left fades", () => {
  assert.deepEqual(edgeState(1200, 600, 1800), { start: true, end: false });
  assert.equal(edgeMask({ start: true, end: false }), "linear-gradient(90deg, transparent, #000 56px)");
});

test("sub-pixel scroll offsets do not count as scrolled", () => {
  assert.equal(edgeState(1, 600, 1800).start, false);
  assert.equal(edgeState(3, 600, 1800).start, true);
  // Last pixel of travel must not leave the right edge faded on.
  assert.equal(edgeState(1199, 600, 1800).end, false);
});

test("the fade distance is adjustable", () => {
  assert.equal(edgeMask({ start: true, end: false }, 24), "linear-gradient(90deg, transparent, #000 24px)");
});
