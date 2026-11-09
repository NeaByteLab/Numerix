import type * as Types from '@app/types.ts'
import * as Complex from '@app/complex/index.ts'
import * as Internal from '@app/internal/index.ts'
import forward from '@app/fft/forward.ts'

/**
 * Compute the inverse discrete Fourier transform.
 * @description Transforms a spectrum back into signal samples.
 * @param spectrum - Frequency spectrum to transform
 * @param level - Transform length or axis along which the transform runs
 * @param target - Optional axis when a transform length is given
 * @returns Complex signal of the transformed spectrum
 */
export default function ifft(
  spectrum: (Types.NumerixComplex | number)[] | (Types.NumerixComplex | number)[][],
  level?: Types.NumerixAxis,
  target?: Types.NumerixAxis
): Types.NumerixComplex[] | Types.NumerixComplex[][] {
  if (Array.isArray(spectrum[0])) {
    const matrix = spectrum as (Types.NumerixComplex | number)[][]
    const count = target !== undefined && typeof level === 'number'
      ? level
      : typeof level === 'number' && level > 1
      ? level
      : undefined
    if (count !== undefined && count <= 0) {
      throw new RangeError('Invalid number of FFT data points')
    }
    const chosen = target ?? (count === undefined ? level : undefined)
    if (Array.isArray(chosen)) {
      let current: (Types.NumerixComplex | number)[][] = matrix
      for (let index = 0; index < chosen.length; index++) {
        current = Internal.transform(
          current,
          chosen[index],
          (entry) =>
            ifft(
              entry as (Types.NumerixComplex | number)[],
              index === chosen.length - 1 ? count : undefined
            ) as Types.NumerixComplex[]
        )
      }
      return current as Types.NumerixComplex[][]
    }
    return Internal.transform(
      matrix,
      chosen,
      (entry) => ifft(entry, count) as Types.NumerixComplex[]
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
  const count = typeof level === 'number' ? level : spectrum.length
  if (count <= 0) {
    throw new RangeError('Invalid number of FFT data points')
  }
  let result = forward(
    Complex.conj(spectrum as Types.NumerixVector) as (Types.NumerixComplex | number)[],
    count
  ) as Types.NumerixComplex[]
  for (let index = 0; index < result.length; index++) {
    const sample = result[index]!
    sample.re /= count
    sample.im = -sample.im / count || 0
  }
  if (Array.isArray(chosen)) {
    for (let index = 1; index < chosen.length; index++) {
      result = ifft(result) as Types.NumerixComplex[]
    }
  }
  return result
}
