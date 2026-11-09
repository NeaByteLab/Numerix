import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import rfft from '@app/fft/rfft.ts'

/**
 * Transform a spectrum to a signal.
 * @description Rebuilds a real signal from its half spectrum.
 * @param values - Half spectrum of the signal
 * @param count - Length of the produced signal
 * @param level - Axes along which the transform runs
 * @returns Complex signal of the transformed spectrum
 */
export default function ihfft(
  values: number[] | number[][],
  count?: number | Types.NumerixAxis,
  level?: Types.NumerixAxis
): Types.NumerixComplex[] | Types.NumerixComplex[][] {
  if (Array.isArray(values[0])) {
    const total = level !== undefined && typeof count === 'number'
      ? count
      : typeof count === 'number' && count > 1
      ? count
      : undefined
    if (total !== undefined && total <= 0) {
      throw new RangeError('Invalid number of FFT data points')
    }
    const vertical = Internal.axes(level ?? (total === undefined ? count : undefined)) === 'columns'
    const length = total ?? (vertical ? values.length : (values[0].length ?? 0))
    if (length <= 0) {
      throw new RangeError('Invalid number of FFT data points')
    }
    return Internal.transform(
      values as number[][],
      vertical ? 0 : 1,
      (entry) => ihfft(entry as number[], length) as Types.NumerixComplex[]
    )
  }
  const chosen = level ?? (typeof count !== 'number' ? count : undefined)
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
  const length = typeof count === 'number' ? count : values.length
  if (length <= 0) {
    throw new RangeError('Invalid number of FFT data points')
  }
  const result = rfft(values as number[], length) as Types.NumerixComplex[]
  for (let index = 0; index < result.length; index++) {
    const sample = result[index]!
    sample.re /= length
    sample.im = -sample.im / length || 0
  }
  return result
}
