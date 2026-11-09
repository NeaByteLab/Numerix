/**
 * Map a function over values.
 * @description Applies a function to each element and collects results.
 * @template T - Input element type
 * @template R - Result element type
 * @param values - Single value, vector, or matrix of values
 * @param apply - Function applied to each element
 * @returns Mapped value, vector, or matrix of mapped values
 */
export default function mapper<T, R>(
  values: T | T[] | T[][],
  apply: (value: T) => R
): R | R[] | R[][] {
  if (!Array.isArray(values)) {
    return apply(values)
  }
  return Array.isArray(values[0])
    ? (values as T[][]).map((slice) => (slice ?? []).map(apply))
    : (values as T[]).map(apply)
}
