import * as Dtype from '@app/dtype/index.ts'
import * as Internal from '@app/internal/index.ts'
import reshape from '@app/shape/reshape.ts'

/**
 * Transpose a matrix.
 * @description Reorders the axes of a matrix.
 * @template T - Type of the matrix entries
 * @param input - Matrix to transpose
 * @param order - Axis order, swapped axis pair, or mode
 * @param other - Second axis or destination axes
 * @param method - Optional transposition mode
 * @returns Transposed matrix
 */
export default function transpose<T>(
  input: T[][],
  order?: number[] | number | 'matrix',
  other?: number | number[],
  method?: 'swap' | 'move' | 'roll' | 'matrix'
): T[][]
/**
 * Transpose a nested array.
 * @description Reorders the axes of a nested array.
 * @param input - Nested array to transpose
 * @param order - Axis order, swapped axis pair, or mode
 * @param other - Second axis or destination axes
 * @param method - Optional transposition mode
 * @returns Transposed array
 */
export default function transpose(
  input: unknown[],
  order?: number[] | number | 'matrix',
  other?: number | number[],
  method?: 'swap' | 'move' | 'roll' | 'matrix'
): unknown[]
/**
 * Transpose an array.
 * @description Reorders the axes of a nested array.
 * @param input - Nested array to transpose
 * @param order - Axis order, swapped axis pair, or mode
 * @param other - Second axis or destination axes
 * @param method - Optional transposition mode
 * @returns Transposed array
 */
export default function transpose(
  input: unknown[],
  order?: number[] | number | 'matrix',
  other?: number | number[],
  method?: 'swap' | 'move' | 'roll' | 'matrix'
): unknown[] {
  let result: unknown[]
  if (
    !Array.isArray(input) ||
    (!Array.isArray(input[0]) && order === undefined && method === undefined)
  ) {
    result = input.slice()
  } else if (
    Array.isArray(input[0]) &&
    !Array.isArray((input[0] as unknown[])[0]) &&
    order === undefined &&
    method === undefined
  ) {
    result = Array.from(
      { length: (input[0] as unknown[]).length },
      (_outer, column) =>
        Internal.column(
          input as unknown[][],
          input.length,
          column,
          new Array<unknown>(input.length)
        )
    )
  } else {
    if (
      method !== undefined &&
      method !== 'swap' &&
      method !== 'move' &&
      method !== 'roll' &&
      method !== 'matrix'
    ) {
      throw new RangeError("mode must be one of 'swap', 'move', 'roll', or 'matrix'")
    }
    const extents = Dtype.info(input).shape
    const depth = extents.length
    const permutation = Array.from({ length: depth }, (_outer, index) => index)
    const resolved = order === 'matrix'
      ? 'matrix'
      : method ?? (Array.isArray(order) && Array.isArray(other) ? 'move' : undefined)
    if (resolved === 'matrix') {
      if (depth < 2) {
        throw new RangeError('Input array must be at least 2-dimensional')
      }
      permutation[depth - 2] = depth - 1
      permutation[depth - 1] = depth - 2
    } else if (resolved === 'move') {
      const sources = new Set<number>()
      for (const value of Array.isArray(order) ? order : [order as number]) {
        const index = value < 0 ? depth + value : value
        if (index < 0 || index >= depth) {
          throw new RangeError('axis out of bounds')
        }
        sources.add(index)
      }
      const places = new Set<number>()
      for (const value of Array.isArray(other) ? other : [other as number]) {
        const index = value < 0 ? depth + value : value
        if (index < 0 || index >= depth) {
          throw new RangeError('axis out of bounds')
        }
        places.add(index)
      }
      if (
        sources.size !== (Array.isArray(order) ? order.length : 1) ||
        places.size !== (Array.isArray(other) ? other.length : 1) ||
        sources.size !== places.size
      ) {
        throw new RangeError(
          'source and destination arguments must have the same number of elements'
        )
      }
      const remaining: number[] = []
      for (let index = 0; index < depth; index++) {
        if (!sources.has(index)) {
          remaining.push(index)
        }
      }
      for (
        const entry of Array.from(places, (place, index) => ({
          place,
          source: Array.from(sources)[index]!
        })).sort((first, second) => first.place - second.place)
      ) {
        remaining.splice(entry.place, 0, entry.source)
      }
      for (let dimension = 0; dimension < depth; dimension++) {
        permutation[dimension] = remaining[dimension] ?? 0
      }
    } else if (resolved === 'roll' && typeof order === 'number') {
      const source = order < 0 ? depth + order : order
      const target = typeof other === 'number' ? other : 0
      const start = target < 0 ? depth + target : target
      if (source < 0 || source >= depth || start < 0 || start > depth) {
        throw new RangeError('axis out of bounds')
      }
      permutation.splice(source, 1)
      permutation.splice(source < start ? start - 1 : start, 0, source)
    } else if (typeof order === 'number' && typeof other === 'number') {
      const source = order < 0 ? depth + order : order
      const target = other < 0 ? depth + other : other
      if (source < 0 || source >= depth || target < 0 || target >= depth) {
        throw new RangeError('axis out of bounds')
      }
      permutation[source] = target
      permutation[target] = source
    } else if (Array.isArray(order)) {
      if (order.length !== depth) {
        throw new RangeError('axes do not form a permutation of the dimensions')
      }
      const visited = new Array<boolean>(depth).fill(false)
      for (let dimension = 0; dimension < depth; dimension++) {
        const entry = order[dimension] ?? dimension
        const permuted = entry < 0 ? depth + entry : entry
        if (permuted < 0 || permuted >= depth || visited[permuted]) {
          throw new RangeError('axes do not form a permutation of the dimensions')
        }
        visited[permuted] = true
        permutation[dimension] = permuted
      }
    } else {
      permutation.reverse()
    }
    const target = new Array<number>(depth)
    const inverse = new Array<number>(depth)
    let total = 1
    for (let dimension = 0; dimension < depth; dimension++) {
      const chosen = permutation[dimension] ?? 0
      const extent = extents[chosen] ?? 0
      target[dimension] = extent
      total *= extent
      inverse[chosen] = dimension
    }
    const strides = new Array<number>(depth)
    let stride = 1
    for (let dimension = depth - 1; dimension >= 0; dimension--) {
      strides[dimension] = stride
      stride *= target[dimension] ?? 1
    }
    const items = Array.from(
      { length: total },
      (_outer, index) => {
        let pointer: unknown = input
        for (let dimension = 0; dimension < depth; dimension++) {
          const mapped = inverse[dimension] ?? 0
          pointer = (pointer as unknown[])[
            Math.floor(index / (strides[mapped] ?? 1)) % ((target[mapped] ?? 1) || 1)
          ]
        }
        return pointer
      }
    )
    result = (depth > 1 ? reshape(items, target) : items) as unknown[]
  }
  return Internal.classify(input, true, true) === true
    ? (Internal.nested(result) as unknown[])
    : result
}
