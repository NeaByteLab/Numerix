import type * as Types from '@app/types.ts'
import classify from '@app/internal/classify.ts'
import column from '@app/internal/column.ts'
import nanarg from '@app/internal/nanarg.ts'
import shape from '@app/internal/shape.ts'

/**
 * Reduce values along an axis.
 * @description Combines values into a running value.
 * @param values - Values whose entries are combined
 * @param missing - Whether invalid entries are skipped
 * @param level - Axis along which the entries are combined
 * @param accumulator - Running combination applied to the entries
 * @returns Combined value for the requested axis
 */
export default function reduce(
  values: unknown[],
  missing: boolean | number,
  level: number | undefined,
  accumulator: Types.NumerixReduce
): number | number[] | Types.NumerixComplex | Types.NumerixComplex[] {
  const parsed = nanarg(missing, level)
  const planar = Array.isArray(values[0])
  if (!planar && parsed.target !== undefined && parsed.target !== 0 && parsed.target !== -1) {
    throw new RangeError('axis is out of bounds for array of dimension 1')
  }
  if (planar && parsed.target !== undefined) {
    if (
      parsed.target !== 1 &&
      parsed.target !== -1 &&
      parsed.target !== 0 &&
      parsed.target !== -2
    ) {
      throw new RangeError('axis is out of bounds for array of dimension 2')
    }
    const matrix = values as unknown[][]
    const height = matrix.length
    const horizontal = parsed.target === 1 || parsed.target === -1
    const complex = classify(matrix, true, true) === true
    const buffer = horizontal ? undefined : new Array<unknown>(height)
    return Array.from<unknown, number | Types.NumerixComplex>(
      { length: horizontal ? height : (matrix[0]?.length ?? 0) },
      (_outer, index) => {
        const value = reduce(
          horizontal ? (matrix[index] ?? []) : column(matrix, height, index, buffer!, 0),
          parsed.skip,
          undefined,
          accumulator
        ) as number | Types.NumerixComplex
        return complex && typeof value === 'number'
          ? { re: value, im: Number.isNaN(value) ? NaN : 0 }
          : value
      }
    ) as number[] | Types.NumerixComplex[]
  }
  const outer = planar ? (values as unknown[][]) : [values]
  let reals = accumulator.identity
  let imags = 0
  let complex = false
  for (let slice = 0; slice < outer.length; slice++) {
    const items = (outer[slice] ?? []) as unknown[]
    for (let inner = 0; inner < items.length; inner++) {
      const entry = items[inner]
      if (typeof entry === 'number') {
        if (parsed.skip && Number.isNaN(entry)) {
          continue
        }
        if (accumulator.identity === 0) {
          reals += entry
        } else {
          reals *= entry
          imags *= entry
        }
        continue
      }
      const shaped = shape(entry)
      if (shaped) {
        complex = true
      }
      const first = shaped ? entry.re : Number(entry ?? 0)
      const second = shaped ? entry.im : 0
      if (parsed.skip && (Number.isNaN(first) || Number.isNaN(second))) {
        continue
      }
      if (accumulator.identity === 0) {
        reals += first
        imags += second
      } else {
        ;[reals, imags] = [reals * first - imags * second, reals * second + imags * first]
      }
    }
  }
  return complex ? { re: reals, im: imags } : reals
}
