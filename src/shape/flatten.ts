import * as Internal from '@app/internal/index.ts'
import transpose from '@app/shape/transpose.ts'

/**
 * Flatten nested arrays into one dimension.
 * @description Collects every leaf value into a single array.
 * @template T - Type of the flattened values
 * @param input - Nested array to flatten
 * @param order - Memory layout order, row-major or column-major
 * @returns Flat array of all leaf values
 */
export default function flatten<T = number>(input: unknown[], order: 'C' | 'F' = 'C'): T[] {
  if (order !== 'C' && order !== 'F') {
    throw new RangeError("order must be one of 'C' or 'F'")
  }
  const complex = Internal.classify(input, true, true) === true
  if (!Array.isArray(input[0])) {
    return complex ? (Internal.nested(input) as unknown as T[]) : (input.slice() as T[])
  }
  if (!Array.isArray((input[0] as unknown[])[0])) {
    const matrix = input as unknown[][]
    const height = matrix.length
    if (order === 'C') {
      const result: unknown[] = []
      for (let outer = 0; outer < height; outer++) {
        const slice = matrix[outer]
        if (slice) {
          for (let inner = 0; inner < slice.length; inner++) {
            result.push(slice[inner])
          }
        }
      }
      return (complex ? Internal.nested(result) : result) as T[]
    }
    const width = matrix[0]?.length ?? 0
    const result = new Array<unknown>(height * width)
    for (let column = 0; column < width; column++) {
      for (let outer = 0; outer < height; outer++) {
        result[column * height + outer] = matrix[outer]?.[column]
      }
    }
    return (complex ? Internal.nested(result) : result) as T[]
  }
  const result = (order === 'F' ? transpose(input) : input).flat(Infinity) as T[]
  return complex ? (Internal.nested(result) as unknown as T[]) : result
}
