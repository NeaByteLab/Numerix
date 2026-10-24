import type * as Types from '@app/types.ts'
import convert from '@app/poly/convert.ts'

/**
 * Compute polynomial roots.
 * @description Finds root values or the derived root polynomial.
 * @param input - Coefficients of the source polynomial
 * @param roots - When true returns the derived root polynomial
 * @param basis - Polynomial basis of the coefficients
 * @returns Root values or coefficients of the root polynomial
 */
export default function root(
  input: number[],
  roots = false,
  basis: Types.NumerixBasis = 'poly'
): number[] {
  if (roots) {
    const count = input.length
    const polynomial = new Array<number>(count + 1).fill(0)
    polynomial[0] = 1
    for (let index = 0; index < count; index++) {
      const root = input[index] ?? 0
      for (let power = index + 1; power >= 1; power--) {
        polynomial[power] = (polynomial[power - 1] ?? 0) - (polynomial[power] ?? 0) * root
      }
      polynomial[0] = -(polynomial[0] ?? 0) * root
    }
    return basis === 'poly' ? polynomial : convert(polynomial, 'poly', basis)
  }
  const source = basis === 'poly' ? input : convert(input, basis, 'poly')
  let degree = source.length - 1
  while (degree > 0 && Math.abs(source[degree] ?? 0) < 1e-15) {
    degree--
  }
  if (degree <= 0) {
    return []
  }
  const leading = source[degree] ?? 1
  const monic = new Array<number>(degree + 1)
  for (let power = 0; power <= degree; power++) {
    monic[power] = (source[power] ?? 0) / leading
  }
  if (degree === 1) {
    return [-(monic[0] ?? 0)]
  }
  if (degree === 2) {
    const constant = monic[0] ?? 0
    const linear = monic[1] ?? 0
    const discriminant = linear * linear - 4 * constant
    if (discriminant < 0) {
      return []
    }
    const root = Math.sqrt(discriminant)
    return [(-linear - root) / 2, (-linear + root) / 2].sort(
      (left, right) => left - right
    )
  }
  const reals = new Float64Array(degree)
  const imaginaries = new Float64Array(degree)
  const step = (2 * Math.PI) / degree
  for (let index = 0; index < degree; index++) {
    const angle = step * index + 0.1
    reals[index] = Math.cos(angle)
    imaginaries[index] = Math.sin(angle)
  }
  for (let iteration = 0; iteration < 100; iteration++) {
    let largest = 0
    for (let index = 0; index < degree; index++) {
      const currentRe = reals[index] ?? 0
      const currentIm = imaginaries[index] ?? 0
      let polynomialRe = 1
      let polynomialIm = 0
      for (let power = degree - 1; power >= 0; power--) {
        const next = polynomialRe * currentRe - polynomialIm * currentIm + (monic[power] ?? 0)
        const nextIm = polynomialRe * currentIm + polynomialIm * currentRe
        polynomialRe = next
        polynomialIm = nextIm
      }
      let derivativeRe = 1
      let derivativeIm = 0
      for (let peer = 0; peer < degree; peer++) {
        if (index === peer) {
          continue
        }
        const differenceRe = currentRe - (reals[peer] ?? 0)
        const differenceIm = currentIm - (imaginaries[peer] ?? 0)
        const next = derivativeRe * differenceRe - derivativeIm * differenceIm
        const nextIm = derivativeRe * differenceIm + derivativeIm * differenceRe
        derivativeRe = next
        derivativeIm = nextIm
      }
      const denominator = derivativeRe * derivativeRe + derivativeIm * derivativeIm || 1e-30
      const deltaRe = (polynomialRe * derivativeRe + polynomialIm * derivativeIm) / denominator
      const deltaIm = (polynomialIm * derivativeRe - polynomialRe * derivativeIm) / denominator
      reals[index] = currentRe - deltaRe
      imaginaries[index] = currentIm - deltaIm
      const shift = Math.abs(deltaRe) + Math.abs(deltaIm)
      if (shift > largest) {
        largest = shift
      }
    }
    if (largest < 1e-15) {
      break
    }
  }
  const result: number[] = []
  for (let index = 0; index < degree; index++) {
    if (Math.abs(imaginaries[index] ?? 0) < 1e-6) {
      let refined = reals[index] ?? 0
      for (let step = 0; step < 3; step++) {
        let value = 1
        let compensation = 0
        let slope = 0
        for (let power = degree - 1; power >= 0; power--) {
          slope = slope * refined + value
          const product = value * refined
          const valueScaled = 134217729 * value
          const valueTop = valueScaled - (valueScaled - value)
          const valueBottom = value - valueTop
          const rootScaled = 134217729 * refined
          const rootTop = rootScaled - (rootScaled - refined)
          const rootBottom = refined - rootTop
          const productError =
            ((valueTop * rootTop - product) + valueTop * rootBottom + valueBottom * rootTop) +
            valueBottom * rootBottom
          const coefficient = monic[power] ?? 0
          const updated = product + coefficient
          const residual = updated - product
          const sumError = (product - (updated - residual)) + (coefficient - residual)
          value = updated
          compensation = compensation * refined + (productError + sumError)
        }
        if (Math.abs(slope) > 1e-14) {
          refined -= (value + compensation) / slope
        }
      }
      result.push(refined)
    }
  }
  return result.sort((left, right) => left - right)
}
