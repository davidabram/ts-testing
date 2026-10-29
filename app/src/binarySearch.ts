/**
 * Returns the index of `target` in `sorted` (ascending order), or -1 if absent.
 * With duplicates, any matching index may be returned.
 */
export function binarySearch(sorted: number[], target: number): number {
  let lo = 0
  let hi = sorted.length - 1

  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2)
    const value = sorted[mid]

    if (value === target) return mid
    if (value < target) lo = mid + 1
    else hi = mid - 1
  }

  return -1
}
