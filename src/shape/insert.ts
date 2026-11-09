import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import flatten from '@app/shape/flatten.ts'
import transpose from '@app/shape/transpose.ts'

/**
 * Insert values into a matrix.
 * @description Places values at the given index along an axis.
 * @template T - Type of the matrix values
 * @param input - Matrix receiving the inserted values
 * @param index - Insertion position
 * @param values - Values inserted at the given position
 * @param level - Axis along which values are inserted
 * @returns Matrix containing the inserted values
 */
export default function insert<T>(
  input: T[][],
  index: number | number[] | T[][],
  values:
    | T
    | T[]
    | T[][]
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
    | undefined,
  level: number
): T[][] | Types.NumerixComplex[][]
/**
 * Insert values into an array.
 * @description Places values at the given index or appends them to the flattened array.
 * @template T - Type of the array values
 * @param input - Matrix or vector receiving the inserted values
 * @param index - Insertion position or appended values
 * @param values - Values inserted at the given position
 * @param level - Optional axis along which values are inserted
 * @returns Vector containing the inserted values
 */
export default function insert<T>(
  input: T[] | T[][],
  index: number | number[] | T | T[] | T[][],
  values?:
    | T
    | T[]
    | T[][]
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][],
  level?: number | null
): T[] | T[][] | Types.NumerixComplex[] | Types.NumerixComplex[][]
/**
 * Insert values into an array.
 * @description Places values at the given index or appends them.
 * @template T - Type of the array values
 * @param input - Array receiving the inserted values
 * @param index - Insertion position or appended values
 * @param values - Values inserted at the given position
 * @param level - Axis along which values are inserted
 * @returns Array containing the inserted values
 */
