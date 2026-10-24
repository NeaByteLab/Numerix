import vander from '@app/poly/vander.ts'

/**
 * Sample a polynomial or function.
 * @description Evaluates a polynomial or callback over sample points.
 * @param count - Number of sample points to generate
 * @param degree - Degree used when sampling a polynomial
 * @param fn - Callback evaluated when sampling a function
 * @param kind - Sample point distribution to use
 * @returns Sampled values for the generated points
 */
export default function sample(
  count: number,
  degree?: number,
  fn?: (point: number) => number,
  kind: 'first' | 'second' = 'first'
): number[] {
  const points = degree === undefined ? count : degree + 1
  if (!Number.isInteger(points) || points < 1 || (kind === 'second' && points < 2)) {
    throw new RangeError('Point count is out of range')
  }
  const samples = new Array<number>(points)
  if (kind === 'second') {
    const step = Math.PI / (points - 1)
    for (let index = 0; index < points; index++) {
      samples[index] = Math.cos(Math.PI - step * index)
    }
  } else {
    const step = Math.PI / points
    for (let index = 0; index < points; index++) {
      samples[index] = Math.sin(0.5 * step * (2 * index - points + 1))
    }
  }
  if (!fn || degree === undefined) {
    return samples
  }
  const values = new Array<number>(points)
  for (let index = 0; index < points; index++) {
    values[index] = fn(samples[index] ?? 0)
  }
  const design = vander(samples, degree, 'cheb')
  const coefficients = new Array<number>(degree + 1).fill(0)
  for (let power = 0; power <= degree; power++) {
    let dot = 0
    for (let index = 0; index < points; index++) {
      dot += (design[index]?.[power] ?? 0) * (values[index] ?? 0)
    }
    coefficients[power] = power === 0 ? dot / points : dot / (0.5 * points)
  }
  return coefficients
}
