import type * as Types from '@app/types.ts'
import forward from '@app/fft/forward.ts'

/**
 * Transform a spectrum to a signal.
 * @description Rebuilds a real signal from its half spectrum.
 * @param values - Half spectrum of the signal
 * @param count - Length of the produced signal
 * @returns Complex signal of the transformed spectrum
 */
export default function ihfft(
  values: number[] | number[][],
  count?: number
): Types.NumerixComplex[] | Types.NumerixComplex[][] {
  if (Array.isArray(values[0])) {
    const matrix = values as number[][]
    const rows = matrix.length
    const columns = matrix[0]?.length ?? 0
    const length = count ?? columns
    const half = (length >> 1) + 1
    const result = new Array<Types.NumerixComplex[]>(rows)
    for (let row = 0; row < rows; row++) {
      const transformed = forward(matrix[row] ?? []) as Types.NumerixComplex[]
      const spectrum = new Array<Types.NumerixComplex>(half)
      for (let index = 0; index < half; index++) {
        const sample = transformed[index]
        spectrum[index] = {
          re: (sample?.re ?? 0) / length,
          im: -(sample?.im ?? 0) / length
        }
      }
      result[row] = spectrum
    }
    return result
  }
  const source = values as number[]
  const length = count ?? source.length
  const half = (length >> 1) + 1
  const transformed = forward(source) as Types.NumerixComplex[]
  const result = new Array<Types.NumerixComplex>(half)
  for (let index = 0; index < half; index++) {
    const sample = transformed[index]
    result[index] = {
      re: (sample?.re ?? 0) / length,
      im: -(sample?.im ?? 0) / length
    }
  }
  return result
}
