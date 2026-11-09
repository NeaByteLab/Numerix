import * as Internal from '@app/internal/index.ts'
import length from '@app/string/length.ts'
import slice from '@app/string/slice.ts'

/**
 * Count occurrences of a substring.
 * @description Counts non-overlapping matches inside each string.
 * @param input - String or array of strings to search
 * @param needle - Substring whose occurrences are counted
 * @param begin - Optional starting index of the search slice
 * @param finish - Optional ending index of the search slice
 * @returns Match counts matching the input shape
 */
export default function count(
  input: string | string[] | string[][],
  needle: string | string[] | string[][],
  begin?: number,
  finish?: number
): number | number[] | number[][] {
  if (typeof needle === 'string') {
    return Internal.mapper<string, number>(input, (source) => {
      const entry = String(source ?? '')
      if (begin !== undefined || finish !== undefined) {
        const total = length(entry)
        const start = begin === undefined ? 0 : begin < 0 ? Math.max(0, total + begin) : begin
        const bound = finish === undefined
          ? total
          : finish < 0
          ? Math.max(0, total + finish)
          : Math.min(total, finish)
        if (start > total || bound < start) {
          return 0
        }
        return needle.length === 0
          ? bound - start + 1
          : (count(slice(entry, start, bound), needle) as number)
      }
      if (needle.length === 0) {
        return length(entry) + 1
      }
      let matches = 0
      let cursor = 0
      while (true) {
        const found = entry.indexOf(needle, cursor)
        if (found === -1) {
          return matches
        }
        matches++
        cursor = found + needle.length
      }
    })
  }
  return Internal.broadcast<number>(
    input,
    needle,
    (source, target) => count(String(source ?? ''), String(target ?? ''), begin, finish) as number,
    '' as unknown as number
  )
}
