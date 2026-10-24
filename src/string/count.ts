/**
 * Count occurrences of a substring.
 * @description Counts non-overlapping matches inside each string.
 * @param text - String or array of strings to search
 * @param needle - Substring whose occurrences are counted
 * @returns Match counts matching the input shape
 */
export default function count(text: string | string[], needle: string): number | number[] {
  if (!Array.isArray(text)) {
    return countSubstring(text, needle)
  }
  const length = text.length
  const result = new Array<number>(length)
  for (let index = 0; index < length; index++) {
    result[index] = countSubstring(text[index] ?? '', needle)
  }
  return result
}

/**
 * Count occurrences of a substring.
 * @description Counts non-overlapping matches inside one string.
 * @param text - String to search
 * @param needle - Substring whose occurrences are counted
 * @returns Number of matches found
 */
function countSubstring(text: string, needle: string): number {
  const length = needle.length
  if (length === 0) {
    return text.length + 1
  }
  let total = 0
  let position = 0
  while (true) {
    const match = text.indexOf(needle, position)
    if (match === -1) {
      break
    }
    total++
    position = match + length
  }
  return total
}
