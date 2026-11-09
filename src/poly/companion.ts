import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Build a companion matrix.
 * @description Creates the matrix whose eigenvalues are the roots.
 * @param coefficients - Coefficients of the source polynomial
 * @param basis - Polynomial basis of the coefficients
 * @returns Companion matrix of the polynomial
 */
export default function companion(
  coefficients: number[] | Types.NumerixComplex[],
  basis: Types.NumerixBasis = 'poly'
): number[][] | Types.NumerixComplex[][] {
  if (
    basis !== 'poly' &&
    basis !== 'cheb' &&
    basis !== 'leg' &&
    basis !== 'herm' &&
    basis !== 'herme' &&
    basis !== 'lag'
  ) {
    throw new RangeError("basis must be one of 'poly', 'cheb', 'leg', 'herm', 'herme', or 'lag'")
  }
  if (Array.isArray(coefficients[0])) {
    throw new RangeError('Coefficient array is not 1-d')
  }
  let order = coefficients.length - 1
  while (
    order > 0 &&
    (Internal.shape(coefficients[order])
      ? (coefficients[order] as Types.NumerixComplex).re === 0 &&
        (coefficients[order] as Types.NumerixComplex).im === 0
      : Number(coefficients[order] ?? 0) === 0)
  ) {
    order--
  }
  if (order <= 0) {
    throw new RangeError('Series must have maximum degree of at least 1.')
  }
  const complex = Internal.classify(coefficients, true, true) === true
  const matrix = complex
    ? Array.from({ length: order }, () => Array.from({ length: order }, () => ({ re: 0, im: 0 })))
    : Array.from({ length: order }, () => new Array<number>(order).fill(0))
  const factor = basis === 'herm' ? 2 : 1
  const scales = basis === 'leg' || basis === 'herm' || basis === 'herme'
    ? new Array<number>(order).fill(1)
    : undefined
  if (scales) {
    if (basis === 'leg') {
      for (let index = 0; index < order; index++) {
        scales[index] = 1 / Math.sqrt(2 * index + 1)
      }
    } else {
      for (let cursor = order - 2; cursor >= 0; cursor--) {
        scales[cursor] = (scales[cursor + 1] ?? 1) / Math.sqrt(factor * (cursor + 1))
      }
    }
  }
  for (let index = 0; index < order; index++) {
    if (basis === 'lag') {
      if (complex) {
        ;(matrix as Types.NumerixComplex[][])[index]![index]!.re = 2 * index + 1
      } else {
        ;(matrix as number[][])[index]![index] = 2 * index + 1
      }
    }
    if (index < order - 1) {
      const weight = basis === 'poly'
        ? 0
        : basis === 'cheb'
        ? (index === 0 ? Math.SQRT1_2 : 0.5)
        : basis === 'leg'
        ? (index + 1) * (scales![index] ?? 1) * (scales![index + 1] ?? 1)
        : basis === 'lag'
        ? -(index + 1)
        : Math.sqrt((index + 1) / factor)
      const lower = basis === 'poly' ? 1 : weight
      if (complex) {
        ;(matrix as Types.NumerixComplex[][])[index]![index + 1]!.re = weight || 0
        ;(matrix as Types.NumerixComplex[][])[index + 1]![index]!.re = lower || 0
      } else {
        ;(matrix as number[][])[index]![index + 1] = weight || 0
        ;(matrix as number[][])[index + 1]![index] = lower || 0
      }
    }
  }
  const leading = coefficients[order]
  const first = Internal.shape(leading) ? leading.re : Number(leading ?? 1)
  if (!complex) {
    for (let index = 0; index < order; index++) {
      const reals = Number((matrix as number[][])[index]![order - 1] ?? 0) -
        (Number(coefficients[index] ?? 0) / first) *
          (basis === 'poly'
            ? 1
            : basis === 'cheb'
            ? (order === 1 ? 1 : (index === 0 ? 1 / Math.SQRT1_2 : 1) * 0.5)
            : basis === 'leg'
            ? ((scales![index] ?? 1) / (scales![order - 1] ?? 1)) * (order / (2 * order - 1))
            : basis === 'lag'
            ? -order
            : (scales![index] ?? 1) / factor)
      ;(matrix as number[][])[index]![order - 1] = reals === 0 ? 0 : reals
    }
    return matrix
  }
  const right = Internal.shape(leading) ? leading.im : 0
  const crest = Math.max(Math.abs(first), Math.abs(right)) || 1
  const cosine = first / crest
  const sines = right / crest
  const denom = crest * (cosine * cosine + sines * sines)
  for (let index = 0; index < order; index++) {
    const entry = coefficients[index]
    const alpha = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
    const omega = Internal.shape(entry) ? entry.im : 0
    const weight = basis === 'poly'
      ? 1
      : basis === 'cheb'
      ? (order === 1 ? 1 : (index === 0 ? 1 / Math.SQRT1_2 : 1) * 0.5)
      : basis === 'leg'
      ? ((scales![index] ?? 1) / (scales![order - 1] ?? 1)) * (order / (2 * order - 1))
      : basis === 'lag'
      ? -order
      : (scales![index] ?? 1) / factor
    const prior = (matrix as Types.NumerixComplex[][])[index]![order - 1]!
    const reals = prior.re - ((alpha * cosine + omega * sines) / denom) * weight
    const imags = -((omega * cosine - alpha * sines) / denom) * weight
    prior.re = reals === 0 ? 0 : reals
    prior.im = imags === 0 ? 0 : imags
  }
  return matrix
}
