/**
 * Pad an array on both sides.
 * @description Adds entries around the array using the chosen mode.
 * @param input - Array to pad
 * @param width - Number of entries added on each side
 * @param mode - Padding mode applied to the array
 * @param fill - Constant value used by constant padding
 * @returns Padded array with the added entries
 */
export default function pad(
  input: number[],
  width: number | [number, number],
  mode: 'constant' | 'edge' | 'reflect' | 'symmetric' | 'wrap' = 'constant',
  fill = 0
): number[] {
  const before = typeof width === 'number' ? width : width[0]
  const after = typeof width === 'number' ? width : width[1]
  const length = input.length
  const total = before + length + after
  if (length === 0) {
    return new Array<number>(total).fill(fill)
  }
  const result = new Array<number>(total)
  for (let index = 0; index < length; index++) {
    result[before + index] = input[index] ?? fill
  }
  if (mode === 'constant') {
    for (let index = 0; index < before; index++) {
      result[index] = fill
    }
    for (let index = 0; index < after; index++) {
      result[before + length + index] = fill
    }
    return result
  }
  if (mode === 'edge') {
    const first = input[0] ?? fill
    const last = input[length - 1] ?? fill
    for (let index = 0; index < before; index++) {
      result[index] = first
    }
    for (let index = 0; index < after; index++) {
      result[before + length + index] = last
    }
    return result
  }
  if (mode === 'reflect') {
    if (length === 1) {
      result.fill(input[0] ?? fill)
      return result
    }
    const period = 2 * (length - 1)
    for (let index = 0; index < before; index++) {
      const offset = index - before
      const remapped = ((offset % period) + period) % period
      const origin = remapped < length ? remapped : period - remapped
      result[index] = input[origin] ?? fill
    }
    for (let index = 0; index < after; index++) {
      const offset = length + index
      const remapped = offset % period
      const origin = remapped < length ? remapped : period - remapped
      result[before + length + index] = input[origin] ?? fill
    }
    return result
  }
  if (mode === 'symmetric') {
    const period = 2 * length
    for (let index = 0; index < before; index++) {
      const offset = index - before
      const remapped = ((offset % period) + period) % period
      const origin = remapped < length ? remapped : period - 1 - remapped
      result[index] = input[origin] ?? fill
    }
    for (let index = 0; index < after; index++) {
      const offset = length + index
      const remapped = offset % period
      const origin = remapped < length ? remapped : period - 1 - remapped
      result[before + length + index] = input[origin] ?? fill
    }
    return result
  }
  for (let index = 0; index < before; index++) {
    const distance = before - index
    result[index] = input[(length - (distance % length)) % length] ?? fill
  }
  for (let index = 0; index < after; index++) {
    result[before + length + index] = input[index % length] ?? fill
  }
  return result
}
