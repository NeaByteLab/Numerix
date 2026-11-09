import * as Internal from '@app/internal/index.ts'

/**
 * Copy a value into an array.
 * @description Clones nested values into a fresh container.
 * @template T - Type of the copied value
 * @param source - Value to copy
 * @param target - Array receiving the copied values
 * @returns Copied value
 */
export default function copy<T>(source: T, target?: unknown[]): T {
  const result = (
    Internal.classify(source, true, true) === true
      ? Internal.nested(source)
      : Internal.nested(source, (value) => value)
  ) as T
  if (target && Array.isArray(result)) {
    target.length = result.length
    for (let index = 0; index < result.length; index++) {
      target[index] = result[index]
    }
  }
  return result
}
