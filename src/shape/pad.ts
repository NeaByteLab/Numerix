import type * as Types from '@app/types.ts'
import * as Complex from '@app/complex/index.ts'
import * as Internal from '@app/internal/index.ts'
import * as Reduce from '@app/reduce/index.ts'
import * as Stat from '@app/stat/index.ts'

/**
 * Pad a vector on both sides.
 * @description Adds entries around the vector using the chosen mode.
 * @param input - Vector to pad
 * @param width - Number of entries added on each side
 * @param method - Padding mode applied to the vector
 * @param value - Constant value used by constant padding
 * @returns Padded vector with the added entries
 */
export default function pad(
  input: (number | Types.NumerixComplex)[],
  width: number | number[] | number[][],
  method?:
    | 'constant'
    | 'edge'
    | 'reflect'
    | 'symmetric'
    | 'wrap'
    | 'maximum'
    | 'minimum'
    | 'mean'
    | 'median'
    | 'linear_ramp',
  value?: Types.NumerixValue
): number[] | Types.NumerixComplex[]
/**
 * Pad a matrix on all sides.
 * @description Adds entries around the matrix using the chosen mode.
 * @param input - Matrix to pad
 * @param width - Number of entries added per side or axis
 * @param method - Padding mode applied to the matrix
 * @param value - Constant value used by constant padding
 * @returns Padded matrix with the added entries
 */
export default function pad(
  input: (number | Types.NumerixComplex)[][],
  width: number | number[] | number[][],
  method?:
    | 'constant'
    | 'edge'
    | 'reflect'
    | 'symmetric'
    | 'wrap'
    | 'maximum'
    | 'minimum'
    | 'mean'
    | 'median'
    | 'linear_ramp',
  value?: Types.NumerixValue
): number[][] | Types.NumerixComplex[][]
/**
 * Pad an array on both sides.
 * @description Adds entries around the array using the chosen mode.
 * @param input - Array to pad
 * @param width - Number of entries added on each side
 * @param method - Padding mode applied to the array
 * @param value - Constant value used by constant padding
 * @returns Padded array with the added entries
 */
