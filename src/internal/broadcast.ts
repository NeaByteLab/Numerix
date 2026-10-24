import numeric from '@app/internal/numeric.ts'

/**
 * Apply a binary function to operands.
 * @description Combines operands element-wise with broadcast.
 * @param left - Left operand as scalar, vector, or matrix
 * @param right - Right operand as scalar, vector, or matrix
 * @param apply - Scalar function applied to each element pair
 * @param identity - Value substituted when an operand has no matching entry
 * @returns Result with the broadcast shape of the operands
 * @template R - Result element type
 */
export default function broadcast<R>(
  left: boolean | number | (boolean | number)[] | (boolean | number)[][],
  right: boolean | number | (boolean | number)[] | (boolean | number)[][],
  apply: (first: number, second: number) => R,
  identity = 0
): R | R[] | R[][] {
  const leftArray = Array.isArray(left)
  const rightArray = Array.isArray(right)
  if (!leftArray && !rightArray) {
    return apply(Number(left), Number(right))
  }
  const leftSize = leftArray ? (left as (boolean | number)[]).length : 0
  const rightSize = rightArray ? (right as (boolean | number)[]).length : 0
  const leftGrid = leftArray && Array.isArray((left as (boolean | number)[])[0])
  const rightGrid = rightArray && Array.isArray((right as (boolean | number)[])[0])
  if (!leftGrid && !rightGrid && leftArray !== rightArray) {
    const vector = (leftArray ? left : right) as (boolean | number)[]
    const scalar = Number(leftArray ? right : left)
    const result = new Array<R>(vector.length)
    for (let index = 0; index < vector.length; index++) {
      const entry = vector[index]
      result[index] = entry === undefined
        ? apply(scalar, identity)
        : leftArray
        ? apply(Number(entry), scalar)
        : apply(scalar, Number(entry))
    }
    return result
  }
  if (leftGrid && !rightGrid) {
    const result = new Array<R>(leftSize)
    for (let index = 0; index < leftSize; index++) {
      result[index] = broadcast(
        (left as (boolean | number)[][])[index] as never,
        right,
        apply,
        identity
      ) as R
    }
    return result
  }
  if (!leftGrid && rightGrid) {
    const result = new Array<R>(rightSize)
    const leftList = left as (boolean | number)[]
    const scalar = leftList.length === 1
    for (let index = 0; index < rightSize; index++) {
      result[index] = broadcast(
        scalar ? leftList[0] as never : left,
        (right as (boolean | number)[][])[index] as never,
        apply,
        identity
      ) as R
    }
    return result
  }
  const count = leftArray && rightArray
    ? rightSize === 1 ? leftSize : leftSize === 1 ? rightSize : leftSize
    : leftArray
    ? leftSize
    : rightSize
  if (leftArray && rightArray && numeric(left) && numeric(right)) {
    const source = left as (boolean | number)[]
    const target = right as (boolean | number)[]
    const result = new Array<R>(count)
    const leftSolo = leftSize === 1
    const rightSolo = rightSize === 1
    for (let index = 0; index < count; index++) {
      const leftValue = leftSolo ? source[0] : source[index]
      const rightValue = rightSolo ? target[0] : target[index]
      result[index] = apply(
        leftValue === undefined ? identity : Number(leftValue),
        rightValue === undefined ? identity : Number(rightValue)
      )
    }
    return result
  }
  const result = new Array(count)
  for (let index = 0; index < count; index++) {
    const leftItem = leftArray
      ? (leftSize === 1 ? (left as (boolean | number)[])[0] : (left as (boolean | number)[])[index])
      : left
    const rightItem = rightArray
      ? (rightSize === 1
        ? (right as (boolean | number)[])[0]
        : (right as (boolean | number)[])[index])
      : right
    result[index] = broadcast(
      leftItem as never,
      rightItem as never,
      apply,
      identity
    )
  }
  return result as R[] | R[][]
}
