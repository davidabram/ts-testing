# Binary search

`src/binarySearch.ts` exports a single pure function:

```ts
binarySearch(sorted: number[], target: number): number
```

## Contract

- Input `sorted` must already be in ascending order; the function does not sort or validate it.
- Returns an index `i` with `sorted[i] === target` when the target is present.
- Returns `-1` when the target is absent, including for an empty array.
- With duplicate values, any matching index may be returned; no first/last-occurrence guarantee exists.
- The result is always `-1` or an integer in `[0, sorted.length)`.

## Implementation

Iterative, closed-interval search over `lo..hi` (`hi = length - 1`). The midpoint is computed as
`lo + Math.floor((hi - lo) / 2)` to avoid overflow-style midpoint errors. No recursion, no allocation,
no mutation of the input.

## Verification

The contract above is enforced by `src/binarySearch.test.ts`. See [testing](../toolchain/testing.md)
for how unit and property-based tests are structured.

The module is not imported by the browser entry point; it is exercised only by tests.
