import * as Internal from '@app/internal/index.ts'

/**
 * Compute the intersection of two sets.
 * @description Keeps values present in both sets.
 * @param left - Values of the first set
 * @param right - Values of the second set
 * @returns Values shared by both sets
 */
export default function intersect(left: number[], right: number[]): number[] {
  const seen = new Set(right)
  const result: number[] = []
  for (let index = 0; index < left.length; index++) {
    const value = left[index] ?? 0
    if (Number.isNaN(value)) {
      continue
    }
    if (seen.delete(value)) {
      result.push(value)
    }
  }
  return Internal.values(result)
}
