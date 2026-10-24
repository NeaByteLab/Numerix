import increment from '@app/internal/increment.ts'
import rounder from '@app/internal/rounder.ts'
import shortest from '@app/internal/shortest.ts'
import upround from '@app/internal/upround.ts'

/**
 * Render a number in scientific notation.
 * @description Keeps the shortest round-trip digits, capped by `precision`.
 * @param value - Number to render
 * @param precision - Fractional digits kept in the mantissa
 * @returns The rendered number
 */
export default function scientific(value: number, precision: number): string {
  const negative = value < 0 || Object.is(value, -0)
  const magnitude = Math.abs(value)
  if (magnitude === 0) {
    return negative ? '-0.e+00' : '0.e+00'
  }
  const form = shortest(magnitude)
  const keep = Math.min(form.digits.slice(1).replace(/0+$/, '').length, precision)
  let head = form.digits.charAt(0)
  const rest = form.digits.slice(1)
  let fraction = rest.slice(0, keep)
  if (keep === 0) {
    if (rest.length > 0 && upround(rest, 0, head.charCodeAt(0) - 48)) {
      head = increment(head)
    }
  } else if (rest.length > keep) {
    const result = rounder(fraction, keep, upround(rest, keep))
    fraction = result.kept
    if (result.carry) {
      head = increment(head)
    }
  } else {
    fraction = fraction.padEnd(keep, '0')
  }
  let exponent = form.point - 1
  if (head.length > 1) {
    exponent += head.length - 1
    head = head.slice(0, 1)
  }
  const sign = exponent < 0 ? '-' : '+'
  const digits = String(Math.abs(exponent))
  const padded = digits.length < 2 ? '0' + digits : digits
  const text = head + '.' + fraction.replace(/0+$/, '') + 'e' + sign + padded
  return negative ? '-' + text : text
}
