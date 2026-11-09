import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Add two operands element-wise.
 * @description Combines operands with NumPy-style broadcast.
 * @param first - First operand as a scalar, vector, or matrix
 * @param right - Second operand as a scalar, vector, or matrix
 * @returns Sums matching the broadcast shape of the operands
 */
export default function add(
  first:
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][],
  right:
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][] = 0
):
  | number
  | number[]
  | number[][]
  | Types.NumerixComplex
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  if (
    Internal.classify(first, true, true) !== true &&
    Internal.classify(right, true, true) !== true
  ) {
    if (typeof right === 'number') {
      return typeof first === 'number'
        ? first + right
        : Internal.mapper(first as number[] | number[][], (leading) => leading + right)
    }
    if (typeof first === 'number') {
      return Internal.mapper(right as number[] | number[][], (trailing) => first + trailing)
    }
    return Internal.broadcast<number>(
      first,
      right,
      (leading, trailing) => leading + trailing
    )
  }
  return Internal.broadcast<Types.NumerixComplex>(
    first,
    right,
    (leading, trailing) => ({
      re: (Internal.shape(leading) ? leading.re : Number(leading ?? 0)) +
        (Internal.shape(trailing) ? trailing.re : Number(trailing ?? 0)),
      im: (Internal.shape(leading) ? leading.im : 0) +
        (Internal.shape(trailing) ? trailing.im : 0)
    })
  ) as
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
}
