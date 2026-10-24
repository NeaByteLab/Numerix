import * as Internal from '@app/internal/index.ts'

/**
 * Format a value as text.
 * @description Renders numbers using the requested notation.
 * @param value - Value or array of values to format
 * @param precision - Number of digits kept after the decimal
 * @param mode - Notation used to render the values
 * @param base - Logarithm base for base notation
 * @returns Formatted representation of the value
 */
export default function format(
  value: number | unknown[],
  precision = 4,
  mode: 'fixed' | 'scientific' | 'base' = 'fixed',
  base = 10
): string {
  return formatElement(value, precision, mode, base)
}

/**
 * Format one value as text.
 * @description Renders a number or nested array as text.
 * @param element - Value to render
 * @param precision - Number of digits kept after the decimal
 * @param mode - Notation used to render the value
 * @param base - Logarithm base for base notation
 * @returns Formatted representation of the value
 */
function formatElement(
  element: unknown,
  precision: number,
  mode: 'fixed' | 'scientific' | 'base',
  base: number
): string {
  if (Array.isArray(element)) {
    const length = element.length
    const parts = new Array<string>(length)
    for (let index = 0; index < length; index++) {
      parts[index] = formatElement(element[index], precision, mode, base)
    }
    return `[${parts.join(', ')}]`
  }
  if (typeof element === 'number') {
    if (mode === 'base') {
      return Math.trunc(element).toString(base).toUpperCase()
    }
    if (mode === 'scientific') {
      return Internal.scientific(element, precision)
    }
    return Internal.fixed(element, precision)
  }
  return String(element)
}
