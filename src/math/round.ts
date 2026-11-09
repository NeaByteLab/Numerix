import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Round each element to the nearest value.
 * @description Applies rounding across nested numeric inputs.
 * @param value - Scalar, vector, or matrix input values
 * @param decimals - Number of decimal places to keep
 * @returns Rounded values matching the input nesting shape
 */
export default function round(
  value: number | number[] | number[][],
  decimals?: number
): number | number[] | number[][]
/**
 * Round each complex element.
 * @description Applies rounding across real and imaginary components.
 * @param value - Complex or real input values
 * @param decimals - Number of decimal places to keep
 * @returns Rounded values matching the input nesting shape
 */
export default function round(
  value: Types.NumerixValue,
  decimals?: number
): Types.NumerixValue
/**
 * Round each nested element.
 * @description Applies rounding across nested numeric inputs.
 * @param value - Complex or real input values
 * @param decimals - Number of decimal places to keep
 * @returns Rounded values matching the input nesting shape
 */
export default function round(
  value: Types.NumerixValue,
  decimals = 0
): Types.NumerixValue {
  const factor = Math.pow(10, Math.abs(decimals))
  const inverse = decimals < 0
  return Internal.traverse(value, (entry) => {
    if (!Internal.shape(entry)) {
      const scalar = Number(entry)
      const scaled = inverse ? scalar / factor : scalar * factor
      if (!Number.isFinite(scaled)) {
        return inverse ? scaled * factor : scaled / factor
      }
      const negative = scaled < 0 || Object.is(scaled, -0)
      const magnitude = Math.abs(scaled)
      const floored = Math.floor(magnitude)
      const fraction = magnitude - floored
      const snapped = (
        fraction > 0.5 || (fraction === 0.5 && (floored & 1) === 1) ? floored + 1 : floored
      ) * (negative ? -1 : 1)
      const result = inverse ? snapped * factor : snapped / factor
      return result === 0 && negative ? -0 : result
    }
    let reals = entry.re
    let imags = entry.im
    for (let index = 0; index < 2; index++) {
      const source = index === 0 ? reals : imags
      const scaled = inverse ? source / factor : source * factor
      let rounded: number
      if (!Number.isFinite(scaled)) {
        rounded = inverse ? scaled * factor : scaled / factor
      } else {
        const negative = scaled < 0 || Object.is(scaled, -0)
        const magnitude = Math.abs(scaled)
        const floored = Math.floor(magnitude)
        const fraction = magnitude - floored
        const value = (
          fraction > 0.5 || (fraction === 0.5 && (floored & 1) === 1) ? floored + 1 : floored
        ) * (negative ? -1 : 1)
        const result = inverse ? value * factor : value / factor
        rounded = result === 0 && negative ? -0 : result
      }
      if (index === 0) {
        reals = rounded
      } else {
        imags = rounded
      }
    }
    return { re: reals, im: imags }
  }) as Types.NumerixValue
}
