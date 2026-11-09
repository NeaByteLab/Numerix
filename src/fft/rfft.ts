import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import forward from '@app/fft/forward.ts'

/**
 * Transform a real signal.
 * @description Produces the positive bins of a real signal.
 * @param values - Real signal samples to transform
 * @param level - Transform length or axis along which the transform runs
 * @param target - Optional axis when a transform length is given
 * @returns Complex spectrum of the transformed signal
 */
export default function rfft(
  values: number[] | number[][],
  level?: Types.NumerixAxis,
  target?: Types.NumerixAxis
): Types.NumerixComplex[] | Types.NumerixComplex[][] {
  if (Array.isArray(values[0])) {
    const matrix = values as number[][]
    const count = target !== undefined && typeof level === 'number'
      ? level
      : typeof level === 'number' && level > 1
      ? level
      : undefined
    if (count !== undefined && count <= 0) {
      throw new RangeError('Invalid number of FFT data points')
    }
    const chosen = target ?? (count === undefined ? level : undefined)
    if (Array.isArray(chosen) && chosen.length >= 2) {
      const resolved = chosen.map((entry) => {
        const plane = entry < 0 ? entry + 2 : entry
        if (plane !== 0 && plane !== 1) {
          throw new RangeError('axis is out of bounds for array of dimension 2')
        }
        return plane
      })
      const width = matrix[0]?.length ?? 0
      const final = resolved[resolved.length - 1] ?? 1
      let current = rfft(
        matrix,
        count ?? (final === 0 ? matrix.length : width),
        final
      ) as Types.NumerixComplex[][]
      for (let index = resolved.length - 2; index >= 0; index--) {
        const plane = resolved[index] ?? 0
        current = forward(
          current,
          plane === 0 ? matrix.length : width,
          plane
        ) as Types.NumerixComplex[][]
      }
      return current
    }
    return Internal.axes(chosen) === 'all'
      ? Internal.columns(
        Internal.rows(matrix, (entry) => rfft(entry as number[], count) as Types.NumerixComplex[]),
        (column) => forward(column) as Types.NumerixComplex[]
      )
      : Internal.transform(
        matrix,
        chosen,
        (entry) => rfft(entry as number[], count) as Types.NumerixComplex[]
      )
  }
  const chosen = target ?? (typeof level !== 'number' ? level : undefined)
  if (
    chosen !== undefined && chosen !== 'all' && chosen !== 'rows' && chosen !== 0 && chosen !== -1
  ) {
    if (!Array.isArray(chosen)) {
      throw new RangeError('axis is out of bounds for array of dimension 1')
    }
    for (let index = 0; index < chosen.length; index++) {
      const entry = chosen[index]
      if (entry !== 0 && entry !== -1) {
        throw new RangeError('axis is out of bounds for array of dimension 1')
      }
    }
  }
  const count = typeof level === 'number' ? level : values.length
  if (count <= 0) {
    throw new RangeError('Invalid number of FFT data points')
  }
  let result = (forward(values as number[], count) as Types.NumerixComplex[]).slice(
    0,
    (count >> 1) + 1
  )
  if (Array.isArray(chosen)) {
    for (let index = 1; index < chosen.length; index++) {
      result = forward(result, count) as Types.NumerixComplex[]
    }
  }
  return result
}
