import * as Internal from '@app/internal/index.ts'
import length from '@app/string/length.ts'
import slice from '@app/string/slice.ts'

/**
 * Test whether text has a prefix.
 * @description Checks the beginning of each string entry.
 * @param input - String or array of strings to test
 * @param opener - Prefix or array of prefixes expected at the beginning
 * @param begin - Optional starting offset within each string
 * @param finish - Optional ending offset within each string
 * @returns Match results matching the input shape
 */
export default function prefix(
  input: string | string[] | string[][],
  opener: string | string[] | string[][],
  begin?: number,
  finish?: number
): boolean | boolean[] | boolean[][] {
  if (typeof opener === 'string') {
    return Internal.mapper<string, boolean>(input, (source) => {
      const entry = String(source ?? '')
      if (begin === undefined && finish === undefined) {
        return entry.startsWith(opener)
      }
      const total = length(entry)
      const start = begin === undefined ? 0 : begin < 0 ? Math.max(0, total + begin) : begin
      const bound = finish === undefined
        ? total
        : finish < 0
        ? Math.max(0, total + finish)
        : Math.min(total, finish)
      return start <= total && bound >= start && slice(entry, start, bound).startsWith(opener)
    })
  }
  return Internal.broadcast<boolean>(
    input,
    opener,
    (source, target) =>
      prefix(String(source ?? ''), String(target ?? ''), begin, finish) as boolean,
    '' as unknown as number
  )
}
