import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'
import member from '@app/set/member.ts'
import distinct from '@app/set/unique.ts'

/**
 * Compute the difference of two sets.
 * @description Keeps values present only in the left set.
 * @param first - Values of the first set
 * @param right - Values excluded from the result
 * @param unique - Whether inputs are assumed to be unique and preserve order
 * @returns Values found only in the left set
 */
export default function diff(
  first: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  right: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  unique = false
): number[] | Types.NumerixComplex[] {
  const candidates = (
    unique
      ? (Array.isArray(first[0]) ? Shape.flatten(first) : (first as unknown[]))
      : distinct(Array.isArray(first[0]) ? Shape.flatten(first) : (first as unknown[]), false)
  ) as (number | Types.NumerixComplex)[]
  const flags = member(candidates as number[], right, true)
  if (
    Internal.classify(first, true, true) !== true &&
    Internal.classify(right, true, true) !== true
  ) {
    const result: number[] = []
    for (let index = 0; index < candidates.length; index++) {
      if (flags[index]) {
        const reals = Number(candidates[index] ?? 0)
        result.push(reals === 0 ? 0 : reals)
      }
    }
    return result
  }
  const result: Types.NumerixComplex[] = []
  for (let index = 0; index < candidates.length; index++) {
    if (flags[index]) {
      const entry = candidates[index]
      const reals = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
      const imags = Internal.shape(entry) ? entry.im : 0
      result.push({ re: reals === 0 ? 0 : reals, im: imags === 0 ? 0 : imags })
    }
  }
  return result
}
