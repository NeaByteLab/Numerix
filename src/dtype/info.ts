import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/** Default specification for unknown data types */
const fallback: Types.NumerixSpec = {
  /** Bit width */
  bits: 64,
  /** Machine epsilon */
  eps: Number.EPSILON,
  /** Byte width */
  itemSize: 8,
  /** Maximum value */
  max: Number.MAX_VALUE,
  /** Minimum value */
  min: -Number.MAX_VALUE,
  /** Smallest positive normal number */
  tiny: 2.2250738585072014e-308
}

/** Specifications keyed by data type name */
const table: Record<string, Types.NumerixSpec> = {
  /** Boolean specification */
  bool: { bits: 1, eps: 1, itemSize: 1, max: 1, min: 0 },
  /** 128-bit complex specification */
  complex128: {
    bits: 128,
    eps: Number.EPSILON,
    itemSize: 16,
    max: Number.MAX_VALUE,
    min: -Number.MAX_VALUE,
    tiny: 2.2250738585072014e-308
  },
  /** 64-bit complex specification */
  complex64: {
    bits: 64,
    eps: 1.1920928955078125e-7,
    itemSize: 8,
    max: 3.4028234663852886e38,
    min: -3.4028234663852886e38,
    tiny: 1.1754943508222875e-38
  },
  /** 16-bit float specification */
  float16: {
    bits: 16,
    eps: 0.0009765625,
    itemSize: 2,
    max: 65504,
    min: -65504,
    tiny: 6.103515625e-05
  },
  /** 32-bit float specification */
  float32: {
    bits: 32,
    eps: 1.1920928955078125e-7,
    itemSize: 4,
    max: 3.4028234663852886e38,
    min: -3.4028234663852886e38,
    tiny: 1.1754943508222875e-38
  },
  /** 64-bit float specification */
  float64: fallback,
  /** Signed 16-bit integer specification */
  int16: { bits: 16, eps: 1, itemSize: 2, max: 32767, min: -32768 },
  /** Signed 32-bit integer specification */
  int32: { bits: 32, eps: 1, itemSize: 4, max: 2147483647, min: -2147483648 },
  /** Signed 64-bit integer specification */
  int64: {
    bits: 64,
    eps: 1,
    itemSize: 8,
    max: 9223372036854775807,
    min: -9223372036854775808
  },
  /** Signed 8-bit integer specification */
  int8: { bits: 8, eps: 1, itemSize: 1, max: 127, min: -128 },
  /** Unsigned 16-bit integer specification */
  uint16: { bits: 16, eps: 1, itemSize: 2, max: 65535, min: 0 },
  /** Unsigned 32-bit integer specification */
  uint32: { bits: 32, eps: 1, itemSize: 4, max: 4294967295, min: 0 },
  /** Unsigned 64-bit integer specification */
  uint64: { bits: 64, eps: 1, itemSize: 8, max: 18446744073709551615, min: 0 },
  /** Unsigned 8-bit integer specification */
  uint8: { bits: 8, eps: 1, itemSize: 1, max: 255, min: 0 }
}

/**
 * Describe a data type.
 * @description Reports the range and storage details of a type.
 * @param input - Data type name or value to describe
 * @returns Descriptor of the requested data type
 */
export default function info(input: unknown = 'float64'): Types.NumerixDtype {
  if (typeof input === 'string') {
    if (!(input in table)) {
      throw new TypeError(`data type '${input}' not understood`)
    }
    return {
      dtype: input,
      ...(table[input] ?? fallback),
      shape: [],
      ndim: 0,
      size: 0,
      nbytes: 0
    }
  }
  if (ArrayBuffer.isView(input) && !(input instanceof DataView)) {
    const token = input.constructor.name.replace('Array', '').toLowerCase()
    const label = token === 'bigint64'
      ? 'int64'
      : token === 'biguint64'
      ? 'uint64'
      : token === 'uint8clamped'
      ? 'uint8'
      : token
    const specification = table[label] ?? fallback
    const count = input.byteLength / specification.itemSize
    return {
      dtype: label,
      ...specification,
      shape: [count],
      ndim: 1,
      size: count,
      nbytes: input.byteLength
    }
  }
  const shape: number[] = []
  let cursor = input
  let count = 1
  while (Array.isArray(cursor)) {
    shape.push(cursor.length)
    count *= cursor.length
    cursor = cursor[0]
  }
  if (shape.length === 0) {
    count = input === undefined || input === null ? 0 : 1
  }
  const label = Internal.classify(input, true, true) === true
    ? 'complex128'
    : Internal.classify(input, true, null) === true
    ? 'bool'
    : 'float64'
  const specification = table[label] ?? fallback
  return {
    dtype: label,
    ...specification,
    shape,
    ndim: shape.length,
    size: count,
    nbytes: count * specification.itemSize
  }
}
