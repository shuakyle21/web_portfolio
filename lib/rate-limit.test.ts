import assert from "node:assert/strict";
import test from "node:test";
import { MAX_PER_WINDOW, isRateLimited } from "./rate-limit.ts";

// Each test uses a unique key: the store is module-level and shared, so a fixed
// key would let one test's hits count against another's window.
const freshKey = () => `test-${Math.random().toString(36).slice(2)}`;

test("allows exactly MAX_PER_WINDOW then blocks", () => {
  const key = freshKey();
  for (let i = 0; i < MAX_PER_WINDOW; i++) {
    assert.equal(isRateLimited(key), false, `hit ${i + 1} should be allowed`);
  }
  assert.equal(isRateLimited(key), true, "the hit after the cap should block");
});

test("one blocked client does not block another", () => {
  const a = freshKey();
  const b = freshKey();
  for (let i = 0; i < MAX_PER_WINDOW; i++) isRateLimited(a);
  assert.equal(isRateLimited(a), true);
  assert.equal(isRateLimited(b), false);
});
