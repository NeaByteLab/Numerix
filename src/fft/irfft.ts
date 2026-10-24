import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import ifft from '@app/fft/ifft.ts'

/**
 * Transform a spectrum to a signal.
 * @description Rebuilds a real signal from its frequency spectrum.
 * @param spectrum - Frequency spectrum to transform
 * @param count - Length of the produced signal
 * @param axis - Axes along which the transform runs, or 'all' for every axis
 * @returns Real signal of the transformed spectrum
 */
export default function irfft(
  spectrum: (Types.NumerixComplex | number)[] | (Types.NumerixComplex | number)[][],
  count?: number,
  axis?: Types.NumerixAxis
): number[] | number[][] {
  if (Array.isArray(spectrum[0])) {
    const matrix = spectrum as (Types.NumerixComplex | number)[][]
    const direction = Internal.axes(axis)
    if (direction === 'all') {
      const inverted = Internal.columns(
        matrix,
        (column) => ifft(column) as Types.NumerixComplex[]
      )
      return irfftRows(inverted)
    }
    if (direction === 'columns') {
      const rows = matrix.length
      const span = matrix[0]?.length ?? 0
      const width = count ?? (rows - 1) * 2
      const result = new Array<number[]>(width)
      for (let index = 0; index < width; index++) {
        result[index] = new Array<number>(span)
      }
      const buffer = new Array<Types.NumerixComplex | number>(rows)
      for (let column = 0; column < span; column++) {
        for (let row = 0; row < rows; row++) {
          buffer[row] = matrix[row]?.[column] ?? 0
        }
        const line = irfft1D(buffer, width)
        for (let index = 0; index < width; index++) {
          const target = result[index]
          if (target) {
            target[column] = line[index] ?? 0
          }
        }
      }
      return result
    }
    return irfftRows(matrix, count)
  }
  const flat = spectrum as (Types.NumerixComplex | number)[]
  return irfft1D(flat, count ?? (flat.length - 1) * 2)
}

/**
 * Transform one spectrum row.
 * @description Rebuilds a real signal from a single spectral row.
 * @param spectrum - Frequency spectrum row to transform
 * @param count - Length of the produced signal
 * @returns Real signal of the transformed row
 */
function irfft1D(
  spectrum: (Types.NumerixComplex | number)[],
  count: number
): number[] {
  if (count <= 0) {
    return []
  }
  const length = spectrum.length
  const full = new Array<Types.NumerixComplex>(count)
  const component = (index: number) => {
    const entry = spectrum[index]
    if (typeof entry === 'number') {
      return { re: entry, im: 0 }
    }
    return { re: entry?.re ?? 0, im: entry?.im ?? 0 }
  }
  for (let index = 0; index < count; index++) {
    full[index] = { re: 0, im: 0 }
  }
  for (let index = 0; index < length && index < count; index++) {
    full[index] = component(index)
  }
  for (let index = 1; index < length && index < count; index++) {
    const mirror = count - index
    if (mirror > 0 && mirror < count) {
      const source = component(index)
      full[mirror] = { re: source.re, im: -source.im }
    }
  }
  const inverse = ifft(full) as Types.NumerixComplex[]
  const result = new Array<number>(count)
  for (let index = 0; index < count; index++) {
    result[index] = inverse[index]?.re ?? 0
  }
  return result
}

/**
 * Apply the real inverse transform.
 * @description Rebuilds a real signal from each spectral row.
 * @param matrix - Spectral rows to transform
 * @param count - Length of each produced signal
 * @returns Real signal of each transformed row
 */
function irfftRows(
  matrix: (Types.NumerixComplex | number)[][],
  count?: number
): number[][] {
  const width = count ?? ((matrix[0]?.length ?? 0) - 1) * 2
  const result = new Array<number[]>(matrix.length)
  for (let row = 0; row < matrix.length; row++) {
    result[row] = irfft1D(matrix[row] ?? [], width)
  }
  return result
}
