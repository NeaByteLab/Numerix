import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Convert polynomial coefficients between bases.
 * @description Rewrites coefficients in the requested basis.
 * @param coefficients - Coefficients of the source polynomial
 * @param source - Basis of the given coefficients
 * @param target - Basis of the returned coefficients
 * @returns Coefficients expressed in the target basis
 */
export default function convert(
  coefficients: number[],
  source?: Types.NumerixBasis,
  target?: Types.NumerixBasis
): number[]
/**
 * Convert complex polynomial coefficients between bases.
 * @description Rewrites complex coefficients in the requested basis.
 * @param coefficients - Complex coefficients of the source polynomial
 * @param source - Basis of the given coefficients
 * @param target - Basis of the returned coefficients
 * @returns Complex coefficients expressed in the target basis
 */
export default function convert(
  coefficients: (number | Types.NumerixComplex)[],
  source?: Types.NumerixBasis,
  target?: Types.NumerixBasis
): Types.NumerixComplex[]
/**
 * Convert polynomial coefficients between bases.
 * @description Rewrites coefficients in the requested basis.
 * @param coefficients - Coefficients of the source polynomial
 * @param source - Basis of the given coefficients
 * @param target - Basis of the returned coefficients
 * @returns Coefficients expressed in the target basis
 */
export default function convert(
  coefficients: (number | Types.NumerixComplex)[],
  source: Types.NumerixBasis = 'cheb',
  target: Types.NumerixBasis = 'poly'
): number[] | Types.NumerixComplex[] {
  if (
    (source !== 'poly' &&
      source !== 'cheb' &&
      source !== 'leg' &&
      source !== 'herm' &&
      source !== 'herme' &&
      source !== 'lag') ||
    (target !== 'poly' &&
      target !== 'cheb' &&
      target !== 'leg' &&
      target !== 'herm' &&
      target !== 'herme' &&
      target !== 'lag')
  ) {
    throw new RangeError("basis must be one of 'poly', 'cheb', 'leg', 'herm', 'herme', or 'lag'")
  }
  if (coefficients.length === 0) {
    throw new RangeError('Coefficient array is empty')
  }
  if (Array.isArray(coefficients[0])) {
    throw new RangeError('Coefficient array is not 1-d')
  }
  if (Internal.classify(coefficients, true, true) === true) {
    const reals = new Array<number>(coefficients.length)
    const imags = new Array<number>(coefficients.length)
    for (let index = 0; index < coefficients.length; index++) {
      const entry = coefficients[index]
      reals[index] = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
      imags[index] = Internal.shape(entry) ? entry.im : 0
    }
    const first = convert(reals, source, target)
    return convert(imags, source, target).map((omega, index) => {
      const alpha = first[index] ?? 0
      return {
        re: alpha === 0 ? 0 : alpha,
        im: omega === 0 ? 0 : omega
      }
    })
  }
  const series = coefficients as number[]
  if (source === target) {
    return series.slice()
  }
  const degree = series.length - 1
  const width = degree + 1
  let result = source === 'poly' ? series.slice() : series
  for (const [basis, forward] of [[source, true], [target, false]] as const) {
    if (basis === 'poly') {
      continue
    }
    const columns = Array.from({ length: width }, () => new Array<number>(width).fill(0))
    columns[0]![0] = 1
    if (degree > 0) {
      if (basis === 'herm') {
        columns[1]![1] = 2
      } else if (basis === 'lag') {
        columns[1]![0] = 1
        columns[1]![1] = -1
      } else {
        columns[1]![1] = 1
      }
    }
    for (let order = 1; order < degree; order++) {
      const current = columns[order] ?? []
      const target = columns[order + 1]!
      for (let power = 0; power <= order + 1; power++) {
        const shifted = power > 0 ? (current[power - 1] ?? 0) : 0
        const prior = columns[order - 1]?.[power] ?? 0
        target[power] = basis === 'cheb'
          ? 2 * shifted - prior
          : basis === 'leg'
          ? ((2 * order + 1) * shifted - order * prior) / (order + 1)
          : basis === 'herm'
          ? 2 * shifted - 2 * order * prior
          : basis === 'herme'
          ? shifted - order * prior
          : ((2 * order + 1) * (current[power] ?? 0) - shifted - order * prior) / (order + 1)
      }
    }
    if (forward) {
      result = new Array<number>(width).fill(0)
      for (let order = 0; order <= degree; order++) {
        const column = columns[order]
        for (let power = 0; power <= order; power++) {
          result[power] = (result[power] ?? 0) + (series[order] ?? 0) * (column?.[power] ?? 0)
        }
      }
    } else {
      const output = new Array<number>(width).fill(0)
      for (let order = degree; order >= 0; order--) {
        const column = columns[order]
        const factor = (result[order] ?? 0) / (column?.[order] ?? 1)
        output[order] = factor
        for (let power = 0; power <= order; power++) {
          result[power] = (result[power] ?? 0) - factor * (column?.[power] ?? 0)
        }
      }
      result = output
    }
  }
  return result
}
