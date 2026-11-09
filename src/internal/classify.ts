import nested from '@app/internal/nested.ts'
import shape from '@app/internal/shape.ts'

/**
 * Classify values as complex, real, or boolean.
 * @description Reports the container or entry type.
 * @param value - Scalar, vector, or matrix values to inspect
 * @param objects - When true, inspects the container type instead of values
 * @param complex - Target category of complex, real, or boolean entries
 * @returns Match results matching the input nesting shape
 */
export default function classify(
  value: unknown,
  objects: boolean,
  complex: boolean | null
): boolean | boolean[] | boolean[][] {
  if (complex === null) {
    if (typeof value === 'boolean') {
      return true
    }
    if (!Array.isArray(value) || value.length === 0) {
      return false
    }
    for (let index = 0; index < value.length; index++) {
      if (classify(value[index], true, null) !== true) {
        return false
      }
    }
    return true
  }
  if (objects) {
    if (Array.isArray(value)) {
      for (let index = 0; index < value.length; index++) {
        if (classify(value[index], true, true) === true) {
          return complex
        }
      }
      return !complex
    }
    return shape(value) === complex
  }
  return nested(
    value,
    (entry) => (shape(entry) && entry.im !== 0) === complex
  ) as boolean | boolean[] | boolean[][]
}
