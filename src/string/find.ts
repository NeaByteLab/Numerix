import * as Internal from '@app/internal/index.ts'
import length from '@app/string/length.ts'
import slice from '@app/string/slice.ts'

/**
 * Locate a substring within text.
 * @description Reports the index of the first or last occurrence.
 * @param input - String or array of strings to search
 * @param needle - Substring whose position is reported
 * @param reverse - When true, searches from the end
 * @param begin - Optional starting slice index
 * @param finish - Optional ending slice index
 * @returns Match positions matching the input shape
 */
export default function find(
  input: string | string[] | string[][],
  needle: string | string[] | string[][],
  reverse?: boolean | number,
  begin?: number,
  finish?: number | boolean
): number | number[] | number[][] {
  const backwards = typeof reverse === 'boolean'
    ? reverse
    : typeof finish === 'boolean'
    ? finish
    : false
  const first = typeof reverse === 'number' ? reverse : begin
  const final = typeof reverse === 'number'
    ? begin
    : typeof finish === 'number'
    ? finish
    : undefined
  if (typeof needle === 'string') {
    return Internal.mapper<string, number>(input, (source) => {
      const entry = String(source ?? '')
      if (first !== undefined || final !== undefined) {
        const total = length(entry)
        const start = first === undefined ? 0 : first < 0 ? Math.max(0, total + first) : first
        const bound = final === undefined
          ? total
          : final < 0
          ? Math.max(0, total + final)
          : Math.min(total, final)
        if (start > total || bound < start) {
          return -1
        }
        const position = find(slice(entry, start, bound), needle, backwards) as number
        return position === -1 ? -1 : start + position
      }
      const offset = backwards ? entry.lastIndexOf(needle) : entry.indexOf(needle)
      if (offset <= 0) {
        return offset
      }
      let count = 0
      for (let cursor = 0; cursor < offset; cursor++) {
        const point = entry.charCodeAt(cursor)
        if (point >= 0xd800 && point <= 0xdbff && cursor + 1 < offset) {
          const trailing = entry.charCodeAt(cursor + 1)
          if (trailing >= 0xdc00 && trailing <= 0xdfff) {
            cursor++
          }
        }
        count++
      }
      return count
    })
  }
  return Internal.broadcast<number>(
    input,
    needle,
    (source, token) =>
      find(String(source ?? ''), String(token ?? ''), backwards, first, final) as number,
    '' as unknown as number
  )
}
