import * as Internal from '@app/internal/index.ts'

/**
 * Strip characters from one string.
 * @description Trims characters from one or both ends.
 * @param input - String to trim
 * @param which - Side or sides that are trimmed
 * @param chars - Optional set of characters to strip
 * @returns Trimmed string
 */
export default function strip(
  input: string,
  which?: string,
  chars?: string
): string
/**
 * Strip characters from a string vector.
 * @description Trims characters from one or both ends of each string.
 * @param input - String or vector of strings to trim
 * @param which - Side or sides that are trimmed
 * @param chars - Optional set of characters to strip
 * @returns Vector of trimmed strings
 */
export default function strip(
  input: string | string[],
  which?: string | string[],
  chars?: string | string[]
): string[]
/**
 * Strip characters from string arrays.
 * @description Trims characters from one or both ends.
 * @param input - String, vector, or matrix of strings to trim
 * @param which - Side or sides that are trimmed
 * @param chars - Optional set of characters to strip
 * @returns Trimmed strings matching the input shape
 */
export default function strip(
  input: string | string[] | string[][],
  which?: string | string[] | string[][],
  chars?: string | string[] | string[][]
): string | string[] | string[][]
/**
 * Strip characters from string arrays.
 * @description Trims characters from one or both ends.
 * @param input - String, vector, or matrix of strings to trim
 * @param which - Side or sides that are trimmed
 * @param chars - Optional set of characters to strip
 * @returns Trimmed strings matching the input shape
 */
export default function strip(
  input: string | string[] | string[][],
  which?: string | string[] | string[][],
  chars?: string | string[] | string[][]
): string | string[] | string[][] {
  const directed = which === 'both' || which === 'left' || which === 'right'
  const direction: 'both' | 'left' | 'right' = directed
    ? which
    : chars === 'left' || chars === 'right' || chars === 'both'
    ? chars
    : 'both'
  const target = directed ? chars : which
  if (!Array.isArray(target)) {
    return Internal.mapper<string, string>(input, (source) => {
      const entry = typeof source === 'string' ? source : ''
      if (typeof target !== 'string') {
        return direction === 'left'
          ? entry.trimStart()
          : direction === 'right'
          ? entry.trimEnd()
          : entry.trim()
      }
      let start = 0
      let finish = entry.length
      if (direction === 'both' || direction === 'left') {
        while (start < finish) {
          const width = (entry.codePointAt(start) ?? 0) > 0xffff ? 2 : 1
          if (!target.includes(entry.slice(start, start + width))) {
            break
          }
          start += width
        }
      }
      if (direction === 'both' || direction === 'right') {
        while (finish > start) {
          const trailing = entry.charCodeAt(finish - 1)
          const width = trailing >= 0xdc00 && trailing <= 0xdfff && finish - 1 > start &&
              entry.charCodeAt(finish - 2) >= 0xd800 && entry.charCodeAt(finish - 2) <= 0xdbff
            ? 2
            : 1
          if (!target.includes(entry.slice(finish - width, finish))) {
            break
          }
          finish -= width
        }
      }
      return entry.slice(start, finish)
    })
  }
  return Internal.broadcast<string>(
    input,
    target,
    (source, charset) =>
      strip(
        String(source ?? ''),
        direction,
        typeof charset === 'string' ? charset : undefined
      ),
    undefined as unknown as number
  )
}
