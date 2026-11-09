import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute each square root.
 * @description Applies the square root across nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @returns Square roots matching the input nesting shape
 */
export default function sqrt(
  value: number | number[] | number[][]
): number | number[] | number[][]
/**
 * Compute each complex square root.
 * @description Applies the square root across nested inputs.
 * @param value - Complex or real input values
 * @returns Square roots matching the input nesting shape
 */
export default function sqrt(
  value: Types.NumerixValue
): Types.NumerixValue
/**
 * Compute each nested square root.
 * @description Applies the square root across nested inputs.
 * @param value - Complex or real input values
 * @returns Square roots matching the input nesting shape
 */
export default function sqrt(
  value: Types.NumerixValue
): Types.NumerixValue {
  return Internal.traverse(value, (entry) => {
    if (Internal.shape(entry)) {
      if (Math.abs(entry.im) === Infinity) {
        return { re: Infinity, im: entry.im }
      }
      const scale = Math.hypot(entry.re, entry.im)
      if (scale === 0) {
        return { re: 0, im: 0 }
      }
      const radical = Math.sqrt(
        (scale === Infinity && Number.isFinite(entry.re) && Number.isFinite(entry.im)
          ? 2 * Math.hypot(0.25 * entry.re, 0.25 * entry.im)
          : 0.5 * scale) + 0.5 * Math.abs(entry.re)
      )
      if (entry.re >= 0) {
        const imags = 0.5 * (entry.im / radical)
        return {
          re: radical,
          im: imags === 0 && !(entry.im < 0 || Object.is(entry.im, -0)) ? 0 : imags
        }
      }
      return {
        re: 0.5 * (Math.abs(entry.im) / radical),
        im: entry.im < 0 || Object.is(entry.im, -0) ? -radical : radical
      }
    }
    return Math.sqrt(Number(entry))
  }) as Types.NumerixValue
}
