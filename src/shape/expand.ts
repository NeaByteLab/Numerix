import * as Internal from '@app/internal/index.ts'

/**
 * Expand the nesting of a value.
 * @description Adds array levels around the given input.
 * @param input - Value or nested array to expand
 * @param axis - Target nesting level or dimension count
 * @returns Expanded value with the requested nesting
 */
export default function expand(
  input: unknown,
  axis: number | '1d' | '2d' | '3d' = 0
): unknown {
  const level = Internal.depth(input)
  if (axis === '1d') {
    return level === 0 ? [input] : input
  }
  if (axis === '2d') {
    if (level === 0) {
      return [[input]]
    }
    if (level === 1) {
      return [input]
    }
    return input
  }
  if (axis === '3d') {
    if (level === 0) {
      return [[[input]]]
    }
    if (level === 1) {
      return [expandAt(input, 1)]
    }
    if (level === 2) {
      return expandAt(input, 2)
    }
    return input
  }
  const dimensions = level + 1
  const normalized = axis < 0 ? dimensions + axis : axis
  return expandAt(input, normalized)
}

/**
 * Expand a value to a level.
 * @description Adds array levels until the target level is reached.
 * @param input - Value to expand
 * @param axis - Target nesting level of the result
 * @returns Expanded value at the requested level
 */
function expandAt(input: unknown, axis: number): unknown {
  if (axis <= 0 || !Array.isArray(input)) {
    return [input]
  }
  const length = input.length
  const result = new Array<unknown>(length)
  for (let index = 0; index < length; index++) {
    result[index] = expandAt(input[index], axis - 1)
  }
  return result
}
