import * as Internal from '@app/internal/index.ts'
import flatten from '@app/shape/flatten.ts'
import transpose from '@app/shape/transpose.ts'

/**
 * Reshape a nested array.
 * @description Rearranges flattened values into the target shape.
 * @param input - Nested array to reshape
 * @param shape - Target shape of the reshaped result
 * @param order - Memory layout order, row-major or column-major
 * @returns Array with the requested shape
 */
export default function reshape(
  input: unknown[],
  shape: number | number[],
  order: 'C' | 'F' = 'C'
): unknown {
  if (order !== 'C' && order !== 'F') {
    throw new RangeError("order must be one of 'C' or 'F'")
  }
  const normalized = Array.isArray(shape) ? shape : [shape]
  const values = Array.isArray(input[0]) ? flatten<unknown>(input, order) : input
  const total = values.length
  const count = normalized.length
  let inferred = -1
  let fixed = 1
  const target = Array.from({ length: count }, (_outer, index) => {
    const extent = normalized[index] ?? 0
    if (extent < 0) {
      if (inferred !== -1) {
        throw new RangeError('can only specify one unknown dimension')
      }
      inferred = index
    } else {
      fixed *= extent
    }
    return extent
  })
  if (inferred !== -1) {
    if (fixed === 0 || total % fixed !== 0) {
      throw new RangeError('cannot reshape array of size ' + total + ' into shape ' + shape)
    }
    target[inferred] = total / fixed
  } else if (fixed !== total) {
    throw new RangeError('cannot reshape array of size ' + total + ' into shape ' + shape)
  }
  if (order === 'F' && count > 1) {
    return transpose(reshape(values, target.reverse(), 'C') as unknown[])
  }
  let output: unknown[] = values.slice()
  for (let dimension = count - 1; dimension >= 1; dimension--) {
    const length = target[dimension] ?? 0
    let groups = 1
    for (let cursor = 0; cursor < dimension; cursor++) {
      groups *= target[cursor] ?? 0
    }
    output = Array.from(
      { length: groups },
      (_outer, index) => output.slice(index * length, (index + 1) * length)
    )
  }
  return Internal.classify(input, true, true) === true ? Internal.nested(output) : output
}
