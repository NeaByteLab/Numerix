/**
 * Collect the signals of a covariance.
 * @description Normalises the requested signals into a row list.
 * @param values - First signal used in the calculation
 * @param partner - Second signal used in the calculation
 * @returns Signals used in the calculation
 */
export default function signals(
  values: number[] | number[][],
  partner?: number[]
): number[][] {
  if (Array.isArray(values[0])) {
    return values as number[][]
  }
  if (partner) {
    return [values as number[], partner]
  }
  return [values as number[]]
}
