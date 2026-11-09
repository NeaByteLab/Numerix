import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/** Typed array constructors keyed by data type name */
const typed: Record<
  string,
  { from<T>(source: ArrayLike<T>, mapfn: (value: T) => number): ArrayLike<number> }
> = {
  /** 16-bit float typed array constructor */
  float16: Float16Array,
  /** 32-bit float typed array constructor */
  float32: Float32Array,
  /** Signed 16-bit typed array constructor */
  int16: Int16Array,
  /** Signed 32-bit typed array constructor */
  int32: Int32Array,
  /** Signed 8-bit typed array constructor */
  int8: Int8Array,
  /** Unsigned 16-bit typed array constructor */
  uint16: Uint16Array,
  /** Unsigned 32-bit typed array constructor */
  uint32: Uint32Array,
  /** Unsigned 8-bit typed array constructor */
  uint8: Uint8Array
}

/** Cast ranks by data type */
const ranks: Record<string, number> = {
  /** Boolean rank */
  bool: 0,
  /** 128-bit complex rank */
  complex128: 13,
  /** 64-bit complex rank */
  complex64: 12,
  /** 16-bit float rank */
  float16: 9,
  /** 32-bit float rank */
  float32: 10,
  /** 64-bit float rank */
  float64: 11,
  /** Signed 16-bit integer rank */
  int16: 3,
  /** Signed 32-bit integer rank */
  int32: 5,
  /** Signed 64-bit integer rank */
  int64: 7,
  /** Signed 8-bit integer rank */
  int8: 1,
  /** String rank */
  string: 14,
  /** Unsigned 16-bit integer rank */
  uint16: 4,
  /** Unsigned 32-bit integer rank */
  uint32: 6,
  /** Unsigned 64-bit integer rank */
  uint64: 8,
  /** Unsigned 8-bit integer rank */
  uint8: 2
}

/** Candidate promotion types in ascending width */
const promotions = [
  'int16',
  'int32',
  'int64',
  'float16',
  'float32',
  'float64',
  'complex64',
  'complex128'
]

/**
 * Cast values to a data type.
 * @description Converts values or checks cast compatibility.
 * @param input - Values to cast or type name to check
 * @param target - Target data type name
 * @returns Cast values or a cast compatibility flag
 */
export default function cast(
  input: unknown,
  target = 'float64'
):
  | string
  | string[]
  | string[][]
  | boolean
  | number[]
  | number[][]
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  if (typeof input === 'string' && typeof target === 'string') {
    if (!(input in ranks) || !(target in ranks)) {
      throw new TypeError(`data type '${!(input in ranks) ? input : target}' not understood`)
    }
    if (input === target) {
      return true
    }
    if (input === 'bool') {
      return target !== 'string'
    }
    if (input === 'string') {
      return false
    }
    const origin = input.replace(/\d+$/, '')
    const destination = target.replace(/\d+$/, '')
    if (origin === 'complex') {
      return destination === 'complex' && (ranks[input] ?? 0) <= (ranks[target] ?? 0)
    }
    if (destination === 'complex') {
      return target === 'complex128' || cast(input, 'float32') === true
    }
    if (origin === 'float') {
      return destination === 'float' && (ranks[input] ?? 0) <= (ranks[target] ?? 0)
    }
    if (destination === 'float') {
      return target === 'float64' || (ranks[input] ?? 0) <= (target === 'float32' ? 4 : 2)
    }
    if (origin === 'uint' && destination === 'int') {
      return (ranks[input] ?? 0) < (ranks[target] ?? 0)
    }
    return !(origin === 'int' && destination === 'uint') &&
      (ranks[input] ?? 0) <= (ranks[target] ?? 0)
  }
  if (Array.isArray(input) && typeof input[0] === 'string') {
    let strings = true
    for (let index = 0; index < input.length; index++) {
      if (typeof input[index] !== 'string') {
        strings = false
        break
      }
    }
    if (strings) {
      let widest = input[0] as string
      if (!(widest in ranks)) {
        throw new TypeError(`data type '${widest}' not understood`)
      }
      for (let index = 1; index < input.length; index++) {
        const second = input[index] as string
        if (!(widest in ranks) || !(second in ranks)) {
          throw new TypeError(`data type '${!(widest in ranks) ? widest : second}' not understood`)
        }
        if (
          widest === second ||
          (cast(second, widest) === true && cast(widest, second) !== true)
        ) {
          continue
        }
        if (cast(widest, second) === true && cast(second, widest) !== true) {
          widest = second
          continue
        }
        let promoted: string | undefined
        for (let cursor = 0; cursor < promotions.length; cursor++) {
          const candidate = promotions[cursor]!
          if (cast(widest, candidate) === true && cast(second, candidate) === true) {
            promoted = candidate
            break
          }
        }
        widest = promoted ??
          (widest.startsWith('complex') || second.startsWith('complex')
            ? 'complex128'
            : (ranks[second] ?? 0) > (ranks[widest] ?? 0)
            ? second
            : widest)
      }
      return widest
    }
  }
  if (typeof input === 'boolean') {
    return 'bool'
  }
  if (typeof input === 'number') {
    if (!Number.isFinite(input)) {
      return 'float16'
    }
    if (!Number.isInteger(input)) {
      const amount = Math.abs(input)
      return amount < 65000 ? 'float16' : amount < 3.4e38 ? 'float32' : 'float64'
    }
    if (input >= 0) {
      return input <= 255
        ? 'uint8'
        : input <= 65535
        ? 'uint16'
        : input <= 4294967295
        ? 'uint32'
        : input <= 18446744073709551615
        ? 'uint64'
        : input < 3.4e38
        ? 'float32'
        : 'float64'
    }
    return input >= -128
      ? 'int8'
      : input >= -32768
      ? 'int16'
      : input >= -2147483648
      ? 'int32'
      : input >= -9223372036854775808
      ? 'int64'
      : input > -3.4e38
      ? 'float32'
      : 'float64'
  }
  if (Internal.shape(input)) {
    return Math.abs(input.re) < 3.4e38 &&
        Math.abs(input.im) < 3.4e38
      ? 'complex64'
      : 'complex128'
  }
  if (!(target in ranks)) {
    throw new TypeError(`data type '${target}' not understood`)
  }
  if (Array.isArray(input) && Array.isArray(input[0])) {
    return (input as unknown[][]).map((entry) =>
      cast(entry, target) as number[] | string[] | Types.NumerixComplex[]
    ) as number[][] | string[][] | Types.NumerixComplex[][]
  }
  const items = Array.isArray(input) ? (input as unknown[]) : [input]
  if (target === 'string') {
    return items.map((entry) =>
      Internal.shape(entry)
        ? `${entry.re}${entry.im < 0 ? '' : '+'}${entry.im}j`
        : String(entry ?? '')
    )
  }
  if (target === 'complex64') {
    return items.map((entry) => ({
      re: Math.fround(Internal.shape(entry) ? entry.re : Number(entry ?? 0)),
      im: Math.fround(Internal.shape(entry) ? entry.im : 0)
    }))
  }
  if (target === 'complex128') {
    return Internal.nested(items) as Types.NumerixComplex[]
  }
  if (target === 'bool') {
    return items.map((entry) => (Internal.settle('any', entry) ? 1 : 0))
  }
  const integer = target.startsWith('int') || target.startsWith('uint')
  return target in typed
    ? Array.from(
      typed[target]!.from(items, (entry) => {
        const reals = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
        return integer ? Math.trunc(reals) : reals
      })
    )
    : items.map((entry) => {
      const reals = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
      return integer ? Math.trunc(reals) : reals
    })
}