export default function pad(
  input: (number | Types.NumerixComplex)[] | (number | Types.NumerixComplex)[][],
  width: number | number[] | number[][],
  method:
    | 'constant'
    | 'edge'
    | 'reflect'
    | 'symmetric'
    | 'wrap'
    | 'maximum'
    | 'minimum'
    | 'mean'
    | 'median'
    | 'linear_ramp' = 'constant',
  value: Types.NumerixValue = 0
): number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][] {
  if (Array.isArray(width)) {
    if (
      (width.length !== 1 && width.length !== 2) ||
      (Array.isArray(width[0]) &&
        (width[0].length !== 1 && width[0].length !== 2 ||
          (!Array.isArray(input[0]) && width.length !== 1))) ||
      (width.length === 2 &&
        Array.isArray(width[1]) &&
        width[1].length !== 1 &&
        width[1].length !== 2)
    ) {
      throw new RangeError('pad_width could not be broadcast to shape')
    }
  }
  const complex = Internal.classify(value, true, true) === true ||
    Internal.classify(input, true, true) === true
  if (
    complex &&
    method !== 'maximum' &&
    method !== 'minimum' &&
    method !== 'mean' &&
    method !== 'median'
  ) {
    const reals = pad(
      Complex.real(input as Types.NumerixValue) as number[],
      width,
      method,
      Complex.real(value) as number
    ) as unknown
    const imags = pad(
      Complex.imag(input as Types.NumerixValue) as number[],
      width,
      method,
      Complex.imag(value) as number
    ) as unknown
    if (Array.isArray((reals as unknown[])[0])) {
      return (reals as number[][]).map((entry, outer) =>
        entry.map((value, column) => ({
          re: value,
          im: (imags as number[][])[outer]?.[column] ?? 0
        }))
      )
    }
    return (reals as number[]).map((value, index) => ({
      re: value,
      im: (imags as number[])[index] ?? 0
    }))
  }
  if (Array.isArray(input[0])) {
    const horizontal = typeof width === 'number'
      ? [width, width] as [number, number]
      : Array.isArray(width[0])
      ? ((width[1] ?? width[0]) as number[])
      : (width as number[])
    const vertical = typeof width === 'number'
      ? [width, width] as [number, number]
      : Array.isArray(width[0])
      ? (width[0] as number[])
      : (width as number[])
    const bounds: [number, number] = vertical.length === 1
      ? [vertical[0] ?? 0, vertical[0] ?? 0]
      : [vertical[0] ?? 0, vertical[1] ?? 0]
    const aboves = !Array.isArray(value)
      ? [value as number, value as number]
      : ((Array.isArray(value[0]) ? (value[0] ?? [0]) : value) as number[])
    const matrix = (complex ? Internal.nested(input) : input) as unknown[][]
    const height = matrix.length
    const across = matrix[0]?.length ?? 0
    const filler = complex ? { re: 0, im: 0 } : (aboves[0] ?? 0)
    const columns = Array.from(
      { length: across },
      (_unused, column) =>
        pad(
          Internal.column(matrix, height, column, new Array<unknown>(height)) as (
            | number
            | Types.NumerixComplex
          )[],
          bounds,
          method,
          complex ? filler : aboves
        ) as (number | Types.NumerixComplex)[]
    )
    const sides: [number, number] = horizontal.length === 1
      ? [horizontal[0] ?? 0, horizontal[0] ?? 0]
      : [horizontal[0] ?? 0, horizontal[1] ?? 0]
    return Array.from(
      {
        length: columns.length > 0 ? (columns[0]?.length ?? 0) : (pad(
          new Array<number | Types.NumerixComplex>(height).fill(filler),
          bounds,
          method,
          complex ? filler : aboves
        ) as unknown[]).length
      },
      (_outer, outer) =>
        pad(
          Array.from({ length: across }, (_inner, column) => columns[column]![outer]!),
          sides,
          method,
          complex
            ? filler
            : (!Array.isArray(value)
              ? [value as number, value as number]
              : ((Array.isArray(value[0]) ? ((value[1] ?? value[0]) ?? [0]) : value) as number[]))
        )
    ) as number[][] | Types.NumerixComplex[][]
  }
  const margin = typeof width === 'number'
    ? width
    : Array.isArray(width[0])
    ? (width[0].length === 1 ? (width[0][0] ?? 0) : (width[0] as [number, number]))
    : (width.length === 1 ? (width[0] ?? 0) : (width as [number, number]))
  const before = typeof margin === 'number' ? margin : margin[0]
  const after = typeof margin === 'number' ? margin : margin[1]
  if (before < 0 || after < 0) {
    throw new RangeError("index can't contain negative values")
  }
  if (
    method !== 'constant' &&
    method !== 'edge' &&
    method !== 'reflect' &&
    method !== 'symmetric' &&
    method !== 'wrap' &&
    method !== 'maximum' &&
    method !== 'minimum' &&
    method !== 'mean' &&
    method !== 'median' &&
    method !== 'linear_ramp'
  ) {
    throw new RangeError(`mode '${method}' is not supported`)
  }
  const length = input.length
  const amount = before + length + after
  const leading = !Array.isArray(value) ? (value as number) : ((value[0] ?? 0) as number)
  const trailing = !Array.isArray(value)
    ? (value as number)
    : (value.length === 1 ? leading : ((value[1] ?? 0) as number))
  if (length === 0) {
    if (amount > 0 && method !== 'constant') {
      throw new RangeError('cannot pad empty array with non-constant mode')
    }
    return new Array<number>(amount).fill(leading, 0, before).fill(trailing, before, amount)
  }
  if (method === 'maximum' || method === 'minimum' || method === 'mean' || method === 'median') {
    const items = (complex ? Internal.nested(input) : input) as (number | Types.NumerixComplex)[]
    const metric = method === 'maximum'
      ? Reduce.max(items as number[])
      : method === 'minimum'
      ? Reduce.min(items as number[])
      : method === 'mean'
      ? Stat.mean(items as number[])
      : Stat.median(items as number[])
    return Array.from({ length: amount }, (_outer, index) => {
      const point = index >= before && index < before + length ? items[index - before] : metric
      return complex
        ? {
          re: (point as Types.NumerixComplex).re,
          im: (point as Types.NumerixComplex).im
        }
        : (point as number)
    }) as number[] | Types.NumerixComplex[]
  }
  const numbers = input as number[]
  const result = new Array<number>(amount)
  for (let index = 0; index < length; index++) {
    result[before + index] = numbers[index] ?? leading
  }
  if (method === 'constant') {
    return result.fill(leading, 0, before).fill(trailing, before + length, amount)
  }
  if (method === 'linear_ramp') {
    const first = ((numbers[0] ?? leading) - leading) / before
    for (let index = 0; index < before; index++) {
      result[index] = leading + first * index
    }
    const final = numbers[length - 1] ?? trailing
    const second = (trailing - final) / after
    for (let index = 0; index < after; index++) {
      result[before + length + index] = final + second * (index + 1)
    }
    return result
  }
  if (method === 'edge') {
    return result
      .fill(numbers[0] ?? leading, 0, before)
      .fill(numbers[length - 1] ?? trailing, before + length, amount)
  }
  if (method === 'reflect' && length === 1) {
    return result.fill(numbers[0] ?? leading)
  }
  const period = method === 'reflect'
    ? 2 * (length - 1)
    : method === 'symmetric'
    ? 2 * length
    : length
  for (let index = 0; index < before; index++) {
    const remapped = (((index - before) % period) + period) % period
    result[index] = numbers[
      method === 'reflect'
        ? (remapped < length ? remapped : period - remapped)
        : method === 'symmetric'
        ? (remapped < length ? remapped : period - 1 - remapped)
        : remapped
    ] ?? leading
  }
  for (let index = 0; index < after; index++) {
    const remapped = (method === 'wrap' ? index : length + index) % period
    result[before + length + index] = numbers[
      method === 'reflect'
        ? (remapped < length ? remapped : period - remapped)
        : method === 'symmetric'
        ? (remapped < length ? remapped : period - 1 - remapped)
        : remapped
    ] ?? trailing
  }
  return result
}
