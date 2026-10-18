import assert from "node:assert/strict";
import test from "node:test";
import { edgeState } from "./scroll-edges.ts";

test("no fade on either side when the cards all fit", () => {
  assert.deepEqual(edgeState(0, 1000, 1000), { left: false, right: false });
});

test("at rest with overflow, only the right edge fades", () => {
  assert.deepEqual(edgeState(0, 1000, 2000), { left: false, right: true });
});

test("scrolled to the end, only the left edge fades", () => {
  assert.deepEqual(edgeState(1000, 1000, 2000), { left: true, right: false });
});

test("scrolled into the middle, both edges fade", () => {
  assert.deepEqual(edgeState(500, 1000, 2000), { left: true, right: true });
});

test("sub-pixel positions do not flip an edge", () => {
  assert.deepEqual(edgeState(0.5, 1000, 2000), { left: false, right: true });
  assert.deepEqual(edgeState(999.5, 1000, 2000), { left: true, right: false });
});
