import length from '@app/string/length.ts'
import slice from '@app/string/slice.ts'

/**
 * Format a template with values.
 * @description Substitutes placeholders in the template string.
 * @param pattern - Template string or array of templates
 * @param values - Replacement values for the template placeholders
 * @returns Formatted strings matching the input shape
 */
export default function mod(
  pattern: string | string[] | string[][],
  values: (string | number) | (string | number)[] | (string | number)[][]
): string | string[] | string[][] {
  if (
    (Array.isArray(pattern) && Array.isArray(pattern[0])) ||
    (Array.isArray(values) && Array.isArray(values[0]))
  ) {
    const layered = Array.isArray(pattern) && Array.isArray(pattern[0])
      ? (pattern as string[][])
      : null
    const nested = Array.isArray(values) && Array.isArray(values[0])
      ? (values as (string | number)[][])
      : null
    if (
      layered && nested && layered.length !== nested.length &&
      layered.length !== 1 && nested.length !== 1
    ) {
      throw new RangeError('operands could not be broadcast together')
    }
    return Array.from(
      {
        length: layered && nested
          ? (layered.length === 1 ? nested.length : layered.length)
          : layered
          ? layered.length
          : nested!.length
      },
      (_outer, index) =>
        mod(
          layered
            ? (layered[layered.length === 1 ? 0 : index] ?? [])
            : Array.isArray(pattern)
            ? (pattern as string[])
            : [pattern as string],
          nested
            ? (nested[nested.length === 1 ? 0 : index] ?? '')
            : (values as (string | number) | (string | number)[])
        ) as string[]
    )
  }
  const patterns = Array.isArray(pattern) ? (pattern as string[]) : [pattern]
  const items = Array.isArray(pattern) && Array.isArray(values)
    ? (values as (string | number)[])
    : null
  if (
    items && patterns.length !== items.length && patterns.length !== 1 &&
    items.length !== 1
  ) {
    throw new RangeError('operands could not be broadcast together')
  }
  const result = Array.from(
    { length: items ? (patterns.length === 1 ? items.length : patterns.length) : patterns.length },
    (_outer, index) => {
      const payload = (items ? (items[items.length === 1 ? 0 : index] ?? '') : values) as
        | (string | number)
        | (string | number)[]
      let cursor = 0
      return (patterns[patterns.length === 1 ? 0 : index] ?? '').replace(
        /%(?:%|([-+ 0]*)(\d+)?(?:\.(\d+))?([sdiouxXeEfFgG]))/g,
        (match, flags, field, digits, letter) => {
          if (match === '%%') {
            return '%'
          }
          const source = Array.isArray(payload)
            ? payload[cursor++]
            : cursor++ === 0
            ? payload
            : undefined
          if (source === undefined) {
            throw new TypeError('not enough arguments for format string')
          }
          const specifier = letter as string
          const precision = digits as string | undefined
          let token: string
          if (specifier === 's') {
            token = precision !== undefined
              ? slice(String(source), 0, Number(precision))
              : String(source)
          } else {
            if (typeof source !== 'number') {
              throw new TypeError(`format specifier %${specifier} requires a number`)
            }
            const places = precision !== undefined ? Number(precision) : 6
            if (specifier === 'd' || specifier === 'i' || specifier === 'u') {
              const truncated = Math.trunc(source)
              if (precision === undefined) {
                token = String(truncated)
              } else {
                const digits = Math.abs(truncated).toString().padStart(places, '0')
                token = truncated < 0 ? `-${digits}` : digits
              }
            } else if (specifier === 'o' || specifier === 'x' || specifier === 'X') {
              if (!Number.isInteger(source)) {
                throw new TypeError(`format specifier %${specifier} requires an integer`)
              }
              token = Math.trunc(source).toString(specifier === 'o' ? 8 : 16)
            } else if (!Number.isFinite(source)) {
              token = Number.isNaN(source) ? 'nan' : source < 0 ? '-inf' : 'inf'
            } else if (specifier === 'f' || specifier === 'F') {
              token = source.toFixed(places)
            } else if (specifier === 'e' || specifier === 'E') {
              token = source.toExponential(places).replace(/e([+-])(\d)$/, 'e$10$2')
            } else {
              const significant = Math.max(1, places)
              const exponential = source.toExponential(significant - 1)
              const exponent = Number(exponential.slice(exponential.indexOf('e') + 1))
              token = source === 0
                ? (Object.is(source, -0) ? '-0' : '0')
                : (exponent < -4 || exponent >= significant
                  ? exponential
                  : source.toPrecision(significant))
                  .replace(/(\.\d*?[1-9])0+(?=e|$)|\.0+(?=e|$)/, '$1')
                  .replace(/e([+-])(\d)$/, 'e$10$2')
            }
            if (specifier === specifier.toUpperCase()) {
              token = token.toUpperCase()
            }
          }
          const options = (flags as string | undefined) ?? ''
          const width = field !== undefined ? Number(field as string) : 0
          if (specifier === 's') {
            const count = length(token)
            return width <= count
              ? token
              : options.includes('-')
              ? token + ' '.repeat(width - count)
              : ' '.repeat(width - count) + token
          }
          const negative = token.startsWith('-')
          const magnitude = negative ? token.slice(1) : token
          const sense = negative
            ? '-'
            : token !== 'nan' && token !== 'NAN' && options.includes('+')
            ? '+'
            : token !== 'nan' && token !== 'NAN' && options.includes(' ')
            ? ' '
            : ''
          const combined = sense + magnitude
          if (width <= combined.length) {
            return combined
          }
          if (options.includes('-')) {
            return combined.padEnd(width, ' ')
          }
          if (options.includes('0') && typeof source === 'number' && Number.isFinite(source)) {
            return sense + magnitude.padStart(width - sense.length, '0')
          }
          return combined.padStart(width, ' ')
        }
      )
    }
  )
  return !Array.isArray(pattern) ? result[0]! : result
}
