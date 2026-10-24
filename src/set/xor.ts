import * as Internal from '@app/internal/index.ts'

/**
 * Compute the symmetric difference of sets.
 * @description Keeps values present in only one of the sets.
 * @param left - Values of the first set
 * @param right - Values of the second set
 * @returns Values found in exactly one set
 */
export default function xor(left: number[], right: number[]): number[] {
  const source = Internal.distinct(Internal.finite(left))
  const target = Internal.distinct(Internal.finite(right))
  const difference: number[] = []
  let sourceCursor = 0
  let targetCursor = 0
  while (sourceCursor < source.length && targetCursor < target.length) {
    const left = source[sourceCursor] ?? 0
    const right = target[targetCursor] ?? 0
    if (left < right) {
      difference.push(left)
      sourceCursor++
    } else if (right < left) {
      difference.push(right)
      targetCursor++
    } else {
      sourceCursor++
      targetCursor++
    }
  }
  while (sourceCursor < source.length) {
    difference.push(source[sourceCursor] ?? 0)
    sourceCursor++
  }
  while (targetCursor < target.length) {
    difference.push(target[targetCursor] ?? 0)
    targetCursor++
  }
  if (left.some((value) => Number.isNaN(value))) {
    difference.push(NaN)
  }
  if (right.some((value) => Number.isNaN(value))) {
    difference.push(NaN)
  }
  return difference
}
