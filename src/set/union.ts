import type * as Types from '@app/types.ts'
import * as Shape from '@app/shape/index.ts'
import unique from '@app/set/unique.ts'

/**
 * Compute the union of two sets.
 * @description Combines values from both sets without duplicates.
 * @param first - Values of the first set
 * @param right - Values of the second set
 * @returns Combined values of both sets
 */
export default function union(
  first: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  right: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][]
): number[] | Types.NumerixComplex[] {
  return unique(
    (Array.isArray(first[0]) ? Shape.flatten(first) : (first as unknown[])).concat(
      Array.isArray(right[0]) ? Shape.flatten(right) : (right as unknown[])
    ),
    false
  ) as number[] | Types.NumerixComplex[]
}
