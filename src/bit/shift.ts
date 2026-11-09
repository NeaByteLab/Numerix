import * as Internal from '@app/internal/index.ts'

/**
 * Shift the bits of each element.
 * @description Moves bits left or right by the given count.
 * @param value - Scalar, vector, or matrix values to shift
 * @param places - Number of bit positions to shift
 * @param right - When true, shifts bits toward the low end
 * @returns Shifted values matching the input nesting shape
 */
export default function shift(
  value: number | number[] | number[][],
  places: number | number[] | number[][],
  right: boolean | 'left' | 'right' = false
): number | number[] | number[][] {
  if (typeof right !== 'boolean' && right !== 'left' && right !== 'right') {
    throw new RangeError("shift direction must be boolean, 'left', or 'right'")
  }
  const backward = right === true || right === 'right'
  if (typeof places === 'number' && Internal.classify(value, true, true) === false) {
    const counts = Math.trunc(places)
    const factor = counts > 0 && counts < 1023 ? 2 ** counts : 1
    return Internal.mapper(value, (first) => {
      const integer = Math.trunc(first)
      if (!Number.isFinite(integer) || !Number.isFinite(counts)) {
        return 0
      }
      if (counts < 0) {
        return backward && integer < 0 ? -1 : 0
      }
      if (counts === 0) {
        return integer
      }
      if (backward) {
        return counts >= 53 ? (integer < 0 ? -1 : 0) : Math.floor(integer / factor)
      }
      if (counts >= 1023) {
        return integer === 0 ? 0 : integer < 0 ? -Infinity : Infinity
      }
      return integer * factor
    })
  }
  return Internal.broadcast(value, places, (first: number, second: number) => {
    const counts = Math.trunc(second)
    const integer = Math.trunc(first)
    if (!Number.isFinite(integer) || !Number.isFinite(counts)) {
      return 0
    }
    if (counts < 0) {
      return backward && integer < 0 ? -1 : 0
    }
    if (counts === 0) {
      return integer
    }
    if (backward) {
      return counts >= 53 ? (integer < 0 ? -1 : 0) : Math.floor(integer / 2 ** counts)
    }
    if (counts >= 1023) {
      return integer === 0 ? 0 : integer < 0 ? -Infinity : Infinity
    }
    return integer * 2 ** counts
  })
}
