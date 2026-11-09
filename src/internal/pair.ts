import type * as Types from '@app/types.ts'
import beats from '@app/internal/beats.ts'
import broadcast from '@app/internal/broadcast.ts'
import classify from '@app/internal/classify.ts'
import shape from '@app/internal/shape.ts'

/**
 * Combine two candidate lists element-wise.
 * @description Pairs entries and keeps the extreme of each pair.
 * @param values - Candidate entries
 * @param other - Competing entries
 * @param ignore - Whether invalid entries are skipped
 * @param direction - Whether the smallest or largest entry wins
 * @returns Extreme of each pair
 */
export default function pair(
  values: unknown,
  other: unknown,
  ignore: boolean,
  direction: Types.NumerixDirection
):
  | number
  | number[]
  | number[][]
  | Types.NumerixComplex
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  if (classify(values, true, true) !== true && classify(other, true, true) !== true) {
    return broadcast<number>(
      values as number,
      other as number,
      (reals, alpha) => {
        const front = Number.isNaN(reals)
        const after = Number.isNaN(alpha)
        return (
            front && after
              ? true
              : front || after
              ? (ignore ? !front : front)
              : beats(reals, alpha, direction)
          )
          ? reals
          : alpha
      },
      direction === 'min' ? Infinity : -Infinity
    )
  }
  return broadcast<number | Types.NumerixComplex>(
    values,
    other,
    (leading, trailing) => {
      const reals = shape(leading) ? leading.re : Number(leading ?? 0)
      const imags = shape(leading) ? leading.im : 0
      const alpha = shape(trailing) ? trailing.re : Number(trailing ?? 0)
      const omega = shape(trailing) ? trailing.im : 0
      const front = Number.isNaN(reals) || Number.isNaN(imags)
      const after = Number.isNaN(alpha) || Number.isNaN(omega)
      const first = front && after
        ? true
        : front || after
        ? (ignore ? !front : front)
        : beats(reals, alpha, direction) ||
          (reals === alpha && beats(imags, omega, direction))
      return { re: first ? reals : alpha, im: first ? imags : omega }
    },
    direction === 'min' ? Infinity : -Infinity
  ) as
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
}
