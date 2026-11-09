import * as Internal from '@app/internal/index.ts'
import length from '@app/string/length.ts'
import slice from '@app/string/slice.ts'

/**
 * Test whether text has a suffix.
 * @description Checks the end of each string entry.
 * @param input - String or array of strings to test
 * @param closer - Suffix or array of suffixes expected at the end
 * @param begin - Optional starting offset within each string
 * @param finish - Optional ending offset within each string
 * @returns Match results matching the input shape
 */
export default function suffix(
  input: string | string[] | string[][],
  closer: string | string[] | string[][],
  begin?: number,
  finish?: number
): boolean | boolean[] | boolean[][] {
  if (typeof closer === 'string') {
    return Internal.mapper<string, boolean>(input, (source) => {
      const entry = String(source ?? '')
      if (begin === undefined && finish === undefined) {
        return entry.endsWith(closer)
      }
      const total = length(entry)
      const start = begin === undefined ? 0 : begin < 0 ? Math.max(0, total + begin) : begin
      const bound = finish === undefined
        ? total
        : finish < 0
        ? Math.max(0, total + finish)
        : Math.min(total, finish)
      return start <= total && bound >= start && slice(entry, start, bound).endsWith(closer)
    })
  }
  return Internal.broadcast<boolean>(
    input,
    closer,
    (source, target) =>
      suffix(String(source ?? ''), String(target ?? ''), begin, finish) as boolean,
    '' as unknown as number
  )
}
