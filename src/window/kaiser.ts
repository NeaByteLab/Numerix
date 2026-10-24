import * as Internal from '@app/internal/index.ts'

/**
 * Evaluate the modified Bessel function.
 * @description Computes the zeroth order modified Bessel function.
 * @param argument - Value at which the function is evaluated
 * @returns Value of the modified Bessel function
 */
function bessel0(argument: number): number {
  const square = argument * argument * 0.25
  if (square === 0) {
    return 1
  }
  let sum = 1
  let term = 1
  for (let index = 1; index < 100; index++) {
    term *= square / (index * index)
    sum += term
    if (term <= sum * 1e-16) {
      break
    }
  }
  return sum
}

/**
 * Build a Kaiser window.
 * @description Generates a window shaped by a Bessel function.
 * @param length - Window length or lengths to produce
 * @param beta - Shape parameter of the Bessel function
 * @returns Kaiser window values matching the input shape
 */
export default function kaiser(
  length: number | number[],
  beta: number | 'i0' = 14
): number | number[] {
  if (Array.isArray(length)) {
    const count = length.length
    const result = new Array<number>(count)
    for (let index = 0; index < count; index++) {
      result[index] = bessel0(length[index] ?? 0)
    }
    return result
  }
  if (beta === 'i0') {
    return bessel0(length)
  }
  if (length <= 0) {
    return []
  }
  if (length === 1) {
    return [1]
  }
  const inverse = 1 / bessel0(beta)
  const last = length - 1
  const alpha = last * 0.5
  const scale = 1 / alpha
  return Internal.taper(length, (index) => {
    const ratio = (index - alpha) * scale
    const radius = 1 - ratio * ratio
    return bessel0(beta * Math.sqrt(radius > 0 ? radius : 0)) * inverse
  })
}
