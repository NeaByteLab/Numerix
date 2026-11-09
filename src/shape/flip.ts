import * as Internal from '@app/internal/index.ts'

/**
 * Reverse entries along an axis.
 * @description Reverses rows, columns, or every axis.
 * @param input - Nested array to reverse
 * @param chosen - Axis or named reverse direction
 * @returns Reversed array matching the input nesting
 */
export default function flip(
  input: unknown[] | unknown[][],
  chosen: number | number[] | 'ud' | 'lr' | 'all' | null = 0
): unknown[] | unknown[][] {
  if (chosen === 'all' || chosen === null) {
    if (Array.isArray(input[0])) {
      return Array.from(
        { length: input.length },
        (_unused, index) => flip(input[input.length - 1 - index] as unknown[], 'all')
      ) as unknown[][]
    }
    const reversed = Array.from(
      { length: input.length },
      (_unused, index) => input[input.length - 1 - index]
    )
    return (
      Internal.classify(input, true, true) === true ? Internal.nested(reversed) : reversed
    ) as unknown[]
  }
  const depth = Internal.depth(input)
  if (chosen === 'ud') {
    if (depth < 1) {
      throw new RangeError('Input must be >= 1-d')
    }
    return flip(input, 0)
  }
  if (chosen === 'lr') {
    if (depth < 2) {
      throw new RangeError('Input must be >= 2-d')
    }
    return flip(input, 1)
  }
  if (typeof chosen !== 'number' && !Array.isArray(chosen)) {
    throw new RangeError("axis must be an integer, 'ud', 'lr', 'all', or null")
  }
  const items = Array.isArray(chosen) ? chosen : [chosen]
  const visited = new Set<number>()
  let result: unknown[] = (input as unknown[]).map((entry) =>
    Array.isArray(entry) ? entry.slice() : entry
  )
  for (let cursor = 0; cursor < items.length; cursor++) {
    const entry = items[cursor] ?? 0
    const normalized = entry < 0 ? depth + entry : entry
    if (normalized < 0 || normalized >= depth) {
      throw new RangeError('axis is out of bounds for array of dimension ' + depth)
    }
    if (visited.has(normalized)) {
      throw new RangeError('repeated axis')
    }
    visited.add(normalized)
    result = normalized > 0
      ? result.map((entry) => flip(entry as unknown[], normalized - 1))
      : result.reverse()
  }
  return (
    Internal.classify(input, true, true) === true ? Internal.nested(result) : result
  ) as unknown[] | unknown[][]
}
