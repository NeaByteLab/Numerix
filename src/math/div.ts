import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Divide two operands element-wise.
 * @description Combines operands with NumPy-style broadcast.
 * @param first - Numerator as a scalar, vector, or matrix
 * @param right - Denominator as a scalar, vector, or matrix
 * @param floor - When true, rounds results toward negative infinity
 * @returns Quotients matching the broadcast shape of the operands
 */
export default function div(
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
    | Types.NumerixComplex[][] = 1,
  floor = false
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
        if (Math.abs(alpha) >= Math.abs(omega)) {
          if (alpha === 0 && omega === 0) {
            return { re: reals / 0, im: imags / 0 }
          }
          const ratio = omega / alpha
          const scale = 1 / (alpha + omega * ratio)
          return {
            re: (reals + imags * ratio) * scale,
            im: (imags - reals * ratio) * scale
          }
        }
        const ratio = alpha / omega
        const scale = 1 / (omega + alpha * ratio)
        return {
          re: (reals * ratio + imags) * scale,
          im: (imags * ratio - reals) * scale
        }
      },
      1
    )
  }
  if (!floor) {
    if (typeof right === 'number') {
      return typeof first === 'number'
        ? first / right
        : Internal.mapper(first as number[] | number[][], (leading) => leading / right)
    }
    if (typeof first === 'number') {
      return Internal.mapper(right as number[] | number[][], (trailing) => first / trailing)
    }
  }
  return Internal.broadcast(
    first as number,
    right as number,
    (first, second) => {
      if (!floor) {
        return first / second
      }
      if (Number.isNaN(first) || Number.isNaN(second)) {
        return NaN
      }
      if (second === 0) {
        return first / second
      }
      if (!Number.isFinite(first)) {
        return NaN
      }
      if (!Number.isFinite(second)) {
        if (first === 0) {
          return first / second
        }
        return (first < 0) === (second < 0) ? 0 : -1
      }
      const residue = first % second
      return Math.round((first - residue) / second) -
        (residue !== 0 && (residue < 0) !== (second < 0) ? 1 : 0)
    },
    1
  )
}
