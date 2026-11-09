import * as Internal from '@app/internal/index.ts'
import length from '@app/string/length.ts'

/**
 * Align text within a fixed width.
 * @description Pads text using the requested alignment mode.
 * @param input - String or array of strings to align
 * @param width - Target width of the aligned text
 * @param method - Alignment mode applied to each string
 * @param filler - Character used to fill the padding
 * @returns Aligned strings matching the input shape
 */
export default function align(
  input: string | string[] | string[][],
  width: number | number[] | number[][],
  method: 'left' | 'right' | 'center' | 'zero' = 'center',
  filler: string = ' '
): string | string[] | string[][] {
  if (
    method !== 'zero' && method !== 'left' && method !== 'right' && method !== 'center'
  ) {
    throw new RangeError("mode must be one of 'left', 'right', 'center', or 'zero'")
  }
  if (method !== 'zero' && length(filler) !== 1) {
    throw new TypeError('The fill character must be exactly one character long')
  }
  if (typeof width === 'number') {
    return Internal.mapper<string, string>(input, (source) => {
      const entry = typeof source === 'string' ? source : ''
      const count = length(entry)
      if (count >= width) {
        return entry
      }
      const total = width - count
      if (method === 'left') {
        return entry + filler.repeat(total)
      }
      if (method === 'right') {
        return filler.repeat(total) + entry
      }
      if (method === 'zero') {
        const signum = entry.startsWith('-') || entry.startsWith('+') ? entry.charAt(0) : ''
        return signum + '0'.repeat(total) + (signum ? entry.slice(1) : entry)
      }
      const before = (total >> 1) + (total & width & 1)
      return filler.repeat(before) + entry + filler.repeat(total - before)
    })
  }
  return Internal.broadcast<string>(
    input,
    width,
    (source, target) => align(String(source ?? ''), target, method, filler) as string
  )
}
