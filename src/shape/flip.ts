import * as Internal from '@app/internal/index.ts'

/**
 * Reverse entries along an axis.
 * @description Reverses rows, columns, or every axis.
 * @param input - Nested array to reverse
 * @param axis - Axis or named direction to reverse
 * @returns Reversed array matching the input nesting
 */
export default function flip(
  input: unknown[],
  axis: number | 'ud' | 'lr' | 'all' = 0
): unknown[] {
  if (axis === 'all') {
    return flipAll(input)
  }
  if (axis === 'ud') {
    return flipAxis(input, 0)
  }
  if (axis === 'lr') {
    return flipAxis(input, 1)
  }
  const normalized = axis < 0 ? Internal.depth(input) + axis : axis
  return flipAxis(input, normalized)
}

/**
 * Reverse every axis of an array.
 * @description Recursively reverses rows and columns together.
 * @param input - Nested array to reverse
 * @returns Array reversed along every axis
 */
function flipAll(input: unknown[]): unknown[] {
  const length = input.length
  const result = new Array<unknown>(length)
  for (let index = 0; index < length; index++) {
    const entry = input[length - 1 - index]
    result[index] = Array.isArray(entry) ? flipAll(entry) : entry
  }
  return result
}

/**
 * Reverse one axis of an array.
 * @description Reverses entries along the requested axis.
 * @param input - Nested array to reverse
 * @param axis - Axis to reverse
 * @returns Array reversed along the given axis
 */
function flipAxis(input: unknown[], axis: number): unknown[] {
  const length = input.length
  const result = new Array<unknown>(length)
  if (axis <= 0) {
    for (let index = 0; index < length; index++) {
      result[index] = input[length - 1 - index]
    }
    return result
  }
  for (let index = 0; index < length; index++) {
    const row = input[index]
    result[index] = Array.isArray(row) ? flipAxis(row, axis - 1) : row
  }
  return result
}
