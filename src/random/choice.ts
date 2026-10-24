import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Choose values from an array.
 * @description Selects entries with or without replacement.
 * @param values - Source array of selectable values
 * @param size - Number of choices to make when given
 * @param replace - When true allows repeated selections
 * @param generator - Generator supplying uniform samples
 * @returns Single chosen value or array of choices
 * @template T - Type of the selectable values
 */
export default function choice<T>(
  values: T[],
  size?: number,
  replace = true,
  generator?: Types.NumerixGenerator
): T | T[] {
  const length = values.length
  if (length === 0) {
    throw new RangeError('Cannot choose from an empty array')
  }
  if (size === undefined) {
    return values[Math.floor(Internal.source(generator) * length)] as T
  }
  if (replace) {
    const result = new Array<T>(size)
    for (let index = 0; index < size; index++) {
      result[index] = values[Math.floor(Internal.source(generator) * length)] as T
    }
    return result
  }
  if (size > length) {
    throw new RangeError('Cannot take a larger sample than population when replace is false')
  }
  const shuffled = values.slice()
  const result = new Array<T>(size)
  for (let index = 0; index < size; index++) {
    const offset = index + Math.floor(Internal.source(generator) * (length - index))
    const picked = shuffled[offset] as T
    shuffled[offset] = shuffled[index] as T
    result[index] = picked
  }
  return result
}
