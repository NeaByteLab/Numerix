import * as Internal from '@app/internal/index.ts'
import flatten from '@app/shape/flatten.ts'
import transpose from '@app/shape/transpose.ts'

/**
 * Join arrays along an axis.
 * @description Concatenates or stacks the given arrays.
 * @param arrays - Arrays to combine
 * @param level - Axis along which the arrays are joined
 * @param method - Joining mode applied to the arrays
 * @returns Combined array of the joined inputs
 */
export default function join(
  arrays: unknown[][],
  level: number | null = 0,
  method: boolean | 'concatenate' | 'stack' | 'vstack' | 'hstack' | 'column_stack' = 'concatenate'
): unknown[] {
  let result: unknown[]
  if (method === true || method === 'stack') {
    const count = arrays.length
    if (count === 0) {
      throw new RangeError('need at least one array to stack')
    }
    const first = arrays[0] ?? []
    const length = first.length
    const matrix = Array.isArray(first[0])
    const width = matrix ? (first[0] as unknown[]).length : 0
    const depth = matrix ? 3 : 2
    const chosen = level ?? 0
    const normalized = chosen < 0 ? depth + chosen : chosen
    if (normalized < 0 || normalized >= depth) {
      throw new RangeError('axis is out of bounds for array of dimension ' + depth)
    }
    for (let index = 0; index < count; index++) {
      const source = arrays[index] ?? []
      if (source.length !== length || Array.isArray(source[0]) !== matrix) {
        throw new RangeError('all input arrays must have the same shape')
      }
      if (matrix) {
        for (let inner = 0; inner < source.length; inner++) {
          const entry = source[inner]
          if (!Array.isArray(entry) || entry.length !== width) {
            throw new RangeError('all input arrays must have the same shape')
          }
        }
      }
    }
    result = normalized === 0
      ? arrays.map((source) => (Array.isArray(source) ? source.slice() : source))
      : transpose(arrays, 0, normalized, 'move')
  } else {
    if (
      method !== false &&
      method !== 'concatenate' &&
      method !== 'vstack' &&
      method !== 'hstack' &&
      method !== 'column_stack'
    ) {
      throw new RangeError(
        "method must be a boolean, 'concatenate', 'stack', 'vstack', 'hstack', or 'column_stack'"
      )
    }
    const items = method === 'vstack'
      ? arrays.map((source) =>
        Array.isArray(source) && !Array.isArray(source[0]) ? [source] : source
      )
      : method === 'column_stack'
      ? arrays.map((source) =>
        Array.isArray(source) && !Array.isArray(source[0]) ? source.map((entry) => [entry]) : source
      )
      : arrays
    let layered = false
    if (method === 'hstack') {
      for (let index = 0; index < arrays.length; index++) {
        if (Array.isArray(arrays[index]?.[0])) {
          layered = true
          break
        }
      }
    }
    const target = method === 'vstack'
      ? 0
      : method === 'hstack'
      ? (layered ? 1 : 0)
      : method === 'column_stack'
      ? 1
      : level
    const count = items.length
    if (count === 0) {
      throw new RangeError('need at least one array to concatenate')
    }
    if (target === null) {
      result = flatten<unknown>(items)
    } else {
      const first = items[0] ?? []
      let filled = first
      for (let index = 0; index < count; index++) {
        const candidate = items[index]
        if ((candidate?.length ?? 0) > 0) {
          filled = candidate!
          break
        }
      }
      const matrix = Array.isArray(filled[0])
      const width = matrix ? (filled[0] as unknown[]).length : 0
      const depth = matrix ? 2 : 1
      const normalized = target < 0 ? depth + target : target
      if (normalized < 0 || normalized >= depth) {
        throw new RangeError('axis is out of bounds for array of dimension ' + depth)
      }
      for (let index = 0; index < count; index++) {
        const source = items[index] ?? []
        if (source.length > 0 && Array.isArray(source[0]) !== matrix) {
          throw new RangeError('all the input arrays must have same number of dimensions')
        }
        if (normalized === 0) {
          if (matrix) {
            for (let inner = 0; inner < source.length; inner++) {
              const entry = source[inner]
              if (!Array.isArray(entry) || entry.length !== width) {
                throw new RangeError(
                  'all the input array dimensions except for the concatenation axis must match exactly'
                )
              }
            }
          }
        } else if (source.length !== first.length) {
          throw new RangeError(
            'all the input array dimensions except for the concatenation axis must match exactly'
          )
        }
      }
      if (normalized === 0) {
        result = []
        for (let index = 0; index < count; index++) {
          const source = items[index]
          if (source) {
            for (let inner = 0; inner < source.length; inner++) {
              result.push(source[inner])
            }
          }
        }
      } else {
        result = Array.from({ length: first.length }, (_unused, index) => {
          const combined: unknown[] = []
          for (let outer = 0; outer < count; outer++) {
            const subset = items[outer]?.[index]
            if (Array.isArray(subset)) {
              for (let inner = 0; inner < subset.length; inner++) {
                combined.push(subset[inner])
              }
            }
          }
          return combined
        })
      }
    }
  }
  return Internal.classify(arrays, true, true) === true
    ? (Internal.nested(result) as unknown[])
    : result
}
