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
    const entry = value as Types.NumerixComplex
    return {
      re: Number(entry.re),
      im: Number(entry.im),
      complex: true
    }
  }
  if (typeof value !== 'object' || value === null) {
    return { re: Number(value), im: 0, complex: false }
  }
  const entry = value as Partial<Types.NumerixComplex>
  return {
    re: 're' in entry ? Number(entry.re) : 0,
    im: 'im' in entry ? Number(entry.im) : 0,
    complex: false
  }
}
