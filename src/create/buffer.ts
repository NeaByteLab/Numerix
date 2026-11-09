import * as Shape from '@app/shape/index.ts'

/** Typed array constructors keyed by data type alias */
const typed: Record<string, new (buffer: ArrayBufferLike) => ArrayLike<number>> = {
  /** 16-bit float alias */
  f2: Float16Array,
  /** 32-bit float alias */
  f4: Float32Array,
  /** 64-bit float alias */
  f8: Float64Array,
  /** 16-bit float typed array constructor */
  float16: Float16Array,
  /** 32-bit float typed array constructor */
  float32: Float32Array,
  /** 64-bit float typed array constructor */
  float64: Float64Array,
  /** Signed 8-bit alias */
  i1: Int8Array,
  /** Signed 16-bit alias */
  i2: Int16Array,
  /** Signed 32-bit alias */
  i4: Int32Array,
  /** Signed 16-bit typed array constructor */
  int16: Int16Array,
  /** Signed 32-bit typed array constructor */
  int32: Int32Array,
  /** Signed 8-bit typed array constructor */
  int8: Int8Array,
  /** Unsigned 8-bit alias */
  u1: Uint8Array,
  /** Unsigned 16-bit alias */
  u2: Uint16Array,
  /** Unsigned 32-bit alias */
  u4: Uint32Array,
  /** Unsigned 16-bit typed array constructor */
  uint16: Uint16Array,
  /** Unsigned 32-bit typed array constructor */
  uint32: Uint32Array,
  /** Unsigned 8-bit typed array constructor */
  uint8: Uint8Array
}

/**
 * Build an array from raw data.
 * @description Reads binary, textual, or generated values.
 * @param source - Binary buffer, text, or value generator
 * @param shape - Target shape, data type name, or delimiter
 * @param delimiter - Separator used when reading text, or data type name
 * @returns Array holding the decoded values
 */
export default function buffer(
  source: ArrayBufferLike | Iterable<number> | string | ((...coordinates: number[]) => number),
  shape?: number[] | string,
  delimiter: string = ' '
): unknown {
  const dimensions = Array.isArray(shape) ? shape : undefined
  if (typeof source === 'function' && dimensions) {
    if (dimensions.length === 2) {
      return Array.from(
        { length: dimensions[0] ?? 0 },
        (_outer, outer) =>
          Array.from(
            { length: dimensions[1] ?? 0 },
            (_inner, column) => source(outer, column)
          )
      )
    }
    let length = 1
    for (let index = 0; index < dimensions.length; index++) {
      length *= dimensions[index] ?? 0
    }
    if (dimensions.length > 1) {
      const coordinates = new Array<number>(dimensions.length).fill(0)
      return Shape.reshape(
        Array.from({ length }, () => {
          const evaluated = source(...coordinates)
          for (let level = dimensions.length - 1; level >= 0; level--) {
            const stepped = (coordinates[level] ?? 0) + 1
            if (stepped < (dimensions[level] ?? 0)) {
              coordinates[level] = stepped
              break
            }
            coordinates[level] = 0
          }
          return evaluated
        }),
        dimensions
      )
    }
    return Array.from(
      { length },
      (_outer, index) => source(index)
    )
  }
  let items: number[]
  if (typeof source === 'string') {
    const tokens = source.trim().split(typeof shape === 'string' ? shape : delimiter)
    items = []
    for (let index = 0; index < tokens.length; index++) {
      const token = tokens[index]
      if (token) {
        items.push(Number(token))
      }
    }
  } else if (
    source instanceof ArrayBuffer ||
    (typeof SharedArrayBuffer !== 'undefined' && source instanceof SharedArrayBuffer)
  ) {
    const dtype = typeof shape === 'string' ? shape : delimiter !== ' ' ? delimiter : 'float64'
    const constructor = typed[dtype]
    if (!constructor) {
      throw new TypeError(`data type '${dtype}' not understood`)
    }
    items = Array.from(new constructor(source))
  } else {
    items = Array.from(source as ArrayLike<number> | Iterable<number>)
  }
  return dimensions && dimensions.length > 1 ? Shape.reshape(items, dimensions) : items
}
