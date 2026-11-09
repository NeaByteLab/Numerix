import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the discrete Fourier transform.
 * @description Transforms a signal into its frequency spectrum.
 * @param values - Signal samples to transform
 * @param level - Transform length or axis along which the transform runs
 * @param target - Optional axis when a transform length is given
 * @returns Complex spectrum of the transformed signal
 */
export default function forward(
  values: (Types.NumerixComplex | number)[] | (Types.NumerixComplex | number)[][],
  level?: Types.NumerixAxis,
  target?: Types.NumerixAxis
): Types.NumerixComplex[] | Types.NumerixComplex[][] {
  if (Array.isArray(values[0])) {
    const matrix = values as (Types.NumerixComplex | number)[][]
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
            forward(
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
      (entry) => forward(entry, count) as Types.NumerixComplex[]
    )
  }
  const items = values as (Types.NumerixComplex | number)[]
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
  const count = typeof level === 'number' ? level : items.length
  if (count <= 0) {
    throw new RangeError('Invalid number of FFT data points')
  }
  const reals = new Float64Array(count)
  const imaginary = new Float64Array(count)
  for (let index = 0; index < (items.length < count ? items.length : count); index++) {
    const entry = items[index]
    if (Internal.shape(entry)) {
      reals[index] = entry.re
      imaginary[index] = entry.im
    } else {
      reals[index] = Number(entry ?? 0)
    }
  }
  let result: Types.NumerixComplex[]
  if (Internal.radix(reals, imaginary)) {
    result = Array.from(
      { length: count },
      (_outer, index) => ({ re: reals[index] ?? 0, im: imaginary[index] ?? 0 })
    )
  } else if (count >= 32) {
    let padded = 1
    while (padded < 2 * count - 1) {
      padded <<= 1
    }
    const chirps = new Float64Array(count)
    const phases = new Float64Array(count)
    const inputs = new Float64Array(padded)
    const quads = new Float64Array(padded)
    const tapers = new Float64Array(padded)
    const weights = new Float64Array(padded)
    for (let index = 0; index < count; index++) {
      const angle = (Math.PI / count) * ((index * index) % (2 * count))
      const cosine = Math.cos(angle)
      const sines = Math.sin(angle)
      chirps[index] = cosine
      phases[index] = -sines
      const point = reals[index] ?? 0
      const imags = imaginary[index] ?? 0
      inputs[index] = point * cosine + imags * sines
      quads[index] = imags * cosine - point * sines
      tapers[index] = cosine
      weights[index] = sines
      if (index > 0) {
        tapers[padded - index] = cosine
        weights[padded - index] = sines
      }
    }
    Internal.radix(inputs, quads)
    Internal.radix(tapers, weights)
    for (let index = 0; index < padded; index++) {
      const alpha = inputs[index] ?? 0
      const quadrature = quads[index] ?? 0
      const gamma = tapers[index] ?? 0
      const delta = weights[index] ?? 0
      inputs[index] = alpha * gamma - quadrature * delta
      quads[index] = -(alpha * delta + quadrature * gamma)
    }
    Internal.radix(inputs, quads)
    result = Array.from({ length: count }, (_outer, index) => {
      const alpha = inputs[index] ?? 0
      const quadrature = -(quads[index] ?? 0)
      const cosine = chirps[index] ?? 0
      const phasor = phases[index] ?? 0
      return {
        re: (alpha * cosine - quadrature * phasor) / padded,
        im: (alpha * phasor + quadrature * cosine) / padded
      }
    })
  } else {
    result = Array.from({ length: count }, (_outer, index) => {
      const angle = ((-2 * Math.PI) / count) * index
      const advance = Math.cos(angle)
      const swing = Math.sin(angle)
      let walker = 1
      let runner = 0
      let accum = 0
      let tally = 0
      for (let trial = 0; trial < count; trial++) {
        const point = reals[trial] ?? 0
        const imags = imaginary[trial] ?? 0
        accum += point * walker - imags * runner
        tally += point * runner + imags * walker
        ;[walker, runner] = [
          walker * advance - runner * swing,
          walker * swing + runner * advance
        ]
      }
      return { re: accum, im: tally }
    })
  }
  if (Array.isArray(chosen)) {
    for (let index = 1; index < chosen.length; index++) {
      result = forward(result) as Types.NumerixComplex[]
    }
  }
  return result
}
