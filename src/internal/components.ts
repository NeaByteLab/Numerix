import type * as Types from '@app/types.ts'
import shape from '@app/internal/shape.ts'

/**
 * Read the components of an entry.
 * @description Treats numbers as real and objects as complex.
 * @param value - Entry to inspect
 * @returns Components of the entry and whether it is complex
 */
export default function components(
  value: Types.NumerixComplex | number
): Types.NumerixComponents {
  if (shape(value)) {
    return {
      re: Number(value.re),
      im: Number(value.im),
      complex: true
    }
  }
  return { re: Number(value), im: 0, complex: false }
}
