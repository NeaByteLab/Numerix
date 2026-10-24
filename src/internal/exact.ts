import type * as Types from '@app/types.ts'

/**
 * Exact decimal digits of a double.
 * @description Splits the value into digits and a point offset.
 * @param magnitude - Magnitude of the value
 * @returns Significant digits and the decimal point offset
 */
export default function exact(magnitude: number): Types.NumerixDigits {
  const text = magnitude.toExponential(99)
  const split = text.indexOf('e')
  const exponent = Number(text.slice(split + 1))
  const digits = text.slice(0, split).replace('.', '')
  let start = 0
  while (start < digits.length - 1 && digits.charCodeAt(start) === 48) {
    start++
  }
  const point = exponent + 1 - start
  if (point < 1) {
    return { digits: '0'.repeat(1 - point) + digits.slice(start), point: 1 }
  }
  return { digits: digits.slice(start), point }
}
