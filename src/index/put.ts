import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Write values at indexed positions.
 * @description Assigns values into an array at the given positions.
 * @template T - Type of the array values
 * @param input - Array receiving the written values
 * @param indices - Positions or mask selecting the targets
 * @param values - Values written into the array
 * @param level - Axis along which the values are written
 * @returns Array containing the written values
 */
export default function put<T = number>(
  input: T[] | T[][],
  indices: number | number[] | number[][] | boolean[] | boolean[][] | 'diag',
  values:
    | T
    | T[]
    | T[][]
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][],
  level: number | 'raise' | 'wrap' | 'clip' | 'place' = 1
): T[] | T[][] | Types.NumerixComplex[] | Types.NumerixComplex[][] {
  const source: T[] = Array.isArray(values)
    ? Array.isArray((values as unknown[])[0]) ? Shape.flatten<T>(values as T[][]) : (values as T[])
    : [values as T]
  if (
    typeof level !== 'number' &&
    level !== 'raise' &&
    level !== 'wrap' &&
    level !== 'clip' &&
    level !== 'place'
  ) {
    throw new RangeError("clipmode must be one of 'clip', 'raise', or 'wrap'")
  }
  let output: T[] | T[][]
  if (Array.isArray(input[0])) {
    const matrix = input as T[][]
    const height = matrix.length
    const width = matrix[0]?.length ?? 0
    const result = matrix.map((slice) => (slice ?? []).slice())
    if (indices === 'diag') {
      if (level === 'wrap' && width > 0) {
        for (
          let offset = 0, cursor = 0;
          offset < height * width;
          offset += width + 1, cursor++
        ) {
          const value = source[cursor % source.length]
          if (value !== undefined) {
            const outer = Math.trunc(offset / width)
            result[outer]![offset - outer * width] = value
          }
        }
      } else {
        for (let index = 0; index < Math.min(height, width); index++) {
          const value = source[index % source.length]
          if (value !== undefined) {
            result[index]![index] = value
          }
        }
      }
      output = result
    } else if (Array.isArray(indices) && Array.isArray(indices[0])) {
      if (typeof (indices[0] as unknown[])[0] === 'boolean') {
        const flags = indices as unknown as boolean[][]
        if (flags.length !== height || (flags[0]?.length ?? 0) !== width) {
          throw new RangeError('putmask mask and data must be the same size')
        }
        let matched = 0
        for (let outer = 0; outer < height; outer++) {
          const slice = flags[outer] ?? []
          for (let column = 0; column < width; column++) {
            if (slice[column]) {
              if (source.length === 0 && level === 'place') {
                throw new RangeError('Cannot insert from an empty array')
              }
              const value = source[
                (level === 'place' ? matched++ : outer * width + column) % source.length
              ]
              if (value !== undefined) {
                result[outer]![column] = value
              }
            }
          }
        }
        output = result
      } else {
        const table = indices as number[][]
        const chosen = typeof level === 'number' ? level : 1
        const resolved = chosen < 0 ? 2 + chosen : chosen
        if (resolved !== 0 && resolved !== 1) {
          throw new RangeError('axis is out of bounds for array of dimension 2')
        }
        const depth = table.length
        const extent = table[0]?.length ?? 0
        if (resolved === 1 && height !== depth && height !== 1 && depth !== 1) {
          throw new RangeError('shape mismatch indexing arrays could not be broadcast together')
        }
        if (resolved === 0 && width !== extent && width !== 1 && extent !== 1) {
          throw new RangeError('shape mismatch indexing arrays could not be broadcast together')
        }
        const nested = Array.isArray(values) && Array.isArray((values as unknown[])[0])
        const board = values as T[][]
        let cursor = 0
        for (
          let outer = 0;
          outer < (resolved === 1 ? (height === 1 ? depth : height) : depth);
          outer++
        ) {
          const current = table[depth === 1 ? 0 : outer] ?? []
          const slice = nested ? board[board.length === 1 ? 0 : outer] : undefined
          for (
            let column = 0;
            column < (resolved === 0 ? (width === 1 ? extent : width) : current.length);
            column++
          ) {
            const index = current[extent === 1 ? 0 : column] ?? 0
            if (resolved === 0) {
              if (index < -height || index >= height) {
                throw new RangeError('index is out of bounds for axis 0')
              }
            } else if (index < -width || index >= width) {
              throw new RangeError('index is out of bounds for axis 1')
            }
            const value = nested
              ? slice?.[slice.length === 1 ? 0 : column]
              : source[cursor++ % source.length]
            if (value === undefined) {
              throw new RangeError(
                'shape mismatch value array could not be broadcast to indexing result'
              )
            }
            if (resolved === 0) {
              result[index < 0 ? index + height : index]![width === 1 ? 0 : column] = value
            } else {
              result[height === 1 ? 0 : outer]![index < 0 ? index + width : index] = value
            }
          }
        }
        output = result
      }
    } else {
      const total = height * width
      if (Array.isArray(indices) && typeof indices[0] === 'boolean') {
        const flags = indices as boolean[]
        if (flags.length !== total) {
          throw new RangeError('putmask mask and data must be the same size')
        }
        let matched = 0
        for (let index = 0; index < total; index++) {
          if (flags[index]) {
            if (source.length === 0 && level === 'place') {
              throw new RangeError('Cannot insert from an empty array')
            }
            const value = source[(level === 'place' ? matched++ : index) % source.length]
            if (value !== undefined) {
              result[Math.floor(index / width)]![index % width] = value
            }
          }
        }
      } else {
        const items = typeof indices === 'number' ? [indices] : (indices as number[])
        if (total === 0 && items.length > 0) {
          throw new RangeError('cannot replace elements of an empty array')
        }
        for (let index = 0; index < items.length; index++) {
          const value = source[index % source.length]
          if (value !== undefined) {
            const entry = items[index] ?? 0
            if (level === 'raise' && (entry < -total || entry >= total)) {
              throw new RangeError('index is out of bounds')
            }
            const target = level === 'clip'
              ? (entry < 0 ? 0 : entry >= total ? total - 1 : entry)
              : level === 'raise'
              ? (entry < 0 ? entry + total : entry)
              : (((entry % total) + total) % total)
            result[Math.floor(target / width)]![target % width] = value
          }
        }
      }
      output = result
    }
  } else {
    const result = (input as T[]).slice()
    const length = result.length
    if (Array.isArray(indices) && typeof indices[0] === 'boolean') {
      const flags = indices as boolean[]
      if (flags.length !== length) {
        throw new RangeError('putmask mask and data must be the same size')
      }
      let matched = 0
      for (let index = 0; index < length; index++) {
        if (flags[index]) {
          if (source.length === 0 && level === 'place') {
            throw new RangeError('Cannot insert from an empty array')
          }
          const value = source[(level === 'place' ? matched++ : index) % source.length]
          if (value !== undefined) {
            result[index] = value
          }
        }
      }
    } else {
      const items = typeof indices === 'number' ? [indices] : (indices as number[])
      if (length === 0 && items.length > 0) {
        throw new RangeError('cannot replace elements of an empty array')
      }
      for (let index = 0; index < items.length; index++) {
        const value = source[index % source.length]
        if (value !== undefined) {
          const entry = items[index] ?? 0
          if (level === 'raise' && (entry < -length || entry >= length)) {
            throw new RangeError('index is out of bounds')
          }
          result[
            level === 'clip'
              ? (entry < 0 ? 0 : entry >= length ? length - 1 : entry)
              : level === 'raise'
              ? (entry < 0 ? entry + length : entry)
              : (((entry % length) + length) % length)
          ] = value
        }
      }
    }
    output = result
  }
  return Internal.classify(input, true, true) === true ||
      Internal.classify(values, true, true) === true
    ? (Internal.nested(output) as unknown as T[] | T[][])
    : output
}
