import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Test whether operands are equal.
 * @description Compares matching entries of both operands.
 * @param first - First operand as a scalar, vector, or matrix
 * @param right - Second operand as a scalar, vector, or matrix
 * @param reduce - When true, combines results into one boolean
 * @param missing - When true, treats NaN entries as equal
 * @returns Match results matching the broadcast shape
 */
export default function equal(
  first: Types.NumerixValue,
  right: Types.NumerixValue,
  reduce = false,
  missing = false
): boolean | boolean[] | boolean[][] {
  if (reduce) {
    return Internal.equals(first, right, missing)
  }
  if (
    !missing &&
    Internal.classify(first, true, true) === false &&
    Internal.classify(right, true, true) === false
  ) {
    if (typeof right === 'number') {
      return typeof first === 'number'
        ? first === right
        : Internal.mapper(first as number[] | number[][], (leading) => leading === right)
    }
    if (typeof first === 'number') {
      return Internal.mapper(right as number[] | number[][], (trailing) => first === trailing)
    }
  }
  return Internal.broadcast(
    first,
    right,
    (leading, trailing) => Internal.equals(leading, trailing, missing),
    NaN
  )
}
