import type * as Types from '@app/types.ts'

/**
 * Split text into parts.
 * @description Splits each string on a separator or line break.
 * @param input - String or array of strings to split
 * @param divider - Separator used when splitting on delimiters
 * @param reverse - When true, splits at the last separator
 * @param method - Splitting mode applied to each string
 * @param limit - Maximum number of parts to produce
 * @returns Array of parts for each input string
 */
export default function split(
  input: string | string[],
  divider?: string | Types.NumerixSplit,
  reverse?: boolean | number,
  method?: Types.NumerixSplit | number | boolean,
  limit?: number
): string[][]
/**
 * Split a string matrix into parts.
 * @description Splits each matrix string on a separator or line break.
 * @param input - Matrix of strings to split
 * @param divider - Separator used when splitting on delimiters
 * @param reverse - When true, splits at the last separator
 * @param method - Splitting mode applied to each string
 * @param limit - Maximum number of parts to produce
 * @returns Matrix of part arrays
 */
export default function split(
  input: string[][],
  divider?: string | Types.NumerixSplit,
  reverse?: boolean | number,
  method?: Types.NumerixSplit | number | boolean,
  limit?: number
): string[][][]
/**
 * Split text into parts.
 * @description Splits each string on a separator or line break.
 * @param input - String, vector, or matrix of strings to split
 * @param divider - Separator used when splitting on delimiters
 * @param reverse - When true, splits at the last separator
 * @param method - Splitting mode applied to each string
 * @param limit - Maximum number of parts to produce
 * @returns Array of parts for each input string
 */
export default function split(
  input: string | string[] | string[][],
  divider: string | Types.NumerixSplit = ' ',
  reverse?: boolean | number,
  method?: Types.NumerixSplit | number | boolean,
  limit = 0
): string[][] | string[][][] {
  if (Array.isArray(input) && Array.isArray(input[0])) {
    return (input as string[][]).map((entry) => split(entry, divider, reverse, method, limit))
  }
  const policy: Types.NumerixSplit = divider === 'lines'
    ? 'lines'
    : typeof method === 'string'
    ? method
    : 'sep'
  if (policy !== 'sep' && policy !== 'lines') {
    throw new RangeError("mode must be one of 'sep' or 'lines'")
  }
  const token = divider === 'lines' ? ' ' : divider
  if (policy === 'sep' && token === '') {
    throw new RangeError('empty separator')
  }
  const backward = typeof reverse === 'boolean'
    ? reverse
    : typeof method === 'boolean'
    ? method
    : false
  const bound = typeof reverse === 'number' ? reverse : typeof method === 'number' ? method : limit
  return (Array.isArray(input) ? (input as string[]) : [input]).map((value) => {
    const entry = value ?? ''
    if (policy === 'lines') {
      if (entry.length === 0) {
        return []
      }
      if (backward) {
        return entry.match(/[^\r\n]*(?:\r\n|\r|\n)|[^\r\n]+/g) ?? []
      }
      const parts = entry.split(/\r\n|\r|\n/)
      return parts.length > 1 && parts[parts.length - 1] === '' ? parts.slice(0, -1) : parts
    }
    if (token === ' ') {
      if (bound <= 0) {
        return entry.split(/\s+/).filter((piece) => piece.length > 0)
      }
      let remainder = backward ? entry.trimEnd() : entry.trimStart()
      if (remainder.length === 0) {
        return []
      }
      const pieces: string[] = []
      for (let count = 0; count < bound; count++) {
        const match = (backward ? /\s+(\S+)$/ : /\s+/).exec(remainder)
        if (!match) {
          break
        }
        if (backward) {
          pieces.unshift(match[1] ?? '')
          remainder = remainder.slice(0, match.index)
        } else {
          pieces.push(remainder.slice(0, match.index))
          remainder = remainder.slice(match.index + match[0].length)
        }
      }
      if (remainder.length > 0) {
        if (backward) {
          pieces.unshift(remainder)
        } else {
          pieces.push(remainder)
        }
      }
      return pieces
    }
    const pieces = entry.split(token)
    const sliced = bound <= 0 || bound >= pieces.length - 1
      ? pieces
      : !backward
      ? pieces.slice(0, bound).concat([pieces.slice(bound).join(token)])
      : [pieces.slice(0, pieces.length - bound).join(token)].concat(
        pieces.slice(pieces.length - bound)
      )
    return sliced.length === 0 ? [entry] : sliced
  })
}
