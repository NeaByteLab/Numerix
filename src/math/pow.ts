import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import exp from '@app/math/exp.ts'
import log from '@app/math/log.ts'
import mul from '@app/math/mul.ts'
import reciprocal from '@app/math/reciprocal.ts'

/**
 * Raise each element to a power.
 * @description Combines operands with NumPy-style broadcast.
 * @param first - Base operand as a scalar, vector, or matrix
 * @param right - Second operand as a scalar, vector, or matrix
 * @returns Powers matching the broadcast shape of the operands
 */
export default function pow(
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
    | Types.NumerixComplex[][] = 2
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
        if (alpha === 0 && omega === 0) {
          return { re: 1, im: 0 }
        }
        if (
          reals === 1 && imags === 0 && Number.isFinite(alpha) && Number.isFinite(omega)
        ) {
          return { re: 1, im: 0 }
        }
        if (alpha === 1 && omega === 0) {
          return { re: reals, im: imags }
        }
        if (reals === 0 && imags === 0) {
          return alpha > 0 && Number.isFinite(omega) ? { re: 0, im: 0 } : { re: NaN, im: NaN }
        }
        if (
          omega === 0 &&
          Number.isFinite(alpha) &&
          Number.isInteger(alpha) &&
          alpha >= -100 &&
          alpha <= 100
        ) {
          let count = Math.abs(alpha)
          let accum: Types.NumerixComplex = { re: reals, im: imags }
          let factor: Types.NumerixComplex = { re: reals, im: imags }
          count--
          while (count > 0) {
            if ((count & 1) !== 0) {
              accum = mul(accum, factor) as Types.NumerixComplex
            }
            count >>= 1
            if (count > 0) {
              factor = mul(factor, factor) as Types.NumerixComplex
            }
          }
          if (alpha < 0) {
            if (Math.abs(accum.re) === Infinity || Math.abs(accum.im) === Infinity) {
              return { re: NaN, im: NaN }
            }
            accum = reciprocal(accum) as Types.NumerixComplex
          }
          return {
            re: accum.re === 0 ? 0 : accum.re,
            im: accum.im === 0 ? 0 : accum.im
          }
        }
        const product = mul(log({ re: reals, im: imags }) as Types.NumerixComplex, {
          re: alpha,
          im: omega
        }) as Types.NumerixComplex
        const radius = Math.exp(product.re)
        if (omega === 0 && alpha < -1 && Number.isInteger(alpha) && radius === 0) {
          return { re: NaN, im: NaN }
        }
        const raised = exp(product) as Types.NumerixComplex
        return {
          re: Number.isFinite(radius) && Math.abs(raised.re) <= radius * 1e-15 ? 0 : raised.re,
          im: Number.isFinite(radius) && Math.abs(raised.im) <= radius * 1e-15 ? 0 : raised.im
        }
      },
      1
    )
  }
  if (
    typeof right === 'number' &&
    Internal.classify(first, true, true) === false
  ) {
    if (typeof first === 'number') {
      return first === 1 || right === 0
        ? 1
        : first === -1 && (right === Infinity || right === -Infinity)
        ? 1
        : Math.pow(first, right)
    }
    return Internal.mapper(
      first as number[] | number[][],
      (radix) =>
        radix === 1 || right === 0
          ? 1
          : radix === -1 && (right === Infinity || right === -Infinity)
          ? 1
          : Math.pow(radix, right)
    )
  }
  return Internal.broadcast(
    first as number,
    right as number,
    (radix, exponent) => {
      if (radix === 1 || exponent === 0) {
        return 1
      }
      if (radix === -1 && (exponent === Infinity || exponent === -Infinity)) {
        return 1
      }
      return Math.pow(radix, exponent)
    }
  )
}
