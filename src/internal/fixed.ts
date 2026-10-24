import exact from '@app/internal/exact.ts'
import exactround from '@app/internal/exactround.ts'
import increment from '@app/internal/increment.ts'
import rounder from '@app/internal/rounder.ts'
import shortest from '@app/internal/shortest.ts'

/**
 * Render a number in positional notation.
 * @description Keeps the shortest round-trip digits, capped by `precision`.
 * @param value - Number to render
 * @param precision - Fractional digits kept after the decimal point
 * @returns The rendered number
 */
export default function fixed(value: number, precision: number): string {
  const negative = value < 0 || Object.is(value, -0)
  const magnitude = Math.abs(value)
  if (magnitude === 0) {
    return negative ? '-0.' : '0.'
  }
  const form = shortest(magnitude)
  let integer = form.point > 0 ? form.digits.slice(0, form.point) : ''
  if (form.point > form.digits.length) {
    integer += '0'.repeat(form.point - form.digits.length)
  }
  let fraction = form.point > 0
    ? form.digits.slice(form.point)
    : '0'.repeat(-form.point) + form.digits
  const keep = Math.min(fraction.replace(/0+$/, '').length, precision)
  if (fraction.length > keep) {
    const exactDigits = exact(magnitude)
    const start = Math.max(exactDigits.point, 0)
    if (keep > 0) {
      const result = rounder(
        fraction,
        keep,
        exactround(exactDigits, start, keep, fraction.slice(0, keep))
      )
      fraction = result.kept
      if (result.carry) {
        integer = increment(integer)
        if (/^0*$/.test(fraction)) {
          fraction = ''
        }
      }
    } else {
      if (exactround(exactDigits, start, 0, integer)) {
        integer = increment(integer)
      }
      fraction = ''
    }
  }
  const text = (integer.length > 0 ? integer : '0') + '.' + fraction
  return negative ? '-' + text : text
}
