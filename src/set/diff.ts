import * as Internal from '@app/internal/index.ts'

/**
 * Compute the difference of two sets.
 * @description Keeps values present only in the left set.
 * @param left - Values of the first set
 * @param right - Values excluded from the result
 * @returns Values found only in the left set
 */
export default function diff(left: number[], right: number[]): number[] {
  const excluded = new Set(right)
  const result: number[] = []
  let missing = false
  for (let index = 0; index < left.length; index++) {
    const value = left[index] ?? 0
    if (Number.isNaN(value)) {
      if (!missing) {
        missing = true
        result.push(value)
      }
      continue
    }
    if (!excluded.has(value)) {
      excluded.add(value)
      result.push(value)
    }
  }
  return Internal.values(result)
}
