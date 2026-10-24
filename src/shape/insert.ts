/**
 * Insert values into an array.
 * @description Places values at the given index or appends them.
 * @param input - Array values are inserted into
 * @param index - Insertion position or appended values
 * @param values - Values inserted at the given position
 * @returns Array containing the inserted values
 * @template T - Type of the array values
 */
export default function insert<T>(
  input: T[],
  index: number | T | T[],
  values?: T | T[]
): T[] {
  const length = input.length
  const appending = values === undefined
  const source = (appending ? index : values) as T | T[]
  const position = appending ? length : (index as number)
  const target = position < 0 ? Math.max(0, length + position) : Math.min(length, position)
  if (Array.isArray(source)) {
    const count = source.length
    const result = new Array<T>(length + count)
    for (let index = 0; index < target; index++) {
      result[index] = input[index] as T
    }
    for (let index = 0; index < count; index++) {
      result[target + index] = source[index] as T
    }
    for (let index = target; index < length; index++) {
      result[count + index] = input[index] as T
    }
    return result
  }
  const result = new Array<T>(length + 1)
  for (let index = 0; index < target; index++) {
    result[index] = input[index] as T
  }
  result[target] = source
  for (let index = target; index < length; index++) {
    result[index + 1] = input[index] as T
  }
  return result
}
