import * as Internal from '@app/internal/index.ts'

/**
 * Split an array into sections.
 * @description Divides the array into equal or sized sections.
 * @param input - Array to divide into sections
 * @param sections - Number of sections or their sizes
 * @param level - Axis along which the array is split
 * @param method - Splitting mode applied to the array
 * @returns Array of section arrays
 */
export default function split(
  input: unknown[],
  sections: number | number[],
  level = 0,
  method: 'equal' | 'array' | 'vsplit' | 'hsplit' | 'array_split' | boolean = 'equal'
): unknown[][] {
  const chosen = method === true ? 'array_split' : method === false ? 'equal' : method
  if (
    chosen !== 'equal' &&
    chosen !== 'array' &&
    chosen !== 'vsplit' &&
    chosen !== 'hsplit' &&
    chosen !== 'array_split'
  ) {
    throw new RangeError(
      "method must be one of 'equal', 'array', 'vsplit', 'hsplit', or 'array_split'"
    )
  }
  if (typeof sections === 'number' && sections <= 0) {
    throw new RangeError('number of sections must be larger than 0')
  }
  const matrix = Array.isArray(input[0])
  let target = 0
  if (chosen === 'vsplit') {
    if (!matrix) {
      throw new RangeError('vsplit only works on arrays of 2 or more dimensions')
    }
  } else if (chosen === 'hsplit') {
    target = matrix ? 1 : 0
  } else {
    const depth = matrix ? 2 : 1
    target = level < 0 ? depth + level : level
    if (target < 0 || target >= depth) {
      throw new RangeError('axis is out of bounds for array of dimension ' + depth)
    }
  }
  const length = target === 1 && matrix ? (input[0] as unknown[]).length : input.length
  if (
    chosen !== 'array' &&
    chosen !== 'array_split' &&
    typeof sections === 'number' &&
    length % sections !== 0
  ) {
    throw new RangeError('array split does not result in an equal division')
  }
  let start = 0
  const quotient = typeof sections === 'number' ? Math.floor(length / sections) : 0
  const remainder = typeof sections === 'number' ? length % sections : 0
  const result = Array.from(
    { length: typeof sections === 'number' ? sections : sections.length + 1 },
    (_outer, index) => {
      const bound = typeof sections === 'number' ? 0 : (sections[index] ?? 0)
      const finish = typeof sections === 'number'
        ? start + quotient + (index < remainder ? 1 : 0)
        : index < sections.length
        ? Math.max(0, Math.min(length, bound < 0 ? length + bound : bound))
        : length
      const slice = target === 1 && matrix
        ? (input as unknown[][]).map((entry) => entry.slice(start, finish))
        : input.slice(start, finish)
      start = finish
      return slice
    }
  )
  return Internal.classify(input, true, true) === true
    ? (Internal.nested(result) as unknown[][])
    : result
}
