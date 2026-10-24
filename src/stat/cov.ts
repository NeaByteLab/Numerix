import * as Internal from '@app/internal/index.ts'

/**
 * Compute the covariance of signals.
 * @description Measures how two signals vary together.
 * @param values - First signal used in the calculation
 * @param partner - Second signal used in the calculation
 * @param freedom - Degrees of freedom used in the divisor
 * @returns Covariance matrix of the given signals
 */
export default function cov(
  values: number[] | number[][],
  partner?: number[],
  freedom = 1
): number[][] {
  const rows = Internal.signals(values, partner)
  const samples = rows[0]?.length ?? 0
  const denominator = samples - freedom
  return Internal.covariance(rows, (sum) => sum / denominator)
}
