/**
 * Extract a substring from text.
 * @description Slices each string between the given bounds.
 * @param text - String or array of strings to slice
 * @param start - Starting index of the extracted portion
 * @param stop - Ending index of the extracted portion
 * @returns Extracted substrings matching the input shape
 */
export default function slice(
  text: string | string[],
  start: number = 0,
  stop?: number
): string | string[] {
  if (!Array.isArray(text)) {
    return text.slice(start, stop)
  }
  const length = text.length
  const result = new Array<string>(length)
  for (let index = 0; index < length; index++) {
    result[index] = (text[index] ?? '').slice(start, stop)
  }
  return result
}
