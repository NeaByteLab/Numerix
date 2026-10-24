/**
 * Align text within a fixed width.
 * @description Pads text using the requested alignment mode.
 * @param text - String or array of strings to align
 * @param width - Target width of the aligned text
 * @param mode - Alignment mode applied to each string
 * @param fill - Character used to fill the padding
 * @returns Aligned strings matching the input shape
 */
export default function align(
  text: string | string[],
  width: number,
  mode: 'left' | 'right' | 'center' | 'zero' = 'center',
  fill: string = ' '
): string | string[] {
  if (!Array.isArray(text)) {
    return alignText(text, width, mode, fill)
  }
  const length = text.length
  const result = new Array<string>(length)
  for (let index = 0; index < length; index++) {
    result[index] = alignText(text[index] ?? '', width, mode, fill)
  }
  return result
}

/**
 * Align one string within a width.
 * @description Pads the string using the requested alignment mode.
 * @param text - String to align
 * @param width - Target width of the aligned string
 * @param mode - Alignment mode applied to the string
 * @param fill - Character used to fill the padding
 * @returns Aligned string
 */
function alignText(
  text: string,
  width: number,
  mode: 'left' | 'right' | 'center' | 'zero',
  fill: string
): string {
  if (text.length >= width) {
    return text
  }
  if (mode === 'left') {
    return text.padEnd(width, fill)
  }
  if (mode === 'right') {
    return text.padStart(width, fill)
  }
  if (mode === 'zero') {
    const sign = text.startsWith('-') || text.startsWith('+') ? text.charAt(0) : ''
    const digits = sign ? text.slice(1) : text
    return sign + digits.padStart(width - sign.length, '0')
  }
  const total = width - text.length
  const left = total - (total >> 1)
  return fill.repeat(left) + text + fill.repeat(total - left)
}
