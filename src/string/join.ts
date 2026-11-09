import * as Internal from '@app/internal/index.ts'

/**
 * Join characters with a separator.
 * @description Inserts a separator between every character.
 * @param divider - Separator placed between characters
 * @param input - String to join
 * @returns Joined string
 */
export default function join(
  divider: string,
  input: string
): string
/**
 * Join string vector characters with a separator.
 * @description Inserts a separator between the characters of each string.
 * @param divider - Separator or vector of separators
 * @param input - String or vector of strings to join
 * @returns Vector of joined strings
 */
export default function join(
  divider: string | string[],
  input: string | string[]
): string[]
/**
 * Join string array characters with a separator.
 * @description Inserts a separator between every character.
 * @param divider - Separator or vector of separators
 * @param input - String, vector, or matrix of strings to join
 * @returns Joined strings matching the input shape
 */
export default function join(
  divider: string | string[] | string[][],
  input: string | string[] | string[][]
): string | string[] | string[][]
/**
 * Join characters with a separator.
 * @description Inserts a separator between every character.
 * @param divider - Separator placed between characters
 * @param input - String or array of strings to join
 * @returns Joined strings matching the input shape
 */
export default function join(
  divider: string | string[] | string[][],
  input: string | string[] | string[][]
): string | string[] | string[][] {
  if (typeof divider === 'string') {
    return Internal.mapper<string, string>(
      input,
      (source) => {
        const entry = String(source ?? '')
        if (entry.length === 0) {
          return ''
        }
        let result = ''
        let cursor = 0
        while (cursor < entry.length) {
          const width = (entry.codePointAt(cursor) ?? 0) > 0xffff ? 2 : 1
          if (cursor > 0) {
            result += divider
          }
          result += entry.slice(cursor, cursor + width)
          cursor += width
        }
        return result
      }
    )
  }
  return Internal.broadcast<string>(
    divider,
    input,
    (separator, entry) => join(String(separator ?? ''), String(entry ?? '')),
    '' as unknown as number
  )
}
