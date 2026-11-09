import type * as Types from '@app/types.ts'
import * as Complex from '@app/complex/index.ts'
import * as Internal from '@app/internal/index.ts'
import irfft from '@app/fft/irfft.ts'

/**
 * Transform a real signal.
 * @description Produces the half spectrum of a real signal.
 * @param values - Real or complex signal samples to transform
 * @param count - Length of the produced spectrum
 * @param level - Axes along which the transform runs
 * @returns Spectrum of the transformed signal
 */
export default function hfft(
  values: (Types.NumerixComplex | number)[] | (Types.NumerixComplex | number)[][],
  count?: number | Types.NumerixAxis,
  level?: Types.NumerixAxis
): number[] | number[][] {
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
    const length = total ?? ((vertical ? values.length : (values[0].length ?? 0)) - 1) * 2
    if (length <= 0) {
      throw new RangeError('Invalid number of FFT data points')
    }
    return Internal.transform(
      values as (Types.NumerixComplex | number)[][],
      vertical ? 0 : 1,
      (entry) => hfft(entry, length) as number[]
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
  const length = typeof count === 'number' ? count : (values.length - 1) * 2
  if (length <= 0) {
    throw new RangeError('Invalid number of FFT data points')
  }
  const result = irfft(
    Complex.conj(values as Types.NumerixVector) as Types.NumerixComplex[],
    length
  ) as number[]
  for (let index = 0; index < result.length; index++) {
    result[index] = (result[index] ?? 0) * length
  }
  return result
}
