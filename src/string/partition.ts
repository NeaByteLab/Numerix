import * as Internal from '@app/internal/index.ts'

/**
 * Split one string around a separator.
 * @description Reports the text before and after the separator.
 * @param input - String to partition
 * @param divider - Separator marking the split position
 * @param reverse - When true, splits at the last separator
 * @returns Partitioned parts
 */
export default function partition(
  input: string,
  divider: string,
  reverse?: boolean
): [string, string, string]
/**
 * Split a string vector around a separator.
 * @description Reports the text before and after the separator for each string.
 * @param input - String or vector of strings to partition
 * @param divider - Separator or vector of separators
 * @param reverse - When true, splits at the last separator
 * @returns Vector of partitioned parts
 */
export default function partition(
  input: string | string[],
  divider: string | string[],
  reverse?: boolean
): [string, string, string][]
/**
 * Split string arrays around a separator.
 * @description Reports the text before and after the separator.
 * @param input - String, vector, or matrix of strings to partition
 * @param divider - Separator or vector of separators
 * @param reverse - When true, splits at the last separator
 * @returns Partitioned parts matching the input shape
 */
export default function partition(
  input: string | string[] | string[][],
  divider: string | string[] | string[][],
  reverse?: boolean
): [string, string, string] | [string, string, string][] | [string, string, string][][]
/**
 * Split string arrays around a separator.
 * @description Reports the text before and after the separator.
 * @param input - String, vector, or matrix of strings to partition
 * @param divider - Separator or vector of separators
 * @param reverse - When true, splits at the last separator
 * @returns Partitioned parts matching the input shape
 */
export default function partition(
  input: string | string[] | string[][],
  divider: string | string[] | string[][],
  reverse: boolean = false
): [string, string, string] | [string, string, string][] | [string, string, string][][] {
  if (typeof divider === 'string') {
    if (divider === '') {
      throw new RangeError('empty separator')
    }
    return Internal.mapper<string, [string, string, string]>(input, (source) => {
      const entry = String(source ?? '')
      const position = reverse ? entry.lastIndexOf(divider) : entry.indexOf(divider)
      return position === -1
        ? (reverse ? ['', '', entry] : [entry, '', ''])
        : [entry.slice(0, position), divider, entry.slice(position + divider.length)]
    })
  }
  return Internal.broadcast<[string, string, string]>(
    input,
    divider,
    (source, separator) =>
      partition(String(source ?? ''), String(separator ?? ''), reverse) as [string, string, string],
    '' as unknown as number
  )
}
