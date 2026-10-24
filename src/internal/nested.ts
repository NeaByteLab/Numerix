/**
 * Map a function over nested values.
 * @description Applies a transform to every leaf entry.
 * @param value - Scalar, vector, or matrix input
 * @param apply - Transform applied to each leaf entry
 * @returns Transformed values matching the input nesting shape
 * @template R - Result element type
 */
export default function nested<R>(
  value: unknown,
  apply: (entry: unknown) => R
): R | R[] | R[][] {
  if (Array.isArray(value)) {
    const length = value.length
    const result = new Array<R>(length)
    for (let index = 0; index < length; index++) {
      result[index] = nested(value[index], apply) as R
    }
    return result as R[] | R[][]
  }
  return apply(value)
}
