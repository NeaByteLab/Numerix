import type * as Types from '@app/types.ts'

/**
 * Round digits at a cut.
 * @description Carries into the digits before the cut.
 * @param digits - Digit run to round
 * @param keep - Digits kept before the cut
 * @param up - Whether the cut raises the digit before it
 * @returns The rounded run and a carry flag
 */
export default function rounder(
  digits: string,
  keep: number,
  up: boolean
): Types.NumerixRound {
  const kept = digits.slice(0, keep).split('')
  if (!up) {
    return { kept: kept.join(''), carry: false }
  }
  let index = kept.length - 1
  while (index >= 0) {
    const digit = kept[index]!.charCodeAt(0) - 48
    if (digit === 9) {
      kept[index] = '0'
      index--
    } else {
      kept[index] = String(digit + 1)
      return { kept: kept.join(''), carry: false }
    }
  }
  return { kept: kept.join(''), carry: true }
}
