/**
 * Report whether digits round up.
 * @description Ties resolve to the even digit.
 * @param digits - Digit run to inspect
 * @param keep - Digits kept before the cut
 * @param tie - Digit that settles a tie when no digit is kept
 * @returns Whether the cut raises the digit before it
 */
export default function upround(digits: string, keep: number, tie = 0): boolean {
  const rest = digits.slice(keep)
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
  const kept = digits.slice(0, keep)
  const last = kept.length > 0 ? kept.charCodeAt(kept.length - 1) - 48 : tie
  return last % 2 === 1
}
