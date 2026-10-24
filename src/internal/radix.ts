import type * as Types from '@app/types.ts'

/**
 * Run a mixed radix transform.
 * @description Transforms a signal whose length factors into small radices.
 * @param real - Real components of the signal, overwritten with the spectrum
 * @param imaginary - Imaginary components of the signal, overwritten with the spectrum
 * @returns True when the length is supported
 */
export default function radix(
  real: Float64Array,
  imaginary: Float64Array
): boolean {
  const length = real.length
  if (length <= 1) {
    return true
  }
  const factors = factorize(length)
  for (const factor of factors) {
    if (factor > 13) {
      return false
    }
  }
  const root: Types.NumerixComplex[] = new Array(length).fill(null).map(() => ({
    re: 0,
    im: 0
  }))
  for (let index = 0; index < length; index++) {
    const angle = (-2 * Math.PI * index) / length
    root[index] = { re: Math.cos(angle), im: Math.sin(angle) }
  }
  const source: Types.NumerixComplex[] = new Array(length).fill(null).map(() => ({
    re: 0,
    im: 0
  }))
  for (let index = 0; index < length; index++) {
    source[index] = { re: real[index] ?? 0, im: imaginary[index] ?? 0 }
  }
  const result: Types.NumerixComplex[] = new Array(length).fill(null).map(() => ({
    re: 0,
    im: 0
  }))
  transform(
    source,
    0,
    1,
    length,
    length,
    result,
    0,
    root
  )
  for (let index = 0; index < length; index++) {
    real[index] = result[index]?.re ?? 0
    imaginary[index] = result[index]?.im ?? 0
  }
  return true
}

/**
 * Factor a length into small radices.
 * @description Splits the length into accepted radices.
 * @param length - Signal length to factor
 * @returns Radix factors in descending preference order
 */
function factorize(length: number): number[] {
  const factors: number[] = []
  let rest = length
  for (const radix of [4, 2, 3, 5, 7, 11, 13]) {
    while (rest % radix === 0) {
      factors.push(radix)
      rest /= radix
    }
  }
  if (rest > 1) {
    factors.push(rest)
  }
  return factors
}

/**
 * Transform a strided signal block.
 * @description Applies the mixed radix butterflies of one recursion level.
 * @param source - Complex components of the source signal
 * @param start - Index of the first sample of the block
 * @param step - Distance between consecutive samples of the block
 * @param size - Number of samples in the block
 * @param length - Length of the whole signal
 * @param target - Complex components of the transformed block
 * @param offset - Index of the first result of the block
 * @param root - Complex components of the roots of unity
 */
function transform(
  source: Types.NumerixComplex[],
  start: number,
  step: number,
  size: number,
  length: number,
  target: Types.NumerixComplex[],
  offset: number,
  root: Types.NumerixComplex[]
): void {
  if (size === 1) {
    target[offset] = source[start] ?? { re: 0, im: 0 }
    return
  }
  const radix = factorize(size)[0] ?? size
  const inner = size / radix
  if (radix === size) {
    for (let bin = 0; bin < size; bin++) {
      let total: Types.NumerixComplex = { re: 0, im: 0 }
      for (let trial = 0; trial < size; trial++) {
        const index = (trial * bin * (length / size)) % length
        const phase = root[index] ?? { re: 0, im: 0 }
        const point = source[start + trial * step] ?? { re: 0, im: 0 }
        total = {
          re: total.re + point.re * phase.re - point.im * phase.im,
          im: total.im + point.re * phase.im + point.im * phase.re
        }
      }
      target[offset + bin] = total
    }
    return
  }
  const block: Types.NumerixComplex[] = new Array(size).fill(null).map(() => ({
    re: 0,
    im: 0
  }))
  for (let lane = 0; lane < radix; lane++) {
    transform(
      source,
      start + lane * step,
      step * radix,
      inner,
      length,
      block,
      lane * inner,
      root
    )
  }
  const outerStep = length / size
  const laneStep = length / radix
  for (let bin = 0; bin < inner; bin++) {
    for (let lane = 0; lane < radix; lane++) {
      let total: Types.NumerixComplex = { re: 0, im: 0 }
      for (let step = 0; step < radix; step++) {
        const first = (step * bin * outerStep) % length
        const second = (step * lane * laneStep) % length
        const left = root[first] ?? { re: 0, im: 0 }
        const right = root[second] ?? { re: 0, im: 0 }
        const phase = {
          re: left.re * right.re - left.im * right.im,
          im: left.re * right.im + left.im * right.re
        }
        const point = block[step * inner + bin] ?? { re: 0, im: 0 }
        total = {
          re: total.re + point.re * phase.re - point.im * phase.im,
          im: total.im + point.re * phase.im + point.im * phase.re
        }
      }
      target[offset + bin + inner * lane] = total
    }
  }
}
