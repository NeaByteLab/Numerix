import type * as Types from '@app/types.ts'

/** Default specification for unknown data types */
const fallback: Types.NumerixSpec = {
  bits: 64,
  itemSize: 8,
  min: -Number.MAX_VALUE,
  max: Number.MAX_VALUE,
  eps: Number.EPSILON
}

/** Specifications keyed by data type name */
const table: Record<string, Types.NumerixSpec> = {
  bool: { bits: 8, itemSize: 1, min: 0, max: 1, eps: 1 },
  int8: { bits: 8, itemSize: 1, min: -128, max: 127, eps: 1 },
  uint8: { bits: 8, itemSize: 1, min: 0, max: 255, eps: 1 },
  int16: { bits: 16, itemSize: 2, min: -32768, max: 32767, eps: 1 },
  uint16: { bits: 16, itemSize: 2, min: 0, max: 65535, eps: 1 },
  int32: { bits: 32, itemSize: 4, min: -2147483648, max: 2147483647, eps: 1 },
  uint32: { bits: 32, itemSize: 4, min: 0, max: 4294967295, eps: 1 },
  float16: { bits: 16, itemSize: 2, min: -65504, max: 65504, eps: 0.0009765625 },
  float32: {
    bits: 32,
    itemSize: 4,
    min: -3.4028234663852886e38,
    max: 3.4028234663852886e38,
    eps: 1.1920928955078125e-7
  },
  float64: fallback
}

/**
 * Describe a data type.
 * @description Reports the range and storage details of a type.
 * @param input - Data type name or value to describe
 * @returns Descriptor of the requested data type
 */
export default function info(input: unknown = 'float64'): Types.NumerixDtype {
  if (typeof input === 'string') {
    const specification = table[input] ?? fallback
    return {
      dtype: table[input] ? input : 'float64',
      bits: specification.bits,
      itemSize: specification.itemSize,
      min: specification.min,
      max: specification.max,
      eps: specification.eps,
      shape: [],
      ndim: 0,
      size: 0,
      nbytes: 0
    }
  }
  if (ArrayBuffer.isView(input) && !(input instanceof DataView)) {
    const name = input.constructor.name.replace('Array', '').toLowerCase()
    const specification = table[name] ?? fallback
    const size = input.byteLength / specification.itemSize
    return {
      dtype: name,
      bits: specification.bits,
      itemSize: specification.itemSize,
      min: specification.min,
      max: specification.max,
      eps: specification.eps,
      shape: [size],
      ndim: 1,
      size,
      nbytes: input.byteLength
    }
  }
  const shape: number[] = []
  let cursor = input
  let size = 1
  while (Array.isArray(cursor)) {
    const length = cursor.length
    shape.push(length)
    size *= length
    cursor = cursor[0]
  }
  if (shape.length === 0) {
    size = input === undefined || input === null ? 0 : 1
  }
  const name = typeof cursor === 'boolean' ? 'bool' : 'float64'
  const specification = table[name] ?? fallback
  return {
    dtype: name,
    bits: specification.bits,
    itemSize: specification.itemSize,
    min: specification.min,
    max: specification.max,
    eps: specification.eps,
    shape,
    ndim: shape.length,
    size,
    nbytes: size * specification.itemSize
  }
}
