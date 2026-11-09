import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import div from '@app/math/div.ts'

/**
 * Compute the reciprocal of each element.
 * @description Divides one by every element in nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Reciprocals matching the input nesting shape
 */
export default function reciprocal(
  value: number | number[] | number[][]
): number | number[] | number[][]
/**
 * Compute each complex reciprocal.
 * @description Divides one by every element in nested inputs.
 * @param value - Complex or real input values
 * @returns Reciprocals matching the input nesting shape
 */
export default function reciprocal(
  value: Types.NumerixValue
): Types.NumerixValue
/**
 * Compute each nested reciprocal.
 * @description Divides one by every element in nested inputs.
 * @param value - Complex or real input values
 * @returns Reciprocals matching the input nesting shape
 */
export default function reciprocal(
  value: Types.NumerixValue
): Types.NumerixValue {
  if (Internal.classify(value, true, true) !== true) {
    return Internal.unary(value as number | number[] | number[][], (scalar) => 1 / scalar)
  }
  return div(
    1,
    value as
      | number
      | number[]
      | number[][]
      | Types.NumerixComplex
      | Types.NumerixComplex[]
      | Types.NumerixComplex[][]
  ) as Types.NumerixValue
}
