/**
 * Build an array from raw data.
 * @description Reads binary, textual, or generated values.
 * @param source - Binary buffer, text, or value generator
 * @param shape - Target shape of the created array
 * @param delimiter - Separator used when reading text
 * @returns Array holding the decoded values
 */
export default function buffer(
  source: ArrayBufferLike | Iterable<number> | string | ((...coordinates: number[]) => number),
  shape?: number[],
  delimiter: string = ' '
): unknown {
  if (typeof source === 'function' && shape) {
    const depth = shape.length
    const coordinates = new Array<number>(depth).fill(0)
    return buildFunction(source, shape, coordinates, depth, 0)
  }
  if (typeof source === 'string') {
    const parts = source.trim().split(delimiter)
    const result: number[] = []
    for (let index = 0; index < parts.length; index++) {
      const token = parts[index]
      if (token) {
        result.push(Number(token))
      }
    }
    return result
  }
  if (ArrayBuffer.isView(source) && !(source instanceof DataView)) {
    const view = source as unknown as ArrayLike<number>
    const length = view.length
    const result = new Array<number>(length)
    for (let index = 0; index < length; index++) {
      result[index] = view[index] ?? 0
    }
    return result
  }
  if (
    source instanceof ArrayBuffer ||
    (typeof SharedArrayBuffer !== 'undefined' && source instanceof SharedArrayBuffer)
  ) {
    const view = new Float64Array(source)
    const length = view.length
    const result = new Array<number>(length)
    for (let index = 0; index < length; index++) {
      result[index] = view[index] ?? 0
    }
    return result
  }
  const result: number[] = []
  for (const entry of source as Iterable<number>) {
    result.push(entry)
  }
  return result
}

/**
 * Build an array from a generator.
 * @description Calls the callback for every position in the shape.
 * @param callback - Function producing the value at each position
 * @param shape - Target shape of the created array
 * @param coordinates - Position of the value being built
 * @param depth - Number of levels in the target shape
 * @param dimension - Dimension currently being built
 * @returns Generated value for the current dimension
 */
function buildFunction(
  callback: (...coordinates: number[]) => number,
  shape: number[],
  coordinates: number[],
  depth: number,
  dimension: number
): unknown {
  const length = shape[dimension] ?? 0
  const result = new Array(length)
  if (dimension === depth - 1) {
    for (let index = 0; index < length; index++) {
      coordinates[dimension] = index
      result[index] = callback(...coordinates)
    }
    return result
  }
  for (let index = 0; index < length; index++) {
    coordinates[dimension] = index
    result[index] = buildFunction(callback, shape, coordinates, depth, dimension + 1)
  }
  return result
}
