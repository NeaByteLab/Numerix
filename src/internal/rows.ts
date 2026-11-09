import type * as Types from '@app/types.ts'

/**
 * Apply a transform along rows.
 * @description Transforms each row independently.
 * @template T - Element type of the transformed matrix
 * @param matrix - Rows to transform
 * @param transform - Transform applied to each row
 * @returns Transformed matrix
 */
export default function rows<T = Types.NumerixComplex>(
  matrix: (Types.NumerixComplex | number)[][],
  transform: (outer: (Types.NumerixComplex | number)[]) => T[]
): T[][] {
  return matrix.map((slice) => transform(slice ?? []))
}
