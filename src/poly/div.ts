import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import convert from '@app/poly/convert.ts'
import domain from '@app/poly/domain.ts'

/**
 * Divide one polynomial by another.
 * @description Performs polynomial long division.
 * @param dividend - Coefficients of the dividend polynomial
 * @param divisor - Coefficients of the divisor polynomial
 * @param basis - Polynomial basis of the coefficients
 * @returns Quotient and remainder coefficients
 */
export default function div(
  dividend: number[] | number | Types.NumerixComplex[] | Types.NumerixComplex,
  divisor: number[] | number | Types.NumerixComplex[] | Types.NumerixComplex,
  basis: Types.NumerixBasis = 'poly'
): [number[], number[]] | [Types.NumerixComplex[], Types.NumerixComplex[]] {
  const first = Array.isArray(dividend) ? dividend : [dividend]
  const right = Array.isArray(divisor) ? divisor : [divisor]
  if (first.length === 0 || right.length === 0) {
    throw new RangeError('Coefficient array is empty')
  }
  if (Array.isArray(first[0]) || Array.isArray(right[0])) {
    throw new RangeError('Coefficient array is not 1-d')
  }
  const complex = Internal.classify(first, true, true) === true ||
    Internal.classify(right, true, true) === true
  const remainder = (
    basis === 'poly'
      ? (complex ? Internal.nested(first) : (first as number[]).slice())
      : convert((complex ? Internal.nested(first) : first) as number[], basis, 'poly')
  ) as (number | Types.NumerixComplex)[]
  const target = domain(
    (basis === 'poly' ? right : convert(right as number[], basis, 'poly')) as number[],
    'trim'
  ) as (number | Types.NumerixComplex)[]
  const order = target.length - 1
  const leading = Internal.components((target[order] ?? 0) as number)
  const scale = Math.max(Math.abs(leading.re), Math.abs(leading.im))
  if (order < 0 || scale === 0) {
    throw new RangeError('polynomial division by zero')
  }
  const cosine = leading.re / scale
  const sines = leading.im / scale
  const denom = scale * (cosine * cosine + sines * sines)
  if (remainder.length - 1 < order) {
    const trimmed = domain(remainder as number[], 'trim') as number[]
    return [
      [complex ? { re: 0, im: 0 } : 0],
      basis === 'poly' ? trimmed : convert(trimmed, 'poly', basis)
    ] as [number[], number[]] | [Types.NumerixComplex[], Types.NumerixComplex[]]
  }
  if (!complex) {
    const quotient = new Array<number>(remainder.length - order).fill(0)
    for (let power = remainder.length - 1 - order; power >= 0; power--) {
      const alpha = Number(remainder[order + power] ?? 0) / leading.re
      quotient[power] = alpha
      for (let factor = 0; factor <= order; factor++) {
        remainder[factor + power] = Number(remainder[factor + power] ?? 0) -
          alpha * Number(target[factor] ?? 0)
      }
    }
    const ratios = domain(quotient, 'trim') as number[]
    const residue = domain(remainder.slice(0, Math.max(1, order)) as number[], 'trim') as number[]
    return [
      basis === 'poly' ? ratios : convert(ratios, 'poly', basis),
      basis === 'poly' ? residue : convert(residue, 'poly', basis)
    ]
  }
  const quotient = new Array<Types.NumerixComplex>(remainder.length - order)
  for (let power = remainder.length - 1 - order; power >= 0; power--) {
    const entry = remainder[order + power]
    const first = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
    const other = Internal.shape(entry) ? entry.im : 0
    const alpha = (first * cosine + other * sines) / denom
    const omega = (other * cosine - first * sines) / denom
    quotient[power] = { re: alpha === 0 ? 0 : alpha, im: omega === 0 ? 0 : omega }
    for (let factor = 0; factor <= order; factor++) {
      const coeff = target[factor]
      const value = Internal.shape(coeff) ? coeff.re : Number(coeff ?? 0)
      const phase = Internal.shape(coeff) ? coeff.im : 0
      const prior = remainder[factor + power] as Types.NumerixComplex
      const reals = prior.re - (alpha * value - omega * phase)
      const imags = prior.im - (alpha * phase + omega * value)
      prior.re = reals === 0 ? 0 : reals
      prior.im = imags === 0 ? 0 : imags
    }
  }
  const ratios = domain(quotient, 'trim') as Types.NumerixComplex[]
  const residue = domain(remainder.slice(0, Math.max(1, order)), 'trim') as Types.NumerixComplex[]
  return [
    basis === 'poly' ? ratios : convert(ratios, 'poly', basis),
    basis === 'poly' ? residue : convert(residue, 'poly', basis)
  ]
}
