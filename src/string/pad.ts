import * as Internal from '@app/internal/index.ts'

/**
 * Expand tab characters in one string.
 * @description Replaces tab stops with spaces up to the width.
 * @param input - String to expand
 * @param width - Column width of each tab stop
 * @returns Expanded string
 */
export default function pad(input: string, width?: number): string
/**
 * Expand tabs in a string vector.
 * @description Replaces tab stops with spaces across a vector.
 * @param input - String or vector of strings to expand
 * @param width - Column width or vector of widths
 * @returns Vector of expanded strings
 */
export default function pad(input: string | string[], width?: number | number[]): string[]
/**
 * Expand tabs in string arrays.
 * @description Replaces tab stops with spaces up to the width.
 * @param input - String, vector, or matrix of strings to expand
 * @param width - Column width or vector of widths
 * @returns Expanded strings matching the input shape
 */
export default function pad(
  input: string | string[] | string[][],
  width?: number | number[] | number[][]
): string | string[] | string[][]
/**
 * Expand tabs in string arrays.
 * @description Replaces tab stops with spaces up to the width.
 * @param input - String, vector, or matrix of strings to expand
 * @param width - Column width or vector of widths
 * @returns Expanded strings matching the input shape
 */
export default function pad(
  input: string | string[] | string[][],
  width: number | number[] | number[][] = 8
): string | string[] | string[][] {
  if (typeof width === 'number') {
    return Internal.mapper<string, string>(input, (source) => {
      const entry = typeof source === 'string' ? source : ''
      if (width <= 0) {
        return entry.replace(/\t/g, '')
      }
      let expanded = ''
      let column = 0
      for (const character of entry) {
        if (character === '\t') {
          const spaces = width - (column % width)
          expanded += ' '.repeat(spaces)
          column += spaces
        } else {
          expanded += character
          column = character === '\n' || character === '\r' ? 0 : column + 1
        }
      }
      return expanded
    })
  }
  return Internal.broadcast<string>(
    input,
    width,
    (source, stops) => pad(String(source ?? ''), stops),
    8
  )
}
