import * as Internal from '@app/internal/index.ts'

/**
 * Test whether operands are numerically close.
 * @description Compares operands within relative and absolute tolerances.
 * @param left - First operand as scalar, vector, or matrix
 * @param right - Second operand as scalar, vector, or matrix
 * @param relative - Relative tolerance applied to the comparison
 * @param absolute - Absolute tolerance applied to the comparison
 * @param reduce - When true combines results into one boolean
 * @param equal - When true treats equal values as close
 * @returns Match results matching the broadcast shape
 */
export default function close(
  left: number | number[] | number[][],
  right: number | number[] | number[][],
  relative = 1e-5,
  absolute = 1e-8,
  reduce = false,
  equal = false
): boolean | boolean[] | boolean[][] {
  if (reduce) {
    return checkClose(left, right, relative, absolute, equal)
  }
  return Internal.broadcast(
    left,
    right,
    (first, second) => closeScalar(Number(first), Number(second), relative, absolute, equal),
    0
  ) as boolean | boolean[] | boolean[][]
}

/**
 * Test whether all entries are close.
 * @description Combines nested results into one boolean.
 * @param left - First operand as scalar, vector, or matrix
 * @param right - Second operand as scalar, vector, or matrix
 * @param relative - Relative tolerance applied to the comparison
 * @param absolute - Absolute tolerance applied to the comparison
 * @param equal - When true treats equal values as close
 * @returns True when every entry is close
 */
function checkClose(
  left: number | number[] | number[][],
  right: number | number[] | number[][],
  relative: number,
  absolute: number,
  equal: boolean
): boolean {
  if (Array.isArray(left) && Array.isArray(right)) {
    if (left.length !== right.length) {
      return false
    }
    for (let index = 0; index < left.length; index++) {
      if (!checkClose(left[index] ?? 0, right[index] ?? 0, relative, absolute, equal)) {
        return false
      }
    }
    return true
  }
  if (Array.isArray(left)) {
    for (let index = 0; index < left.length; index++) {
      if (!checkClose(left[index] ?? 0, right, relative, absolute, equal)) {
        return false
      }
    }
    return true
  }
  if (Array.isArray(right)) {
    for (let index = 0; index < right.length; index++) {
      if (!checkClose(left, right[index] ?? 0, relative, absolute, equal)) {
        return false
      }
    }
    return true
  }
  return closeScalar(Number(left), Number(right), relative, absolute, equal)
}

/**
 * Test whether two scalars are close.
 * @description Compares values within the given tolerances.
 * @param left - First scalar to compare
 * @param right - Second scalar to compare
 * @param relative - Relative tolerance applied to the comparison
 * @param absolute - Absolute tolerance applied to the comparison
 * @param equal - When true treats equal values as close
 * @returns True when the scalars are close
 */
function closeScalar(
  left: number,
  right: number,
  relative: number,
  absolute: number,
  equal: boolean
): boolean {
  if (equal && Number.isNaN(left) && Number.isNaN(right)) {
    return true
  }
  if (left === right) {
    return true
  }
  return Math.abs(left - right) <= absolute + relative * Math.abs(right)
}
