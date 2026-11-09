import type * as Types from '@app/types.ts'
import classify from '@app/internal/classify.ts'

/**
 * Map a function over complex values.
 * @description Applies a transform to each entry.
 * @template Output - Result element type
 * @param value - Complex or real values to transform
 * @param apply - Transform applied to each entry
 * @param complex - Optional inherited complex container flag
 * @returns Transformed values matching the input nesting shape
 */
export default function traverse<Output>(
  value: Types.NumerixValue,
  apply: (entry: Types.NumerixComplex | number) => Output,
  complex?: boolean
): Output | Output[] | Output[][] {
  if (!Array.isArray(value)) {
    return apply(complex && typeof value === 'number' ? { re: value, im: 0 } : value)
  }
  const resolved = complex ?? classify(value, true, true) === true
  if (!Array.isArray(value[0])) {
    if (!resolved) {
      return (value as number[]).map(apply)
    }
    return (value as (number | Types.NumerixComplex)[]).map((entry) =>
      apply(typeof entry === 'number' ? { re: entry, im: 0 } : entry)
    )
  }
  if (!resolved) {
    return (value as number[][]).map((slice) => (slice ?? []).map(apply))
  }
  return (value as (number | Types.NumerixComplex)[][]).map((slice) =>
    (slice ?? []).map((entry) => apply(typeof entry === 'number' ? { re: entry, im: 0 } : entry))
  )
}
