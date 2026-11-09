import * as Internal from '@app/internal/index.ts'

/**
 * Expand the nesting of a value.
 * @description Adds array levels around the given input.
 * @param input - Value or nested array to expand
 * @param chosen - Target nesting level or axes
 * @returns Expanded value with the requested nesting
 */
export default function expand(
  input: unknown,
  chosen: number | number[] | '1d' | '2d' | '3d' = 0
): unknown {
  const level = Internal.depth(input)
  let result: unknown
  if (Array.isArray(chosen)) {
    const dimension = level + chosen.length
    const visited = new Set<number>()
    for (const entry of chosen) {
      const resolved = (entry ?? 0) < 0 ? dimension + (entry ?? 0) : (entry ?? 0)
      if (resolved < 0 || resolved >= dimension) {
        throw new RangeError('axis is out of bounds for array of dimension ' + dimension)
      }
      if (visited.has(resolved)) {
        throw new RangeError('repeated axis in expand')
      }
      visited.add(resolved)
    }
    result = input
    for (const target of Array.from(visited).sort((first, second) => first - second)) {
      result = expand(result, target)
    }
  } else if (chosen === '1d') {
    result = level === 0 ? [input] : (input as unknown[]).slice()
  } else if (chosen === '2d') {
    result = level === 0
      ? [[input]]
      : level === 1
      ? [(input as unknown[]).slice()]
      : (input as unknown[][]).map((entry) => entry.slice())
  } else if (chosen === '3d') {
    result = level === 0
      ? [[[input]]]
      : level === 1
      ? [expand(input, 1)]
      : level === 2
      ? expand(input, 2)
      : input
  } else {
    if (typeof chosen !== 'number') {
      throw new RangeError("axis must be an integer, array of integers, or '1d' | '2d' | '3d'")
    }
    const normalized = chosen < 0 ? level + 1 + chosen : chosen
    if (normalized < 0 || normalized > level) {
      throw new RangeError('axis is out of bounds for array of dimension ' + level)
    }
    result = normalized === 0 || !Array.isArray(input)
      ? [Array.isArray(input) ? input.slice() : input]
      : input.map((entry) => expand(entry, normalized - 1))
  }
  return Internal.classify(input, true, true) === true ? Internal.nested(result) : result
}
