import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Extract values at indexed positions.
 * @description Reads entries from the given positions.
 * @template T - Type of the array values
 * @param input - Array from which the values are taken
 * @param indices - Positions or pattern selecting the entries
 * @param offset - Diagonal offset applied to the pattern
 * @param policy - Boundary handling mode
 * @returns Taken values matching the requested shape
 */
export default function take<T = number>(
  input: T[] | T[][],
  indices: number | number[] | number[][] | 'diag' = 0,
  offset?: number | null | 'wrap' | 'clip' | 'raise',
  policy: 'wrap' | 'clip' | 'raise' = 'wrap'
): T | T[] | T[][] {
  if (indices === 'diag') {
    return Internal.diagonal<T>(
      (Array.isArray(input[0]) ? input : [input]) as T[][],
      typeof offset === 'number' ? offset : 0
    )
  }
  const chosen: 'wrap' | 'clip' | 'raise' = typeof offset === 'string' ? offset : policy
  const level = typeof offset === 'number' ? offset : undefined
  if (chosen !== 'wrap' && chosen !== 'clip' && chosen !== 'raise') {
    throw new RangeError("clipmode must be one of 'clip', 'raise', or 'wrap'")
  }
  const matrix = Array.isArray(input[0])
  if (matrix && level !== undefined) {
    const resolved = level < 0 ? 2 + level : level
    if (resolved !== 0 && resolved !== 1) {
      throw new RangeError('axis is out of bounds for array of dimension 2')
    }
    if (resolved === 1) {
      if (!Array.isArray(indices) || !Array.isArray(indices[0])) {
        return (input as T[][]).map((slice) => take(slice ?? [], indices, 0, chosen)) as
          | T[]
          | T[][]
      }
      const height = input.length
      const depth = indices.length
      if (height !== depth && height !== 1 && depth !== 1) {
        throw new RangeError('shape mismatch indexing arrays could not be broadcast together')
      }
      return Array.from(
        { length: height === 1 ? depth : height },
        (_outer, outer) =>
          take(
            (input as T[][])[height === 1 ? 0 : outer] ?? [],
            (indices as number[][])[depth === 1 ? 0 : outer] ?? [],
            0,
            chosen
          ) as T[]
      )
    }
    if (Array.isArray(indices) && Array.isArray(indices[0])) {
      const slices = input as T[][]
      const table = indices as number[][]
      const height = slices.length
      const width = slices[0]?.length ?? 0
      const depth = table.length
      const extent = table[0]?.length ?? 0
      if (width !== extent && width !== 1 && extent !== 1) {
        throw new RangeError('shape mismatch indexing arrays could not be broadcast together')
      }
      const columns = width === 1 ? extent : width
      if (height === 0 && depth > 0 && columns > 0) {
        throw new RangeError('cannot do a non-empty take from an empty axes')
      }
      const output = Array.from({ length: depth }, (_outer, outer) => {
        const slice = table[outer] ?? []
        return Array.from({ length: columns }, (_inner, column) => {
          const entry = slice[extent === 1 ? 0 : column] ?? 0
          const target = chosen === 'clip'
            ? Math.max(0, Math.min(height - 1, entry))
            : chosen === 'raise'
            ? (entry < 0 ? height + entry : entry)
            : (((entry % height) + height) % height)
          if (chosen === 'raise' && (target < 0 || target >= height)) {
            throw new RangeError('Index out of bounds')
          }
          return slices[target]?.[width === 1 ? 0 : column] as T
        })
      })
      return Internal.classify(input, true, true) === true
        ? (Internal.nested(output) as unknown as T[][])
        : output
    }
  } else if (!matrix && level !== undefined && level !== 0 && level !== -1) {
    throw new RangeError('axis is out of bounds for array of dimension 1')
  }
  const values = matrix && level === undefined ? Shape.flatten<T>(input) : (input as unknown[])
  const length = values.length
  const output = Internal.nested(indices, (entry) => {
    if (length === 0) {
      throw new RangeError('cannot do a non-empty take from an empty axes')
    }
    const index = (entry as number) ?? 0
    const target = chosen === 'clip'
      ? Math.max(0, Math.min(length - 1, index))
      : chosen === 'raise'
      ? (index < 0 ? length + index : index)
      : (((index % length) + length) % length)
    if (chosen === 'raise' && (target < 0 || target >= length)) {
      throw new RangeError('Index out of bounds')
    }
    const picked = values[target]
    return Array.isArray(picked) ? (picked as unknown[]).slice() : picked
  }) as T | T[] | T[][]
  return Internal.classify(input, true, true) === true
    ? (Internal.nested(output) as unknown as T | T[] | T[][])
    : output
}
