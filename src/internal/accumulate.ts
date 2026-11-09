import type * as Types from '@app/types.ts'
import * as Shape from '@app/shape/index.ts'
import classify from '@app/internal/classify.ts'
import shape from '@app/internal/shape.ts'

/**
 * Accumulate values along an axis.
 * @description Combines entries into running values for the requested axis.
 * @param values - Values whose running values are computed
 * @param invalid - Whether invalid entries are skipped, or the axis index
 * @param level - Axis along which the entries accumulate
 * @param accumulator - Running combination applied to the entries
 * @returns Running values matching the input shape
 */
export default function accumulate(
  values: unknown[],
  invalid: boolean | number | null,
  level: number | boolean | null | undefined,
  accumulator: Types.NumerixReduce
): number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][] {
  const ignore = invalid === true || level === true
  const chosen = invalid === null || level === null
    ? null
    : typeof invalid === 'number'
    ? invalid
    : typeof level === 'number'
    ? level
    : undefined
  if (chosen === undefined && Array.isArray(values[0])) {
    return accumulate(values, ignore, 0, accumulator)
  }
  const vector = !Array.isArray(values[0])
  if (!vector && chosen === null) {
    return accumulate(Shape.flatten(values), ignore, 0, accumulator)
  }
  if (vector && chosen !== undefined && chosen !== null && chosen !== 0 && chosen !== -1) {
    throw new RangeError('axis is out of bounds for array of dimension 1')
  }
  const plane = vector || chosen === null || chosen === undefined
    ? 1
    : chosen < 0
    ? 2 + chosen
    : chosen
  if (plane !== 0 && plane !== 1) {
    throw new RangeError('axis is out of bounds for array of dimension 2')
  }
  if (!vector && plane === 1) {
    return (values as unknown[][]).map((series) =>
      accumulate(series ?? [], ignore, 0, accumulator)
    ) as number[][] | Types.NumerixComplex[][]
  }
  const complex = classify(values, true, true) === true
  if (!vector) {
    const matrix = values as unknown[][]
    const height = matrix.length
    const width = (matrix[0] as unknown[]).length
    if (!complex) {
      const result = Array.from({ length: height }, () => new Array<number>(width))
      for (let column = 0; column < width; column++) {
        let reals = accumulator.identity
        for (let outer = 0; outer < height; outer++) {
          const alpha = Number(matrix[outer]?.[column] ?? 0)
          if (!ignore || !Number.isNaN(alpha)) {
            if (accumulator.identity === 0) {
              reals += alpha
            } else {
              reals *= alpha
            }
          }
          result[outer]![column] = reals
        }
      }
      return result
    }
    const result = Array.from(
      { length: height },
      () => new Array<Types.NumerixComplex>(width)
    )
    for (let column = 0; column < width; column++) {
      let reals = accumulator.identity
      let imags = 0
      for (let outer = 0; outer < height; outer++) {
        const entry = matrix[outer]?.[column]
        const alpha = shape(entry) ? entry.re : Number(entry ?? 0)
        const omega = shape(entry) ? entry.im : 0
        if (!ignore || (!Number.isNaN(alpha) && !Number.isNaN(omega))) {
          if (outer === 0) {
            reals = alpha
            imags = omega
          } else if (accumulator.identity === 0) {
            reals += alpha
            imags += omega
          } else {
            ;[reals, imags] = [reals * alpha - imags * omega, reals * omega + imags * alpha]
          }
        }
        result[outer]![column] = { re: reals, im: imags }
      }
    }
    return result
  }
  if (!complex) {
    let reals = accumulator.identity
    return (values as number[]).map((entry) => {
      const alpha = Number(entry ?? 0)
      if (!ignore || !Number.isNaN(alpha)) {
        if (accumulator.identity === 0) {
          reals += alpha
        } else {
          reals *= alpha
        }
      }
      return reals
    })
  }
  let reals = accumulator.identity
  let imags = 0
  return values.map((entry, index) => {
    const alpha = shape(entry) ? entry.re : Number(entry ?? 0)
    const omega = shape(entry) ? entry.im : 0
    if (!ignore || (!Number.isNaN(alpha) && !Number.isNaN(omega))) {
      if (index === 0) {
        reals = alpha
        imags = omega
      } else if (accumulator.identity === 0) {
        reals += alpha
        imags += omega
      } else {
        ;[reals, imags] = [reals * alpha - imags * omega, reals * omega + imags * alpha]
      }
    }
    return { re: reals, im: imags }
  })
}
