import type * as Types from '@app/types.ts'
import irfft from '@app/fft/irfft.ts'

/**
 * Transform a real signal.
 * @description Produces the half spectrum of a real signal.
 * @param values - Real signal samples to transform
 * @param count - Length of the produced spectrum
 * @returns Complex spectrum of the transformed signal
 */
export default function hfft(
  values: number[] | number[][],
  count?: number
): number[] | number[][] {
  if (Array.isArray(values[0])) {
    const matrix = values as number[][]
    const rows = matrix.length
    const columns = matrix[0]?.length ?? 0
    const length = count ?? (columns - 1) * 2
    const result = new Array<number[]>(rows)
    for (let row = 0; row < rows; row++) {
      result[row] = hfft1D(matrix[row] ?? [], length)
    }
    return result
  }
  return hfft1D(values as number[], count ?? ((values as number[]).length - 1) * 2)
}

/**
 * Transform one signal into a spectrum.
 * @description Produces the half spectrum of a real signal.
 * @param spectrum - Real signal samples to transform
 * @param count - Length of the produced spectrum
 * @returns Complex spectrum of the transformed signal
 */
function hfft1D(spectrum: number[], count: number): number[] {
  if (count <= 0) {
    return []
  }
  const source = new Array<Types.NumerixComplex>(spectrum.length)
  for (let index = 0; index < spectrum.length; index++) {
    const sample = spectrum[index] ?? 0
    source[index] = typeof sample === 'number' ? { re: sample, im: 0 } : {
      re: (sample as Types.NumerixComplex).re ?? 0,
      im: -((sample as Types.NumerixComplex).im ?? 0)
    }
  }
  const result = irfft(source, count) as number[]
  for (let index = 0; index < result.length; index++) {
    result[index] = (result[index] ?? 0) * count
  }
  return result
}
