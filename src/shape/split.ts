/**
 * Split an array into sections.
 * @description Divides the array into equal or sized sections.
 * @param input - Array to divide into sections
 * @param sections - Number of sections or their sizes
 * @param axis - Axis along which the array is split
 * @param mode - Splitting mode applied to the array
 * @returns Array of section arrays
 */
export default function split(
  input: unknown[],
  sections: number | number[],
  axis = 0,
  mode: 'equal' | 'array' = 'equal'
): unknown[][] {
  if (mode === 'equal' && typeof sections === 'number' && input.length % sections !== 0) {
    throw new RangeError('array split does not result in an equal division')
  }
  if (axis === 1 && Array.isArray(input[0])) {
    const height = input.length
    const columns = (input[0] as unknown[]).length
    if (typeof sections === 'number') {
      if (mode === 'equal' && columns % sections !== 0) {
        throw new RangeError('array split does not result in an equal division')
      }
      const result = new Array<unknown[]>(sections)
      const base = Math.floor(columns / sections)
      const extra = columns % sections
      let start = 0
      for (let index = 0; index < sections; index++) {
        const end = start + base + (index < extra ? 1 : 0)
        const section = new Array<unknown>(height)
        for (let row = 0; row < height; row++) {
          section[row] = (input[row] as unknown[]).slice(start, end)
        }
        result[index] = section
        start = end
      }
      return result
    }
    const count = sections.length
    const result = new Array<unknown[]>(count + 1)
    let start = 0
    for (let index = 0; index <= count; index++) {
      const end = index < count ? (sections[index] ?? 0) : columns
      const section = new Array<unknown>(height)
      for (let row = 0; row < height; row++) {
        section[row] = (input[row] as unknown[]).slice(start, end)
      }
      result[index] = section
      start = end
    }
    return result
  }
  if (typeof sections === 'number') {
    const parts = new Array<unknown[]>(sections)
    const total = input.length
    const base = Math.floor(total / sections)
    const extra = total % sections
    let offset = 0
    for (let index = 0; index < sections; index++) {
      const size = base + (index < extra ? 1 : 0)
      parts[index] = input.slice(offset, offset + size)
      offset += size
    }
    return parts
  }
  const count = sections.length
  const parts = new Array<unknown[]>(count + 1)
  let previous = 0
  for (let index = 0; index < count; index++) {
    const section = sections[index] ?? 0
    parts[index] = input.slice(previous, section)
    previous = section
  }
  parts[count] = input.slice(previous)
  return parts
}
