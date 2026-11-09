import * as Internal from '@app/internal/index.ts'

/**
 * Combine operands with bitwise disjunction.
 * @description Combines operands with NumPy-style broadcast.
 * @param first - First operand as a scalar, vector, or matrix
 * @param second - Second operand as a scalar, vector, or matrix
 * @returns Disjunction results matching the broadcast shape
 */
export default function or(
  first: number | number[] | number[][],
  second: number | number[] | number[][] = 0
): number | number[] | number[][] {
  if (typeof second === 'number' && Internal.classify(first, true, true) === false) {
    return typeof first === 'number'
      ? first | second
      : Internal.mapper(first, (alpha) => alpha | second)
  }
  if (typeof first === 'number' && Internal.classify(second, true, true) === false) {
    return Internal.mapper(second, (omega) => first | omega)
  }
  return Internal.broadcast(first, second, (alpha, omega) => alpha | omega)
}
