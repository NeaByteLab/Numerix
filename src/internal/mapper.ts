/**
 * Map a function over values.
 * @description Applies a function to each element and collects results.
 * @param values - Single value or array of values
 * @param apply - Function applied to each element
 * @returns Mapped value or array of mapped values
 * @template T - Input element type
 * @template R - Result element type
 */
export default function mapper<T, R>(
  values: T | T[],
  apply: (value: T) => R
): R | R[] {
  if (!Array.isArray(values)) {
    return apply(values)
  }
  const length = values.length
  const result = new Array<R>(length)
  for (let index = 0; index < length; index++) {
    result[index] = apply(values[index] as T)
  }
  return result
}
