import type * as Types from '@app/types.ts'

/**
 * Shortest round-trip form of a double.
 * @description Splits the value into digits and a point offset.
 * @param magnitude - Magnitude of the value
 * @returns Significant digits and the decimal point offset
 */
export default function shortest(magnitude: number): Types.NumerixDigits {
  const text = String(magnitude)
  let mantissa = text
  let exponent = 0
  const mark = text.indexOf('e')
  if (mark !== -1) {
    mantissa = text.slice(0, mark)
    exponent = Number(text.slice(mark + 1))
  }
  let integer = mantissa
  let fraction = ''
  const dot = mantissa.indexOf('.')
  if (dot !== -1) {
    integer = mantissa.slice(0, dot)
    fraction = mantissa.slice(dot + 1)
  }
  const digits = integer + fraction
  let start = 0
  while (start < digits.length - 1 && digits.charCodeAt(start) === 48) {
    start++
  }
  return { digits: digits.slice(start), point: integer.length + exponent - start }
}
