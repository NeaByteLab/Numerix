import * as Internal from '@app/internal/index.ts'

/**
 * Compute the union of two sets.
 * @description Combines values from both sets without duplicates.
 * @param left - Values of the first set
 * @param right - Values of the second set
 * @returns Combined values of both sets
 */
export default function union(left: number[], right: number[]): number[] {
  const total = left.length + right.length
  const typed = new Float64Array(total)
  for (let index = 0; index < left.length; index++) {
    typed[index] = left[index] ?? 0
  }
  for (let index = 0; index < right.length; index++) {
    typed[left.length + index] = right[index] ?? 0
  }
  typed.sort()
  return Internal.distinct(typed)
}
