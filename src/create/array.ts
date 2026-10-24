import * as Shape from '@app/shape/index.ts'

/**
 * Build an array from a source.
 * @description Reshapes binary, textual, or numeric sources.
 * @param source - Data used to populate the array
 * @param dims - Target dimensions or binary buffer
 * @param offset - Starting position within the source buffer
 * @returns Array holding the source values
 */
export default function array(
  source: unknown,
  dims: number | number[] | ArrayBufferView = 0,
  offset = 0
): unknown {
  if (typeof dims !== 'number') {
    const shape = Array.isArray(source) ? (source as number[]) : [Number(source)]
    let flat: number[]
    if (ArrayBuffer.isView(dims) && !(dims instanceof DataView)) {
      const elements = dims as unknown as ArrayLike<number>
      const count = elements.length
      flat = new Array<number>(count)
      for (let index = 0; index < count; index++) {
        flat[index] = elements[index] ?? 0
      }
    } else {
      flat = dims as number[]
    }
    let total = 1
    for (let index = 0; index < shape.length; index++) {
      total *= shape[index] ?? 1
    }
    const sliced = offset === 0 && flat.length === total ? flat : flat.slice(offset, offset + total)
    return Shape.reshape(sliced, shape)
  }
  let result = cloneDeep(source)
  let depth = 0
  let cursor = result
  while (Array.isArray(cursor)) {
    depth++
    cursor = cursor[0]
  }
  while (depth < dims) {
    result = [result]
    depth++
  }
  return result
}

/**
 * Clone a value deeply.
 * @description Copies nested arrays and binary views into new containers.
 * @param value - Value to clone
 * @returns Cloned copy of the value
 */
function cloneDeep(value: unknown): unknown {
  if (ArrayBuffer.isView(value) && !(value instanceof DataView)) {
    const elements = value as unknown as ArrayLike<number>
    const length = elements.length
    const result = new Array<number>(length)
    for (let index = 0; index < length; index++) {
      result[index] = elements[index] ?? 0
    }
    return result
  }
  if (Array.isArray(value)) {
    const length = value.length
    const result = new Array(length)
    for (let index = 0; index < length; index++) {
      result[index] = cloneDeep(value[index])
    }
    return result
  }
  return typeof value === 'boolean' ? (value ? 1 : 0) : value
}
