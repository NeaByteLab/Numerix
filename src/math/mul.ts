import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Multiply two operands element-wise.
 * @description Combines operands with NumPy-style broadcast.
 * @param first - First operand as a scalar, vector, or matrix
 * @param right - Second operand as a scalar, vector, or matrix
 * @returns Products matching the broadcast shape of the operands
 */
export default function mul(
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
    | Types.NumerixComplex[][] = 1
):
  | number
  | number[]
  | number[][]
  | Types.NumerixComplex
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  if (
    Internal.classify(first, true, true) === true ||
    Internal.classify(right, true, true) === true
  ) {
    return Internal.broadcast(
      first,
      right,
      (leading, trailing) => {
        const reals = Internal.shape(leading) ? leading.re : Number(leading ?? 0)
        const imags = Internal.shape(leading) ? leading.im : 0
        const alpha = Internal.shape(trailing) ? trailing.re : Number(trailing ?? 0)
        const omega = Internal.shape(trailing) ? trailing.im : 0
        const first = reals * alpha
        const right = -(imags * omega)
        const product = reals * omega
        const addend = imags * alpha
        return {
          re: Number.isNaN(first) || Number.isNaN(right)
            ? NaN
            : !Number.isFinite(reals) || !Number.isFinite(alpha)
            ? first + right
            : !Number.isFinite(right)
            ? right
            : !Number.isFinite(first)
            ? ((reals * 2 ** -512) * alpha + right * 2 ** -512) * 2 ** 512
            : first + right,
          im: Number.isNaN(product) || Number.isNaN(addend)
            ? NaN
            : !Number.isFinite(reals) || !Number.isFinite(omega)
            ? product + addend
            : !Number.isFinite(addend)
            ? addend
            : !Number.isFinite(product)
            ? ((reals * 2 ** -512) * omega + addend * 2 ** -512) * 2 ** 512
            : product + addend
        }
      },
      1
    )
  }
  if (typeof right === 'number') {
    return typeof first === 'number'
      ? first * right
      : Internal.mapper(first as number[] | number[][], (leading) => leading * right)
  }
  if (typeof first === 'number') {
    return Internal.mapper(right as number[] | number[][], (trailing) => first * trailing)
  }
  return Internal.broadcast<number>(
    first,
    right,
    (first, second) => first * second,
    1
  )
}