export default function insert<T>(
  input: T[] | T[][],
  index: number | number[] | T | T[] | T[][],
  values?:
    | T
    | T[]
    | T[][]
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][],
  level?: number | null
): T[] | T[][] | Types.NumerixComplex[] | Types.NumerixComplex[][] {
  const length = input.length
  const appending = values === undefined
  const source = appending ? index : values
  if (!appending && Array.isArray(index)) {
    let masked = false
    for (let position = 0; position < index.length; position++) {
      if (typeof (index as unknown[])[position] === 'boolean') {
        masked = true
        break
      }
    }
    if (masked) {
      const positions: number[] = []
      for (let position = 0; position < index.length; position++) {
        if ((index as unknown[])[position]) {
          positions.push(position)
        }
      }
      index = positions
    }
  }
  let output: unknown
  if (Array.isArray(input[0]) && level !== undefined && level !== null) {
    const matrix = input as unknown as unknown[][]
    const width = matrix[0]?.length ?? 0
    const normalized = level < 0 ? 2 + level : level
    if (normalized === 0) {
      if (
        appending &&
        Array.isArray(source) &&
        Array.isArray((source as unknown[])[0]) &&
        ((source as unknown[][])[0]?.length ?? 0) !== width
      ) {
        throw new RangeError(
          'all the input array dimensions except for the concatenation axis must match exactly'
        )
      }
      const incoming = (
        Array.isArray(source) && Array.isArray((source as unknown[])[0])
          ? (source as unknown as unknown[][])
          : [Array.isArray(source) ? (source as unknown[]) : [source]]
      ).map((entry) => {
        const items = entry ?? []
        if (items.length === 1) {
          return new Array<unknown>(width).fill(items[0])
        }
        if (items.length !== width) {
          throw new RangeError('could not broadcast input array into shape')
        }
        return items.slice()
      })
      if (!appending && Array.isArray(index)) {
        const positions = index as number[]
        const count = positions.length
        if (incoming.length !== 1 && incoming.length !== count) {
          throw new RangeError('could not broadcast input array into shape')
        }
        if (count === 0) {
          output = matrix.map((entry) => (entry ?? []).slice())
        } else {
          const pairs = positions.map((entry = 0, cursor) => {
            const target = entry < 0 ? length + entry : entry
            if (target < 0 || target > length) {
              throw new RangeError('index is out of bounds for axis 0')
            }
            return {
              target,
              order: cursor,
              slice: (incoming[incoming.length === 1 ? 0 : cursor] ?? []).slice()
            }
          }).sort((first, second) => first.target - second.target || first.order - second.order)
          const result = new Array<unknown[]>(length + count)
          let write = 0
          let pointer = 0
          for (let cursor = 0; cursor <= length; cursor++) {
            while (pointer < count && pairs[pointer]!.target === cursor) {
              result[write++] = pairs[pointer++]!.slice
            }
            if (cursor < length) {
              result[write++] = (matrix[cursor] ?? []).slice()
            }
          }
          output = result
        }
      } else {
        const position = appending ? length : (index as number)
        const target = position < 0 ? length + position : position
        if (target < 0 || target > length) {
          throw new RangeError('index is out of bounds for axis 0')
        }
        const result = new Array<unknown[]>(length + incoming.length)
        for (let cursor = 0; cursor < target; cursor++) {
          result[cursor] = (matrix[cursor] ?? []).slice()
        }
        for (let cursor = 0; cursor < incoming.length; cursor++) {
          result[target + cursor] = incoming[cursor] ?? []
        }
        for (let cursor = target; cursor < length; cursor++) {
          result[incoming.length + cursor] = (matrix[cursor] ?? []).slice()
        }
        output = result
      }
    } else if (normalized === 1) {
      if (
        appending &&
        Array.isArray(source) &&
        Array.isArray((source as unknown[])[0]) &&
        (source as unknown[][]).length !== length
      ) {
        throw new RangeError(
          'all the input array dimensions except for the concatenation axis must match exactly'
        )
      }
      const shifted = !appending && Array.isArray(index)
        ? transpose(
          (Array.isArray(source) && Array.isArray((source as unknown[])[0])
            ? (source as unknown[][])
            : [Array.isArray(source) ? (source as unknown[]) : [source]]).map((slice) =>
              slice.length === 1 && (index as number[]).length > 1
                ? new Array((index as number[]).length).fill(slice[0])
                : slice
            ) as number[][]
        )
        : appending && Array.isArray(source) && Array.isArray((source as unknown[])[0])
        ? transpose(source as number[][])
        : source
      try {
        output = transpose(
          insert(
            transpose(matrix as number[][]) as T[][],
            (appending ? shifted : index) as number[],
            (appending ? undefined : shifted) as T[],
            0
          ) as number[][]
        )
      } catch (error) {
        if (error instanceof RangeError && error.message === 'index is out of bounds for axis 0') {
          throw new RangeError('index is out of bounds for axis 1')
        }
        throw error
      }
    } else {
      throw new RangeError('axis is out of bounds for array of dimension 2')
    }
  } else {
    if (
      !Array.isArray(input[0]) &&
      level !== undefined &&
      level !== null &&
      level !== 0 &&
      level !== -1
    ) {
      throw new RangeError('axis is out of bounds for array of dimension 1')
    }
    const payload = Array.isArray(source) && Array.isArray((source as unknown[])[0])
      ? flatten<T>(source as unknown[])
      : Array.isArray(source)
      ? (source as T[])
      : [source as T]
    const flattened = Array.isArray(input[0]) ? flatten<T>(input) : (input as T[])
    if (appending) {
      output = flattened.concat(payload)
    } else {
      output = insert(
        flattened.map((entry) => [entry]),
        index as number[],
        payload.map((entry) => [entry]),
        0
      ).map((slice) => slice[0])
    }
  }
  return (
    Internal.classify(input, true, true) === true ||
      Internal.classify(source, true, true) === true
      ? Internal.nested(output)
      : output
  ) as T[] | T[][] | Types.NumerixComplex[] | Types.NumerixComplex[][]
}
