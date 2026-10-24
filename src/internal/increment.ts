/**
 * Increment a digit string by one.
 * @description Adds one to the digit run.
 * @param text - Digits to increment
 * @returns The incremented digits
 */
export default function increment(text: string): string {
  const chars = text.split('')
  let index = chars.length - 1
  while (index >= 0) {
    const digit = chars[index]!.charCodeAt(0) - 48
    if (digit === 9) {
      chars[index] = '0'
      index--
    } else {
      chars[index] = String(digit + 1)
      return chars.join('')
    }
  }
  return '1' + chars.join('')
}
