import type * as Types from '@app/types.ts'
import broadcast from '@app/internal/broadcast.ts'
import classify from '@app/internal/classify.ts'
import mapper from '@app/internal/mapper.ts'
import shape from '@app/internal/shape.ts'

/**
 * Compare operands with NumPy-style broadcast.
 * @description Matches entries of both operands against the requested direction.
 * @param first - First operand as a scalar, vector, or matrix
 * @param second - Second operand as a scalar, vector, or matrix
 * @param inclusive - When true, treats equal values as matching
 * @param direction - Side against which the entries are compared
 * @returns Match results matching the broadcast shape
 */
export default function compare(
  first: number | number[] | number[][],
  second: number | number[] | number[][],
  inclusive: boolean,
  direction: Types.NumerixSide
): boolean | boolean[] | boolean[][] {
  if (classify(first, true, true) !== true && classify(second, true, true) !== true) {
    if (typeof second === 'number') {
      return typeof first === 'number'
        ? (direction === 'greater'
          ? (inclusive ? first >= second : first > second)
          : (inclusive ? first <= second : first < second))
        : mapper(
          first,
          direction === 'greater'
            ? (inclusive ? (leading) => leading >= second : (leading) => leading > second)
            : (inclusive ? (leading) => leading <= second : (leading) => leading < second)
        )
    }
    if (typeof first === 'number') {
      return mapper(
        second,
        direction === 'greater'
          ? (inclusive ? (trailing) => first >= trailing : (trailing) => first > trailing)
          : (inclusive ? (trailing) => first <= trailing : (trailing) => first < trailing)
      )
    }
    return broadcast(
      first,
      second,
      (leading, trailing) =>
        direction === 'greater'
          ? (inclusive ? leading >= trailing : leading > trailing)
          : (inclusive ? leading <= trailing : leading < trailing)
    )
  }
  return broadcast(first, second, (leading, trailing) => {
    const reals = shape(leading) ? leading.re : Number(leading ?? 0)
    const imags = shape(leading) ? leading.im : 0
    const alpha = shape(trailing) ? trailing.re : Number(trailing ?? 0)
    const omega = shape(trailing) ? trailing.im : 0
    if (
      Number.isNaN(reals) ||
      Number.isNaN(imags) ||
      Number.isNaN(alpha) ||
      Number.isNaN(omega)
    ) {
      return false
    }
    if (reals !== alpha) {
      return direction === 'greater' ? reals > alpha : reals < alpha
    }
    return direction === 'greater'
      ? inclusive ? imags >= omega : imags > omega
      : inclusive
      ? imags <= omega
      : imags < omega
  })
}
