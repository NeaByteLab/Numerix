import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the complex conjugate.
 * @description Negates the imaginary part of each entry.
 * @param value - Complex or real values to conjugate
 * @returns Conjugated values matching the input nesting shape
 */
export default function conj(
  value: Types.NumerixValue
):
  | Types.NumerixComplex
  | number
  | (Types.NumerixComplex | number)[]
  | (Types.NumerixComplex | number)[][] {
  return Internal.traverse(
    value,
    (entry) => Internal.shape(entry) ? { re: entry.re, im: -entry.im } : Number(entry)
  ) as
    | Types.NumerixComplex
    | number
    | (Types.NumerixComplex | number)[]
    | (Types.NumerixComplex | number)[][]
}
