import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'
import * as Sort from '@app/sort/index.ts'
import distinct from '@app/set/unique.ts'

/**
 * Compute the symmetric difference of sets.
 * @description Keeps values present in only one of the sets.
 * @param first - Values of the first set
 * @param right - Values of the second set
 * @param unique - When true, treats both inputs as already unique
 * @returns Values found in exactly one set
 */
export default function xor(
  first: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  right: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  unique = false
): number[] | Types.NumerixComplex[] {
  const source = Array.isArray(first[0]) ? Shape.flatten(first) : (first as unknown[])
  const second = Array.isArray(right[0]) ? Shape.flatten(right) : (right as unknown[])
  const merged = (unique ? source : (distinct(source, false) as unknown[])).concat(
    unique ? second : (distinct(second, false) as unknown[])
  )
  if (
    Internal.classify(source, true, true) !== true &&
    Internal.classify(second, true, true) !== true
  ) {
    const sorted = Sort.order(
      unique
        ? merged.map((entry) => {
          const reals = Number(entry ?? 0)
          return reals === 0 ? 0 : reals
        })
        : (merged as number[])
    ) as number[]
    const result: number[] = []
    for (let index = 0; index < sorted.length; index++) {
      const current = sorted[index] ?? 0
      if (index + 1 < sorted.length && current === sorted[index + 1]) {
        index++
      } else {
        result.push(current)
      }
    }
    return result
  }
  const combined = Sort.order(
    unique
      ? merged.map((entry) => {
        const reals = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
        const imags = Internal.shape(entry) ? entry.im : 0
        return {
          re: reals === 0 ? 0 : reals,
          im: imags === 0 ? 0 : imags
        }
      })
      : (merged as Types.NumerixComplex[])
  ) as Types.NumerixComplex[]
  const result: Types.NumerixComplex[] = []
  for (let index = 0; index < combined.length; index++) {
    const current = combined[index] ?? { re: 0, im: 0 }
    if (Internal.equals(current, combined[index + 1])) {
      index++
    } else {
      result.push(current)
    }
  }
  return result
}
