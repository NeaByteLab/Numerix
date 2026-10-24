/**
 * Measure the length of text.
 * @description Counts characters in each string entry.
 * @param text - String or array of strings to measure
 * @returns Character counts matching the input shape
 */
export default function length(text: string | string[]): number | number[] {
  if (!Array.isArray(text)) {
    return text.length
  }
  const length = text.length
  const result = new Array(length)
  for (let index = 0; index < length; index++) {
    result[index] = (text[index] ?? '').length
  }
  return result
}
