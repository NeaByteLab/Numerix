import nested from '@app/internal/nested.ts'
import shape from '@app/internal/shape.ts'

/**
 * Classify values as complex or real.
 * @description Reports the container or entry type.
 * @param value - Scalar, vector, or matrix values to inspect
 * @param objects - When true inspects the container type instead of values
 * @param complex - When true reports complex entries, otherwise real ones
 * @returns Match results matching the input nesting shape
 */
export default function classify(
  value: unknown,
  objects: boolean,
  complex: boolean
): boolean | boolean[] | boolean[][] {
  if (objects) {
    return containerTyped(value) === complex
  }
  return nested(value, (entry) => {
    if (!shape(entry)) {
      return !complex
    }
    const imaginary = (entry as { im: number }).im
    return complex ? imaginary !== 0 : imaginary === 0
  }) as boolean | boolean[] | boolean[][]
}

/**
 * Report whether a container is complex-typed.
 * @description Checks the entries for complex components.
 * @param value - Value to inspect
 * @returns True when the container holds a complex-typed entry
 */
function containerTyped(value: unknown): boolean {
  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index++) {
      if (containerTyped(value[index])) {
        return true
      }
    }
    return false
  }
  return shape(value)
}
