import { describe, expect, it } from 'vitest'
import fc from 'fast-check'
import { binarySearch } from './binarySearch'

describe('binarySearch (unit tests)', () => {
  it('returns -1 for an empty array', () => {
    expect(binarySearch([], 1)).toBe(-1)
  })

  it('finds a target that exists', () => {
    expect(binarySearch([1, 3, 5, 7, 9], 5)).toBe(2)
  })

  it('returns -1 when the target does not exist', () => {
    expect(binarySearch([1, 3, 5, 7, 9], 4)).toBe(-1)
    expect(binarySearch([1, 3, 5, 7, 9], 0)).toBe(-1)
    expect(binarySearch([1, 3, 5, 7, 9], 10)).toBe(-1)
  })

  it('handles a single-element array', () => {
    expect(binarySearch([42], 42)).toBe(0)
    expect(binarySearch([42], 7)).toBe(-1)
  })

  it('handles negative numbers', () => {
    const arr = [-10, -5, -3, 0, 2]
    expect(binarySearch(arr, -5)).toBe(1)
    expect(binarySearch(arr, -4)).toBe(-1)
  })

  it('returns an index of some matching element when values are duplicated', () => {
    const arr = [1, 2, 2, 2, 3]
    const index = binarySearch(arr, 2)
    expect([1, 2, 3]).toContain(index)
    expect(binarySearch([5, 5, 5, 5], 5)).not.toBe(-1)
  })

  it('finds the first and last elements', () => {
    const arr = [-4, 0, 8, 15, 16, 23, 42]
    expect(binarySearch(arr, -4)).toBe(0)
    expect(binarySearch(arr, 42)).toBe(arr.length - 1)
  })
})

describe('binarySearch (property-based tests)', () => {
  const NUM_RUNS = 1000

  // Small value range forces frequent duplicates and target hits;
  // minLength 0 ensures empty arrays are generated too.
  const sortedArray = fc
    .array(fc.integer({ min: -50, max: 50 }), { minLength: 0, maxLength: 100 })
    .map((arr) => [...arr].sort((a, b) => a - b))
  const target = fc.integer({ min: -60, max: 60 })

  it('soundness: a returned index points at the target', () => {
    fc.assert(
      fc.property(sortedArray, target, (arr, t) => {
        const i = binarySearch(arr, t)
        return i === -1 || arr[i] === t
      }),
      { numRuns: NUM_RUNS },
    )
  })

  it('completeness: finds the target whenever it is present', () => {
    // Pick the target from the array itself so it is guaranteed to exist.
    const arrayWithMember = sortedArray
      .filter((arr) => arr.length > 0)
      .chain((arr) => fc.tuple(fc.constant(arr), fc.constantFrom(...arr)))

    fc.assert(
      fc.property(arrayWithMember, ([arr, t]) => {
        const i = binarySearch(arr, t)
        return i !== -1 && arr[i] === t
      }),
      { numRuns: NUM_RUNS },
    )
  })

  it('absence: returns -1 when the target is missing', () => {
    fc.assert(
      fc.property(sortedArray, target, (arr, t) => {
        fc.pre(!arr.includes(t))
        return binarySearch(arr, t) === -1
      }),
      { numRuns: NUM_RUNS },
    )
  })

  it('index bounds: result is -1 or a valid index', () => {
    fc.assert(
      fc.property(sortedArray, target, (arr, t) => {
        const i = binarySearch(arr, t)
        return i === -1 || (Number.isInteger(i) && i >= 0 && i < arr.length)
      }),
      { numRuns: NUM_RUNS },
    )
  })
})
