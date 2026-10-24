/**
 * Locate a substring within text.
 * @description Reports the index of the first or last occurrence.
 * @param text - String or array of strings to search
 * @param needle - Substring whose position is reported
 * @param reverse - When true searches from the end
 * @returns Match positions matching the input shape
 */
export default function find(
  text: string | string[],
  needle: string,
  reverse: boolean = false
): number | number[] {
  if (!Array.isArray(text)) {
    return reverse ? text.lastIndexOf(needle) : text.indexOf(needle)
  }
  const length = text.length
  const result = new Array<number>(length)
  if (reverse) {
    for (let index = 0; index < length; index++) {
      result[index] = (text[index] ?? '').lastIndexOf(needle)
    }
    return result
  }
  for (let index = 0; index < length; index++) {
    result[index] = (text[index] ?? '').indexOf(needle)
  }
  return result
}
