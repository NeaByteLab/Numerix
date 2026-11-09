import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import ifft from '@app/fft/ifft.ts'

/**
 * Transform a spectrum to a signal.
 * @description Rebuilds a real signal from its frequency spectrum.
 * @param spectrum - Frequency spectrum to transform
 * @param count - Length of the produced signal
 * @param level - Axes along which the transform runs
 * @returns Real signal of the transformed spectrum
 */
export default function irfft(
  spectrum: (Types.NumerixComplex | number)[] | (Types.NumerixComplex | number)[][],
  count?: number | Types.NumerixAxis,
  level?: Types.NumerixAxis
): number[] | number[][] {
  if (Array.isArray(spectrum[0])) {
    const matrix = spectrum as (Types.NumerixComplex | number)[][]
    const total = level !== undefined && typeof count === 'number'
      ? count
      : typeof count === 'number' && count > 1
      ? count
      : undefined
    if (total !== undefined && total <= 0) {
      throw new RangeError('Invalid number of FFT data points')
    }
    const target = level ?? (total === undefined ? count : undefined)
    let current = matrix
    let vertical = false
    if (Array.isArray(target) && target.length >= 2) {
      const resolved = target.map((entry) => {
        const plane = entry < 0 ? entry + 2 : entry
        if (plane !== 0 && plane !== 1) {
          throw new RangeError('axis is out of bounds for array of dimension 2')
        }
        return plane
      })
      for (let index = 0; index < resolved.length - 1; index++) {
        current = Internal.transform(
          current,
          resolved[index],
          (entry) => ifft(entry) as Types.NumerixComplex[]
        )
      }
      vertical = (resolved[resolved.length - 1] ?? 1) === 0
    } else {
      const direction = Internal.axes(target)
      if (direction === 'all') {
        current = Internal.columns(matrix, (column) => ifft(column) as Types.NumerixComplex[])
      } else {
        vertical = direction === 'columns'
      }
    }
    const width = total ?? ((vertical ? current.length : (current[0]?.length ?? 0)) - 1) * 2
    if (width <= 0) {
      throw new RangeError('Invalid number of FFT data points')
    }
    return Internal.transform(
      current,
      vertical ? 0 : 1,
      (entry) => irfft(entry, width) as number[]
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
  let slice = spectrum as (Types.NumerixComplex | number)[]
  if (Array.isArray(chosen)) {
    for (let index = 0; index < chosen.length - 1; index++) {
      slice = ifft(slice) as Types.NumerixComplex[]
    }
  }
  const width = typeof count === 'number' ? count : (slice.length - 1) * 2
  if (width <= 0) {
    throw new RangeError('Invalid number of FFT data points')
  }
  const middle = (width >> 1) + 1
  const signal = new Array<Types.NumerixComplex | number>(width).fill(0)
  for (let index = 0; index < (slice.length < middle ? slice.length : middle); index++) {
    const entry = slice[index]
    const reals = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
    const imags = Internal.shape(entry) ? entry.im : 0
    signal[index] = index === 0 || ((width & 1) === 0 && index === middle - 1) ? reals : entry!
    if (index > 0 && index < (width + 1) >> 1) {
      signal[width - index] = imags === 0 ? reals : { re: reals, im: -imags }
    }
  }
  return (ifft(signal) as Types.NumerixComplex[]).map((entry) => entry?.re ?? 0)
}
