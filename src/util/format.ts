import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Format a value as text.
 * @description Renders numbers using the requested notation.
 * @param value - Value or array of values to format
 * @param places - Number of digits kept after the decimal
 * @param notation - Notation used to render the values
 * @param radix - Logarithm base for base notation
 * @returns Formatted representation of the value
 */
export default function format(
  value: number | Types.NumerixComplex | unknown[],
  places?: number | 'fixed' | 'positional' | 'scientific' | 'base' | 'binary',
  notation: 'fixed' | 'positional' | 'scientific' | 'base' | 'binary' | number = 'fixed',
  radix?: number
): string {
  const requested = typeof places === 'string'
    ? places
    : typeof notation === 'string'
    ? notation
    : 'fixed'
  const chosen = requested === 'positional' ? 'fixed' : requested
  if (
    chosen !== 'fixed' &&
    chosen !== 'scientific' &&
    chosen !== 'base' &&
    chosen !== 'binary'
  ) {
    throw new RangeError("mode must be 'fixed', 'positional', 'scientific', 'base', or 'binary'")
  }
  const digits = typeof places === 'number'
    ? places
    : typeof notation === 'number' && chosen !== 'base'
    ? notation
    : typeof places === 'string' && chosen === 'base' && radix !== undefined
    ? radix
    : chosen === 'binary' || chosen === 'base'
    ? 0
    : 4
  if ((chosen === 'fixed' || chosen === 'scientific') && digits < 0) {
    throw new RangeError('precision must be >= 0')
  }
  const target = typeof places === 'string' && chosen === 'base' && typeof notation === 'number'
    ? notation
    : (radix ?? 10)
  if (chosen === 'base' && (!Number.isInteger(target) || target < 2 || target > 36)) {
    throw new RangeError('radix must be an integer between 2 and 36')
  }
  if (Array.isArray(value)) {
    return `[${value.map((entry) => format(entry as number, digits, chosen, target)).join(', ')}]`
  }
  if (typeof value === 'number') {
    if (chosen === 'binary') {
      if (digits < 0) {
        throw new RangeError('Insufficient bit width')
      }
      const whole = BigInt(Math.trunc(value))
      if (whole === 0n) {
        return '0'.repeat(Math.max(1, digits))
      }
      if (whole > 0n) {
        const binary = whole.toString(2)
        if (digits > 0 && digits < binary.length) {
          throw new RangeError('Insufficient bit width')
        }
        return digits > 0 ? binary.padStart(digits, '0') : binary
      }
      const binary = (-whole).toString(2)
      if (digits <= 0) {
        return `-${binary}`
      }
      let width = binary.length
      if ((1n << BigInt(width - 1)) === -whole) {
        width -= 1
      }
      const complement = ((1n << BigInt(width + 1)) + whole).toString(2)
      if (digits < complement.length) {
        throw new RangeError('Insufficient bit width')
      }
      return '1'.repeat(digits - complement.length) + complement
    }
    if (chosen === 'base') {
      if (!Number.isFinite(value)) {
        throw new RangeError('cannot convert non-finite float to integer')
      }
      const whole = Math.trunc(value)
      if (whole === 0) {
        return '0'.repeat(Math.max(1, digits))
      }
      return `${whole < 0 ? '-' : ''}${digits > 0 ? '0'.repeat(digits) : ''}${
        Math.abs(whole).toString(target).toUpperCase()
      }`
    }
    if (!Number.isFinite(value)) {
      return Number.isNaN(value) ? 'nan' : value < 0 ? '-inf' : 'inf'
    }
    const negative = value < 0 || Object.is(value, -0)
    const magnitude = Math.abs(value)
    if (magnitude === 0) {
      return chosen === 'scientific' ? (negative ? '-0.e+00' : '0.e+00') : (negative ? '-0.' : '0.')
    }
    const rendered = String(magnitude)
    const marker = rendered.indexOf('e')
    const mantissa = marker === -1 ? rendered : rendered.slice(0, marker)
    const period = mantissa.indexOf('.')
    const stripped = period === -1
      ? mantissa
      : mantissa.slice(0, period) + mantissa.slice(period + 1)
    let leading = 0
    while (leading + 1 < stripped.length && stripped.charCodeAt(leading) === 48) {
      leading++
    }
    const shortest = {
      digits: leading > 0 ? stripped.slice(leading) : stripped,
      point: (period === -1 ? mantissa.length : period) +
        (marker === -1 ? 0 : Number(rendered.slice(marker + 1))) -
        leading
    }
    const remainder = chosen === 'scientific'
      ? shortest.digits.slice(1)
      : shortest.point > 0
      ? shortest.digits.slice(shortest.point)
      : '0'.repeat(-shortest.point) + shortest.digits
    let trimmed = remainder.length
    while (trimmed > 0 && remainder.charCodeAt(trimmed - 1) === 48) {
      trimmed--
    }
    const retain = Math.min(trimmed, digits)
    let scored: { digits: string; point: number } | undefined
    if (remainder.length > retain) {
      const expanded = magnitude.toExponential(99)
      const split = expanded.indexOf('e')
      const sequence = expanded.slice(0, 1) + expanded.slice(2, split)
      let offset = 0
      while (offset + 1 < sequence.length && sequence.charCodeAt(offset) === 48) {
        offset++
      }
      const cleaned = offset > 0 ? sequence.slice(offset) : sequence
      const position = Number(expanded.slice(split + 1)) + 1 - offset
      scored = position < 1
        ? { digits: '0'.repeat(1 - position) + cleaned, point: 1 }
        : { digits: cleaned, point: position }
    }
    let integer = chosen === 'scientific'
      ? shortest.digits.charAt(0)
      : shortest.point > 0
      ? shortest.digits.slice(0, shortest.point) +
        (shortest.point > shortest.digits.length
          ? '0'.repeat(shortest.point - shortest.digits.length)
          : '')
      : ''
    let fraction = chosen === 'scientific' ? remainder.slice(0, retain) : remainder
    if (scored !== undefined) {
      let offset = 0
      if (chosen === 'scientific') {
        while (offset < scored.digits.length && scored.digits.charCodeAt(offset) === 48) {
          offset++
        }
      }
      const prefix = retain > 0 ? fraction.slice(0, retain) : integer
      const sliced = scored.digits.slice(
        chosen === 'scientific' ? offset + 1 : Math.max(scored.point, 0)
      )
      const first = retain < sliced.length ? sliced.charCodeAt(retain) - 48 : 0
      let raise = first > 5
      if (first === 5) {
        for (let index = retain + 1; index < sliced.length; index++) {
          if (sliced.charCodeAt(index) !== 48) {
            raise = true
            break
          }
        }
        if (!raise) {
          raise = (
                retain > 0 && sliced.length >= retain
                  ? sliced.charCodeAt(retain - 1) - 48
                  : prefix.length > 0
                  ? prefix.charCodeAt(prefix.length - 1) - 48
                  : 0
              ) %
              2 ===
            1
        }
      }
      if (retain > 0) {
        if (raise) {
          let cursor = retain - 1
          while (cursor >= 0 && fraction.charCodeAt(cursor) === 57) {
            cursor--
          }
          if (cursor >= 0) {
            fraction = `${fraction.slice(0, cursor)}${fraction.charCodeAt(cursor) - 47}`
          } else {
            fraction = ''
          }
          raise = cursor < 0
        } else {
          fraction = fraction.slice(0, retain)
        }
      } else {
        fraction = ''
      }
      if (raise) {
        let cursor = integer.length - 1
        while (cursor >= 0 && integer.charCodeAt(cursor) === 57) {
          cursor--
        }
        integer = cursor >= 0
          ? `${integer.slice(0, cursor)}${integer.charCodeAt(cursor) - 47}${
            '0'.repeat(integer.length - 1 - cursor)
          }`
          : `1${'0'.repeat(integer.length)}`
      }
    } else if (chosen === 'scientific') {
      fraction = fraction.padEnd(retain, '0')
    }
    if (chosen === 'scientific') {
      let exponent = shortest.point - 1
      if (integer.length > 1) {
        exponent += integer.length - 1
        integer = integer.slice(0, 1)
      }
      return `${negative ? '-' : ''}${integer}.${fraction}e${exponent < 0 ? '-' : '+'}${
        String(Math.abs(exponent)).padStart(2, '0')
      }`
    }
    return `${negative ? '-' : ''}${integer.length > 0 ? integer : '0'}.${fraction}`
  }
  if (Internal.shape(value)) {
    const suffix = format(value.im, digits, chosen, target)
    return `${format(value.re, digits, chosen, target)}${
      suffix.startsWith('-') || suffix.startsWith('+') ? '' : '+'
    }${suffix}j`
  }
  return String(value)
}
