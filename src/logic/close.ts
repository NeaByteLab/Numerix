import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Reduce from '@app/reduce/index.ts'

/**
 * Test whether operands are numerically close.
 * @description Compares operands within relative and absolute tolerances.
 * @param first - First operand as a scalar, vector, or matrix
 * @param right - Second operand as a scalar, vector, or matrix
 * @param relative - Relative tolerance applied to the comparison
 * @param absolute - Absolute tolerance applied to the comparison
 * @param reduce - When true, combines results into one boolean
 * @param equal - When true, treats equal values as close
 * @returns Match results matching the broadcast shape
 */
export default function close(
  first: Types.NumerixValue,
  right: Types.NumerixValue,
  relative = 1e-5,
  absolute = 1e-8,
  reduce = false,
  equal = false
): boolean | boolean[] | boolean[][] {
  if (
    (typeof first === 'object' &&
      first !== null &&
      !Array.isArray(first) &&
      !Internal.shape(first)) ||
    (typeof right === 'object' &&
      right !== null &&
      !Array.isArray(right) &&
      !Internal.shape(right))
  ) {
    throw new TypeError('invalid input type')
  }
  const flags = Internal.classify(first, true, true) !== true &&
      Internal.classify(right, true, true) !== true
    ? Internal.broadcast(first as number, right as number, (alpha, omega) => {
      if (Number.isNaN(alpha) || Number.isNaN(omega)) {
        return equal && Number.isNaN(alpha) && Number.isNaN(omega)
      }
      if (alpha === omega) {
        return true
      }
      return Number.isFinite(alpha) &&
        Number.isFinite(omega) &&
        Math.abs(alpha - omega) <= absolute + relative * Math.abs(omega)
    })
    : Internal.broadcast(first, right, (alpha, omega) => {
      const reals = Internal.shape(alpha) ? alpha.re : Number(alpha ?? 0)
      const imags = Internal.shape(alpha) ? alpha.im : 0
      const prior = Internal.shape(omega) ? omega.re : Number(omega ?? 0)
      const extra = Internal.shape(omega) ? omega.im : 0
      const missing = Number.isNaN(reals) || Number.isNaN(imags)
      const absent = Number.isNaN(prior) || Number.isNaN(extra)
      if (missing || absent) {
        return equal && missing && absent
      }
      if (reals === prior && imags === extra) {
        return true
      }
      return Number.isFinite(reals) &&
        Number.isFinite(imags) &&
        Number.isFinite(prior) &&
        Number.isFinite(extra) &&
        Math.hypot(reals - prior, imags - extra) <=
          absolute + relative * Math.hypot(prior, extra)
    })
  return reduce && typeof flags !== 'boolean' ? Reduce.all(flags) : flags
}
