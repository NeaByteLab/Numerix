import * as Internal from '@app/internal/index.ts'

/**
 * Multiply the entries of an array.
 * @description Combines values into a running product.
 * @param values - Values whose product is computed
 * @param nan - Whether invalid entries are skipped
 * @param axis - Axis along which the product is taken
 * @returns Product for the requested axis
 */
export default function prod(
  values: unknown[],
  nan: boolean | number = false,
  axis?: number
): number | number[] {
  return Internal.reduce(values, nan, axis, Internal.multiplier)
}
