import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import mul from '@app/math/mul.ts'

/**
 * Square each element.
 * @description Multiplies every element by itself in nested inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Squared values matching the input nesting shape
 */
export default function square(
  value: number | number[] | number[][]
): number | number[] | number[][]
/**
 * Square each complex or real element.
 * @description Multiplies every element by itself in nested inputs.
 * @param value - Complex or real input values
 * @returns Squared values matching the input nesting shape
 */
export default function square(
  value: Types.NumerixValue
): Types.NumerixValue
/**
 * Square each nested element.
 * @description Multiplies every element by itself in nested inputs.
 * @param value - Complex or real input values
 * @returns Squared values matching the input nesting shape
 */
export default function square(
  value: Types.NumerixValue
): Types.NumerixValue {
  if (Internal.classify(value, true, true) !== true) {
    return Internal.unary(value as number | number[] | number[][], (scalar) => scalar * scalar)
  }
  return mul(
    value as number | number[] | number[][],
    value as number | number[] | number[][]
  ) as Types.NumerixValue
}
