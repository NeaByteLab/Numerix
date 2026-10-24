import type * as Types from '@app/types.ts'
import convert from '@app/poly/convert.ts'
import evaluate from '@app/poly/evaluate.ts'

/**
 * Integrate a polynomial.
 * @description Applies integration repeatedly to reach the order.
 * @param coefficients - Coefficients of the source polynomial
 * @param order - Number of integrations to apply
 * @param constant - Constant term added to the result
 * @param lower - Lower bound used for the integration
 * @param basis - Polynomial basis of the coefficients
 * @returns Coefficients of the integrated polynomial
 */
export default function int(
  coefficients: number[],
  order = 1,
  constant: number | number[] = 0,
  lower = 0,
  basis: Types.NumerixBasis = 'poly'
): number[] {
  if (basis === 'lag') {
    let integral = coefficients.slice()
    for (let step = 0; step < order; step++) {
      const offset = Array.isArray(constant) ? (constant[step] ?? 0) : (step === 0 ? constant : 0)
      const length = integral.length
      const integrated = new Array<number>(length + 1).fill(0)
      integrated[0] = integral[0] ?? 0
      integrated[1] = -(integral[0] ?? 0)
      for (let index = 1; index < length; index++) {
        const coeff = integral[index] ?? 0
        integrated[index] = (integrated[index] ?? 0) + coeff
        integrated[index + 1] = (integrated[index + 1] ?? 0) - coeff
      }
      const bound = Number(evaluate(lower, integrated, 'lag'))
      integrated[0] = (integrated[0] ?? 0) + (offset - bound)
      integral = integrated
    }
    return integral
  }
  let integral = basis === 'poly' ? coefficients.slice() : convert(coefficients, basis, 'poly')
  for (let step = 0; step < order; step++) {
    const offset = Array.isArray(constant) ? (constant[step] ?? 0) : (step === 0 ? constant : 0)
    const length = integral.length
    const integrated = new Array<number>(length + 1).fill(0)
    for (let power = 0; power < length; power++) {
      integrated[power + 1] = (integral[power] ?? 0) / (power + 1)
    }
    const bound = Number(evaluate(lower, integrated, 'poly'))
    integrated[0] = offset - bound
    integral = integrated
  }
  return basis === 'poly' ? integral : convert(integral, 'poly', basis)
}
