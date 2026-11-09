import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Read or write matrix text.
 * @description Parses delimited text or renders a matrix.
 * @param source - Text to parse or matrix to render
 * @param delimiter - Separator placed between columns
 * @returns Parsed matrix or rendered text
 */
export default function io(
  source: string | Types.NumerixArray,
  delimiter = ','
): number[][] | Types.NumerixComplex[][] | string {
  if (typeof source === 'string') {
    const records = source.trim().split(/\r?\n/)
    const result: (number | Types.NumerixComplex)[][] = []
    let complex = false
    for (let index = 0; index < records.length; index++) {
      const record = records[index] ?? ''
      const comment = record.indexOf('#')
      const content = (comment === -1 ? record : record.slice(0, comment)).trim()
      if (!content) {
        continue
      }
      const cells = content.split(delimiter)
      const count = cells.length
      if (result.length > 0 && count !== result[0]!.length) {
        throw new RangeError(
          `the number of columns changed from ${result[0]!.length} to ${count} at row ${
            result.length + 1
          }; use usecols to select a subset and avoid this error`
        )
      }
      result.push(
        cells.map((entry) => {
          const token = entry.trim()
          const lower =
            (token.startsWith('(') && token.endsWith(')') ? token.slice(1, -1).trim() : token)
              .toLowerCase()
          let parts: string[] = [token]
          if (lower.endsWith('j') || lower.endsWith('i')) {
            const trimmed = lower.slice(0, -1).trim()
            if (trimmed === '' || trimmed === '+' || trimmed === '-') {
              parts = ['0', trimmed === '-' ? '-1' : '1']
            } else {
              let split = -1
              for (let position = trimmed.length - 1; position > 0; position--) {
                const symbol = trimmed[position]
                const prior = trimmed[position - 1]
                if ((symbol === '+' || symbol === '-') && prior !== 'e' && prior !== 'E') {
                  split = position
                  break
                }
              }
              if (split === -1) {
                parts = ['0', trimmed]
              } else {
                const suffix = trimmed.slice(split).trim()
                parts = [
                  trimmed.slice(0, split),
                  suffix === '+' ? '1' : suffix === '-' ? '-1' : suffix
                ]
              }
            }
          }
          const numbers = parts.map((piece) => {
            const cleaned = piece.trim()
            if (cleaned === '') {
              return undefined
            }
            const folded = cleaned.toLowerCase()
            if (
              folded === 'inf' ||
              folded === '+inf' ||
              folded === 'infinity' ||
              folded === '+infinity'
            ) {
              return Infinity
            }
            if (folded === '-inf' || folded === '-infinity') {
              return -Infinity
            }
            if (folded === 'nan' || folded === '+nan' || folded === '-nan') {
              return NaN
            }
            const numeric = Number(cleaned)
            return Number.isNaN(numeric) ? undefined : numeric
          })
          if (parts.length === 2 && numbers[0] !== undefined && numbers[1] !== undefined) {
            complex = true
            return { re: numbers[0], im: numbers[1] }
          }
          if (parts.length === 1 && numbers[0] !== undefined) {
            return numbers[0]
          }
          throw new RangeError(`could not convert string '${token}' to float64`)
        })
      )
    }
    return complex ? (Internal.nested(result) as Types.NumerixComplex[][]) : (result as number[][])
  }
  if (!Array.isArray(source[0])) {
    return io([source as number[]], '\n') as string
  }
  const complex = Internal.classify(source, true, true) === true
  return (source as unknown[][])
    .map((slice) =>
      (slice ?? [])
        .map((entry) => {
          if (complex) {
            const first = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
            const second = Internal.shape(entry) ? entry.im : 0
            return `${Object.is(first, -0) ? '-0' : `${first}`}${
              Object.is(second, -0) ? '-0' : second < 0 ? `${second}` : `+${second}`
            }j`
          }
          return Object.is(entry, -0) ? '-0' : String(entry ?? 0)
        })
        .join(delimiter)
    )
    .join('\n')
}
