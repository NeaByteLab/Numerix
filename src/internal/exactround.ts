import type * as Types from '@app/types.ts'

/**
 * Report whether exact values round up.
 * @description Follows the exact binary value of the double.
 * @param form - Exact digit form of the value
 * @param start - Digit index where the fraction of the cut begins
 * @param keep - Fractional digits kept before the cut
 * @param kept - The kept digits, used to settle ties
 * @returns Whether the cut raises the digit before it
 */
export default function exactround(
  form: Types.NumerixDigits,
  start: number,
  keep: number,
  kept: string
): boolean {
  const rest = form.digits.slice(start + keep)
  if (rest.length === 0) {
    return false
  }
  const first = rest.charCodeAt(0) - 48
  if (first > 5) {
    return true
  }
  if (first < 5) {
    return false
  }
  const more = rest.slice(1).replace(/0+$/, '')
  if (more.length > 0) {
    return true
  }
  const last = kept.length > 0 ? kept.charCodeAt(kept.length - 1) - 48 : 0
  return last % 2 === 1
}
