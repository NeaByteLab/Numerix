import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Transform one signal row.
 * @description Applies the radix two transform to a single row.
 * @param values - Signal samples to transform
 * @returns Complex spectrum of the transformed row
 */
function forward1D(values: (Types.NumerixComplex | number)[]): Types.NumerixComplex[] {
  const count = values.length
  if (count === 0) {
    return []
  }
  const real = new Float64Array(count)
  const imaginary = new Float64Array(count)
  for (let index = 0; index < count; index++) {
    const sample = values[index]
    if (typeof sample === 'number') {
      real[index] = sample
    } else if (sample) {
      real[index] = sample.re
      imaginary[index] = sample.im
    }
  }
  if ((count & (count - 1)) === 0) {
    radix2Transform(real, imaginary, false)
    const result = new Array<Types.NumerixComplex>(count)
    for (let index = 0; index < count; index++) {
      result[index] = { re: real[index] ?? 0, im: imaginary[index] ?? 0 }
    }
    return result
  }
  if (count >= 32 && Internal.radix(real, imaginary)) {
    const result = new Array<Types.NumerixComplex>(count)
    for (let index = 0; index < count; index++) {
      result[index] = { re: real[index] ?? 0, im: imaginary[index] ?? 0 }
    }
    return result
  }
  if (count >= 64) {
    let padded = 1
    while (padded < 2 * count - 1) {
      padded <<= 1
    }
    const chirpRe = new Float64Array(count)
    const chirpIm = new Float64Array(count)
    const signalRe = new Float64Array(padded)
    const signalIm = new Float64Array(padded)
    const kernelRe = new Float64Array(padded)
    const kernelIm = new Float64Array(padded)
    const factor = Math.PI / count
    const period = 2 * count
    for (let index = 0; index < count; index++) {
      const angle = factor * ((index * index) % period)
      const cosine = Math.cos(angle)
      const sine = Math.sin(angle)
      chirpRe[index] = cosine
      chirpIm[index] = -sine
      const point = real[index] ?? 0
      const imag = imaginary[index] ?? 0
      signalRe[index] = point * cosine + imag * sine
      signalIm[index] = imag * cosine - point * sine
      kernelRe[index] = cosine
      kernelIm[index] = sine
      if (index > 0) {
        kernelRe[padded - index] = cosine
        kernelIm[padded - index] = sine
      }
    }
    radix2Transform(signalRe, signalIm, false)
    radix2Transform(kernelRe, kernelIm, false)
    for (let index = 0; index < padded; index++) {
      const real = signalRe[index] ?? 0
      const imag = signalIm[index] ?? 0
      const factorRe = kernelRe[index] ?? 0
      const factorIm = kernelIm[index] ?? 0
      signalRe[index] = real * factorRe - imag * factorIm
      signalIm[index] = real * factorIm + imag * factorRe
    }
    radix2Transform(signalRe, signalIm, true)
    const result = new Array<Types.NumerixComplex>(count)
    for (let index = 0; index < count; index++) {
      const valueRe = signalRe[index] ?? 0
      const valueIm = signalIm[index] ?? 0
      const factorRe = chirpRe[index] ?? 0
      const factorIm = chirpIm[index] ?? 0
      result[index] = {
        re: valueRe * factorRe - valueIm * factorIm,
        im: valueRe * factorIm + valueIm * factorRe
      }
    }
    return result
  }
  const result = new Array<Types.NumerixComplex>(count)
  const base = (-2 * Math.PI) / count
  for (let bin = 0; bin < count; bin++) {
    const angle = base * bin
    const stepCos = Math.cos(angle)
    const stepSin = Math.sin(angle)
    let currentCos = 1
    let currentSin = 0
    let sumRe = 0
    let sumIm = 0
    for (let trial = 0; trial < count; trial++) {
      const point = real[trial] ?? 0
      const imag = imaginary[trial] ?? 0
      sumRe += point * currentCos - imag * currentSin
      sumIm += point * currentSin + imag * currentCos
      const nextCos = currentCos * stepCos - currentSin * stepSin
      currentSin = currentCos * stepSin + currentSin * stepCos
      currentCos = nextCos
    }
    result[bin] = { re: sumRe, im: sumIm }
  }
  return result
}

/**
 * Compute the discrete Fourier transform.
 * @description Transforms a signal into its frequency spectrum.
 * @param values - Signal samples to transform
 * @param axis - Axes along which the transform runs, or 'all' for every axis
 * @returns Complex spectrum of the transformed signal
 */
export default function forward(
  values: (Types.NumerixComplex | number)[] | (Types.NumerixComplex | number)[][],
  axis?: Types.NumerixAxis
): Types.NumerixComplex[] | Types.NumerixComplex[][] {
  if (Array.isArray(values[0])) {
    const grid = values as (Types.NumerixComplex | number)[][]
    return Internal.transform(grid, axis, forward1D)
  }
  return forward1D(values as (Types.NumerixComplex | number)[])
}

/**
 * Run a radix two transform.
 * @description Performs the butterfly stages of the transform.
 * @param real - Real components of the transform
 * @param imaginary - Imaginary components of the transform
 * @param inverse - When true applies the inverse transform
 */
function radix2Transform(
  real: Float64Array,
  imaginary: Float64Array,
  inverse: boolean
): void {
  const count = real.length
  let target = 0
  for (let index = 0; index < count; index++) {
    if (index < target) {
      const firstRe = real[index] ?? 0
      const firstIm = imaginary[index] ?? 0
      real[index] = real[target] ?? 0
      imaginary[index] = imaginary[target] ?? 0
      real[target] = firstRe
      imaginary[target] = firstIm
    }
    let bit = count >> 1
    while (bit > 0 && (target & bit) !== 0) {
      target ^= bit
      bit >>= 1
    }
    target |= bit
  }
  const sign = inverse ? 2 * Math.PI : -2 * Math.PI
  for (let length = 2; length <= count; length <<= 1) {
    const half = length >> 1
    const step = sign / length
    for (let offset = 0; offset < half; offset++) {
      const angle = step * offset
      const twiddleRe = Math.cos(angle)
      const twiddleIm = Math.sin(angle)
      for (let start = offset; start < count; start += length) {
        const odd = start + half
        const oddRe = real[odd] ?? 0
        const oddIm = imaginary[odd] ?? 0
        const productRe = twiddleRe * oddRe - twiddleIm * oddIm
        const productIm = twiddleRe * oddIm + twiddleIm * oddRe
        const evenRe = real[start] ?? 0
        const evenIm = imaginary[start] ?? 0
        real[start] = evenRe + productRe
        imaginary[start] = evenIm + productIm
        real[odd] = evenRe - productRe
        imaginary[odd] = evenIm - productIm
      }
    }
  }
  if (inverse) {
    const scale = 1 / count
    for (let index = 0; index < count; index++) {
      real[index] = (real[index] ?? 0) * scale
      imaginary[index] = (imaginary[index] ?? 0) * scale
    }
  }
}
