/**
 * Join arrays along an axis.
 * @description Concatenates or stacks the given arrays.
 * @param arrays - Arrays to combine
 * @param axis - Axis along which the arrays are joined
 * @param stack - When true stacks instead of concatenating
 * @returns Combined array of the joined inputs
 */
export default function join(arrays: unknown[][], axis = 0, stack = false): unknown[] {
  const count = arrays.length
  const first = arrays[0] ?? []
  const length = first.length
  if (stack) {
    if (axis === 0) {
      const result = new Array<unknown>(count)
      for (let index = 0; index < count; index++) {
        const source = arrays[index]
        result[index] = Array.isArray(source) ? source.slice() : source
      }
      return result
    }
    const result = new Array<unknown[]>(length)
    for (let index = 0; index < length; index++) {
      const row = new Array<unknown>(count)
      for (let series = 0; series < count; series++) {
        row[series] = arrays[series]?.[index]
      }
      result[index] = row
    }
    return result
  }
  if (axis === 0) {
    let total = 0
    for (let index = 0; index < count; index++) {
      total += arrays[index]?.length ?? 0
    }
    const result = new Array<unknown>(total)
    let offset = 0
    for (let index = 0; index < count; index++) {
      const source = arrays[index] ?? []
      const length = source.length
      for (let position = 0; position < length; position++) {
        result[offset++] = source[position]
      }
    }
    return result
  }
  const result = new Array<unknown[]>(length)
  for (let index = 0; index < length; index++) {
    let width = 0
    for (let series = 0; series < count; series++) {
      const subset = arrays[series]?.[index]
      width += Array.isArray(subset) ? subset.length : 0
    }
    const row = new Array<unknown>(width)
    let offset = 0
    for (let series = 0; series < count; series++) {
      const subset = arrays[series]?.[index]
      if (Array.isArray(subset)) {
        const extent = subset.length
        for (let position = 0; position < extent; position++) {
          row[offset++] = subset[position]
        }
      }
    }
    result[index] = row
  }
  return result
}
