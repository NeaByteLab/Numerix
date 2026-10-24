import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import forward from '@app/fft/forward.ts'

/**
 * Compute the inverse discrete Fourier transform.
 * @description Transforms a spectrum back into signal samples.
 * @param spectrum - Frequency spectrum to transform
 * @param axis - Axes along which the transform runs, or 'all' for every axis
 * @returns Complex signal of the transformed spectrum
 */
export default function ifft(
  spectrum: (Types.NumerixComplex | number)[] | (Types.NumerixComplex | number)[][],
  axis?: Types.NumerixAxis
): Types.NumerixComplex[] | Types.NumerixComplex[][] {
  if (Array.isArray(spectrum[0])) {
    const grid = spectrum as (Types.NumerixComplex | number)[][]
    return Internal.transform(grid, axis, ifft1D)
  }
  return ifft1D(spectrum as (Types.NumerixComplex | number)[])
}

/**
 * Transform one spectrum row.
 * @description Applies the inverse transform to a single row.
 * @param spectrum - Frequency spectrum to transform
 * @returns Complex signal of the transformed row
 */
function ifft1D(spectrum: unknown[]): Types.NumerixComplex[] {
  const count = spectrum.length
  if (count === 0) {
    return []
  }
  const conjugated = new Array<Types.NumerixComplex>(count)
  for (let index = 0; index < count; index++) {
    const sample = spectrum[index]
    if (typeof sample === 'number') {
      conjugated[index] = { re: sample, im: 0 }
      continue
    }
    const complex = sample as Types.NumerixComplex | undefined
    conjugated[index] = { re: complex?.re ?? 0, im: -(complex?.im ?? 0) }
  }
  const transformed = forward(conjugated) as Types.NumerixComplex[]
  const scale = 1 / count
  for (let index = 0; index < count; index++) {
    const sample = transformed[index]
    if (sample) {
      sample.re *= scale
      sample.im = -sample.im * scale
    }
  }
  return transformed
}
