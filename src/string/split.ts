import type * as Types from '@app/types.ts'

/**
 * Split text into parts.
 * @description Splits each string on a separator or line break.
 * @param text - String or array of strings to split
 * @param separator - Separator used when splitting on delimiters
 * @param reverse - When true splits at the last separator
 * @param mode - Splitting mode applied to each string
 * @param limit - Maximum number of parts to produce
 * @returns Array of parts for each input string
 */
export default function split(
  text: string | string[],
  separator: string = ' ',
  reverse: boolean = false,
  mode: Types.NumerixSplit = 'sep',
  limit: number = 0
): string[][] {
  const source = Array.isArray(text) ? text : [text]
  const length = source.length
  const result = new Array<string[]>(length)
  for (let index = 0; index < length; index++) {
    const entry = source[index] ?? ''
    if (mode === 'lines') {
      result[index] = splitLines(entry)
      continue
    }
    const parts = separator === ' ' && mode === 'sep' && !reverse
      ? entry.split(/\s+/).filter((part) => part.length > 0)
      : splitText(entry, separator, reverse, limit)
    result[index] = parts.length === 0 ? [entry] : parts
  }
  return result
}

/**
 * Split one string into lines.
 * @description Divides the string on line break sequences.
 * @param text - String to split into lines
 * @returns Lines found in the string
 */
function splitLines(text: string): string[] {
  const lines = text.split(/\r\n|\r|\n/)
  const trailing = lines.length > 1 && lines[lines.length - 1] === ''
  return trailing ? lines.slice(0, -1) : lines
}

/**
 * Split one string on a separator.
 * @description Divides the string into parts around the separator.
 * @param text - String to split
 * @param separator - Separator used when splitting on delimiters
 * @param reverse - When true splits at the last separator
 * @param limit - Maximum number of parts to produce
 * @returns Parts of the split string
 */
function splitText(text: string, separator: string, reverse: boolean, limit: number): string[] {
  const parts = separator === '' ? [...text] : text.split(separator)
  if (!reverse) {
    if (limit <= 0) {
      return parts
    }
    const limited = parts.slice(0, limit)
    const remainder = parts.slice(limit)
    if (remainder.length === 0) {
      return limited
    }
    return [...limited, remainder.join(separator)]
  }
  if (limit <= 0) {
    return parts
  }
  const limited = parts.slice(parts.length - limit)
  const remainder = parts.slice(0, parts.length - limit)
  if (remainder.length === 0) {
    return parts
  }
  return [remainder.join(separator), ...limited]
}
