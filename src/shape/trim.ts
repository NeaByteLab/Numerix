/**
 * Remove zero entries from array ends.
 * @description Trims leading or trailing zero values.
 * @param input - Array to trim
 * @param mode - Side or sides that are trimmed
 * @returns Trimmed array without the zero entries
 */
export default function trim(input: number[], mode: 'fb' | 'f' | 'b' = 'fb'): number[] {
  let start = 0
  let end = input.length
  if (mode !== 'b') {
    while (start < end && input[start] === 0) {
      start++
    }
  }
  if (mode !== 'f') {
    while (end > start && input[end - 1] === 0) {
      end--
    }
  }
  return input.slice(start, end)
}
