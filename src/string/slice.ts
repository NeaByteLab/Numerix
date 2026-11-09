import * as Internal from '@app/internal/index.ts'
import length from '@app/string/length.ts'

/**
 * Extract a substring from one string.
 * @description Slices the string between the given bounds.
 * @param input - String to slice
 * @param begin - Starting index of the extracted portion
 * @param finish - Ending index of the extracted portion
 * @param stride - Step between extracted characters
 * @returns Extracted substring
 */
export default function slice(
  input: string,
  begin?: number,
  finish?: number,
  stride?: number
): string
/**
 * Extract substrings from a string vector.
 * @description Slices each vector string between the given bounds.
 * @param input - String or vector of strings to slice
 * @param begin - Starting index or vector of starting indices
 * @param finish - Ending index or vector of ending indices
 * @param stride - Step or vector of steps between characters
 * @returns Vector of extracted substrings
 */
export default function slice(
  input: string | string[],
  begin?: number | number[],
  finish?: number | number[],
  stride?: number | number[]
): string[]
/**
 * Extract substrings from string arrays.
 * @description Slices each string between the given bounds.
 * @param input - String, vector, or matrix of strings to slice
 * @param begin - Starting index or vector of starting indices
 * @param finish - Ending index or vector of ending indices
 * @param stride - Step or vector of steps between characters
 * @returns Extracted substrings matching the input shape
 */
export default function slice(
  input: string | string[] | string[][],
  begin?: number | number[] | number[][],
  finish?: number | number[] | number[][],
  stride?: number | number[] | number[][]
): string | string[] | string[][]
/**
 * Extract substrings from string arrays.
 * @description Slices each string between the given bounds.
 * @param input - String, vector, or matrix of strings to slice
 * @param begin - Starting index or vector of starting indices
 * @param finish - Ending index or vector of ending indices
 * @param stride - Step or vector of steps between characters
 * @returns Extracted substrings matching the input shape
 */
export default function slice(
  input: string | string[] | string[][],
  begin?: number | number[] | number[][],
  finish?: number | number[] | number[][],
  stride: number | number[] | number[][] = 1
): string | string[] | string[][] {
  if (
    (begin === undefined || typeof begin === 'number') &&
    (finish === undefined || typeof finish === 'number') &&
    typeof stride === 'number'
  ) {
    if (stride === 0) {
      throw new RangeError('slice step cannot be zero')
    }
    return Internal.mapper<string, string>(input, (source) => {
      const entry = String(source ?? '')
      if (stride === 1) {
        const total = length(entry)
        const start = begin === undefined
          ? 0
          : begin < 0
          ? Math.max(0, total + begin)
          : Math.min(total, begin)
        const bound = finish === undefined
          ? total
          : finish < 0
          ? Math.max(0, total + finish)
          : Math.min(total, finish)
        if (bound <= start) {
          return ''
        }
        if (total === entry.length) {
          return entry.slice(start, bound)
        }
        let cursor = 0
        let index = 0
        while (index < start && cursor < entry.length) {
          cursor += (entry.codePointAt(cursor) ?? 0) > 0xffff ? 2 : 1
          index++
        }
        const offset = cursor
        while (index < bound && cursor < entry.length) {
          cursor += (entry.codePointAt(cursor) ?? 0) > 0xffff ? 2 : 1
          index++
        }
        return entry.slice(offset, cursor)
      }
      const symbols = Array.from(entry)
      const count = symbols.length
      let extracted = ''
      if (stride > 0) {
        for (
          let cursor = Math.min(
            count,
            begin === undefined ? 0 : begin < 0 ? Math.max(0, count + begin) : begin
          );
          cursor < Math.min(
            count,
            finish === undefined ? count : finish < 0 ? Math.max(0, count + finish) : finish
          );
          cursor += stride
        ) {
          extracted += symbols[cursor] ?? ''
        }
        return extracted
      }
      for (
        let cursor = Math.min(
          count - 1,
          begin === undefined ? count - 1 : begin < 0 ? Math.max(-1, count + begin) : begin
        );
        cursor >
          (finish === undefined
            ? -1
            : finish < 0
            ? Math.max(-1, count + finish)
            : Math.min(count, finish));
        cursor += stride
      ) {
        if (cursor >= 0 && cursor < count) {
          extracted += symbols[cursor] ?? ''
        }
      }
      return extracted
    })
  }
  Internal.mapper(stride, (delta) => {
    if ((delta ?? 1) === 0) {
      throw new RangeError('slice step cannot be zero')
    }
    return delta
  })
  return Internal.broadcast<string>(
    Internal.broadcast(
      Internal.broadcast(
        input,
        begin ?? null,
        (entry, first) => ({ entry: String(entry ?? ''), first }),
        null as unknown as number
      ),
      finish ?? null,
      (leading, final) => ({
        entry: (leading as unknown as { entry: string; first: number | null }).entry,
        first: (leading as unknown as { entry: string; first: number | null }).first,
        final
      }),
      null as unknown as number
    ),
    stride,
    (leading, delta) => {
      const { entry, first, final } = leading as unknown as {
        entry: string
        first: number | null
        final: number | null
      }
      return slice(
        entry,
        first === null ? undefined : first,
        final === null ? undefined : final,
        delta ?? 1
      )
    },
    1
  )
}
