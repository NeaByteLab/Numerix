import * as Shape from '@app/shape/index.ts'

/** Cast ranks keyed by data type name */
const ranks: Record<string, number> = {
  bool: 0,
  int8: 1,
  uint8: 2,
  int16: 3,
  uint16: 4,
  int32: 5,
  uint32: 6,
  int64: 7,
  uint64: 8,
  float16: 9,
  float32: 10,
  float64: 11,
  complex64: 12,
  complex128: 13,
  string: 14
}

/**
 * Cast values to a data type.
 * @description Converts values or checks cast compatibility.
 * @param input - Values to cast or type name to check
 * @param target - Target data type name
 * @returns Cast values or a cast compatibility flag
 */
export default function cast(input: unknown, target = 'float64'): string | boolean | number[] {
  if (typeof input === 'string' && typeof target === 'string') {
    const source = ranks[input] ?? 11
    const destination = ranks[target] ?? 11
    return source <= destination
  }
  if (Array.isArray(input) && typeof input[0] === 'string') {
    let uniform = true
    for (let index = 0; index < input.length; index++) {
      if (typeof input[index] !== 'string') {
        uniform = false
        break
      }
    }
    if (uniform) {
      let highest = 0
      let widest = 'bool'
      for (let index = 0; index < input.length; index++) {
        const dtype = input[index] as string
        const rank = ranks[dtype] ?? 11
        if (rank >= highest) {
          highest = rank
          widest = dtype
        }
      }
      return widest
    }
  }
  if (typeof input === 'number') {
    if (Number.isInteger(input)) {
      if (input >= 0 && input <= 255) {
        return 'uint8'
      }
      if (input >= -128 && input <= 127) {
        return 'int8'
      }
      if (input >= -32768 && input <= 32767) {
        return 'int16'
      }
      if (input >= -2147483648 && input <= 2147483647) {
        return 'int32'
      }
      return 'int64'
    }
    return 'float64'
  }
  const flat = Array.isArray(input)
    ? Array.isArray(input[0]) ? Shape.flatten<unknown>(input as unknown[]) : (input as unknown[])
    : [input]
  const length = flat.length
  const result = new Array<number>(length)
  if (target === 'bool') {
    for (let index = 0; index < length; index++) {
      result[index] = flat[index] ? 1 : 0
    }
    return result
  }
  if (target.startsWith('int') || target.startsWith('uint')) {
    for (let index = 0; index < length; index++) {
      result[index] = Math.trunc(Number(flat[index]))
    }
    return result
  }
  for (let index = 0; index < length; index++) {
    result[index] = Number(flat[index])
  }
  return result
}
