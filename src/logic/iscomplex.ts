import * as Internal from '@app/internal/index.ts'

/**
 * Test whether values are complex.
 * @description Checks each element for a complex representation.
 * @param value - Scalar, vector, or matrix values to inspect
 * @param objects - When true inspects complex objects instead
 * @returns Match results matching the input nesting shape
 */
export default function iscomplex(
  value: unknown,
  objects = false
): boolean | boolean[] | boolean[][] {
  return Internal.classify(value, objects, true)
}
