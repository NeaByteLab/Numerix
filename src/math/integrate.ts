import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Integrate sampled values numerically.
 * @description Applies trapezoidal integration over vector or matrix samples.
 * @param samples - Sampled values to integrate
 * @param points - Optional integration boundaries within the samples
 * @param spacing - Distance between consecutive samples
 * @param level - Axis along which to integrate
 * @returns Integral of the sampled values
 */
export default function integrate(
  samples:
    | number[]
    | number[][]
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][],
  points?:
    | number[]
    | number[][]
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][]
    | number
    | Types.NumerixComplex,
  spacing?: number | Types.NumerixComplex,
  level?: number
): number | number[] | Types.NumerixComplex | Types.NumerixComplex[] {
  const complex = Internal.classify(samples, true, true) === true ||
    Internal.classify(points, true, true) === true ||
    Internal.classify(spacing, true, true) === true
  if (Array.isArray(samples[0])) {
    const matrix = samples as unknown[][]
    const height = matrix.length
    const width = matrix[0]?.length ?? 0
    const implicit = points !== undefined || spacing === 0 || spacing === -1 || spacing === -2
    const chosen = level !== undefined
      ? level
      : implicit && typeof spacing === 'number'
      ? spacing
      : -1
    const stride = level === undefined && implicit ? 1 : (spacing ?? 1)
    const shifted = chosen < 0 ? 2 + chosen : chosen
    if (shifted !== 0 && shifted !== 1) {
      throw new RangeError('axis is out of bounds for array of dimension 2')
    }
    const lattice = Array.isArray(points) && Array.isArray(points[0])
      ? (points as unknown[][])
      : undefined
    const coords = Array.isArray(points) && !Array.isArray(points[0])
      ? (points as unknown[])
      : typeof points === 'number' || Internal.shape(points)
      ? points
      : undefined
    if (shifted === 0) {
      if (
        lattice &&
        (lattice.length !== height ||
          (lattice[0]?.length !== 1 && (lattice[0]?.length ?? 0) !== width))
      ) {
        throw new RangeError('operands could not be broadcast together')
      }
      if (width === 0) {
        if (coords && Array.isArray(coords) && coords.length !== height) {
          throw new RangeError('sample points and values must have the same length')
        }
        return []
      }
      const buffer = new Array<unknown>(height)
      const column = lattice ? new Array<unknown>(height) : undefined
      const result = Array.from(
        { length: width },
        (_unused, inner) =>
          integrate(
            Internal.column(matrix, height, inner, buffer, 0) as number[],
            (lattice
              ? Internal.column(
                lattice,
                height,
                (lattice[0]?.length ?? 0) === 1 ? 0 : inner,
                column!,
                0
              )
              : coords) as number[],
            stride,
            0
          )
      )
      return (complex ? Internal.nested(result) : result) as number[] | Types.NumerixComplex[]
    }
    if (
      lattice &&
      ((lattice.length !== 1 && lattice.length !== height) ||
        (lattice[0]?.length ?? 0) !== width)
    ) {
      throw new RangeError('operands could not be broadcast together')
    }
    const result = Array.from(
      { length: height },
      (_unused, outer) =>
        integrate(
          (matrix[outer] ?? []) as number[],
          (lattice ? (lattice[lattice.length === 1 ? 0 : outer] ?? []) : coords) as number[],
          stride,
          0
        )
    )
    return (complex ? Internal.nested(result) : result) as number[] | Types.NumerixComplex[]
  }
  if (level !== undefined && level !== 0 && level !== -1) {
    throw new RangeError('axis is out of bounds for array of dimension 1')
  }
  const slice = samples as unknown[]
  const length = slice.length
  if (Array.isArray(points) && points.length !== length) {
    throw new RangeError('sample points and values must have the same length')
  }
  if (length < 2) {
    return complex ? { re: 0, im: 0 } : 0
  }
  if (!complex) {
    const numeric = slice as number[]
    if (!Array.isArray(points)) {
      const stride = Number(typeof points === 'number' ? points : (spacing ?? 1))
      let total = 0
      let prior = Number(numeric[0] ?? 0)
      for (let index = 1; index < length; index++) {
        const upper = Number(numeric[index] ?? 0)
        total += (upper + prior) * stride
        prior = upper
      }
      return 0.5 * total
    }
    const coords = points as number[]
    let total = 0
    let prior = Number(numeric[0] ?? 0)
    let origin = Number(coords[0] ?? 0)
    for (let index = 1; index < length; index++) {
      const upper = Number(numeric[index] ?? 0)
      const target = Number(coords[index] ?? 0)
      total += (upper + prior) * (target - origin)
      prior = upper
      origin = target
    }
    return 0.5 * total
  }
  const scale = Array.isArray(points) ? undefined : Internal.components(
    (typeof points === 'number' || Internal.shape(points) ? points : (spacing ?? 1)) as number
  )
  let reals = 0
  let imags = 0
  const initial = slice[0]
  let prior = Internal.shape(initial) ? initial.re : Number(initial ?? 0)
  let previous = Internal.shape(initial) ? initial.im : 0
  const start = scale ? undefined : (points as unknown[])[0]
  let origin = scale ? 0 : (Internal.shape(start) ? start.re : Number(start ?? 0))
  let before = scale ? 0 : (Internal.shape(start) ? start.im : 0)
  for (let index = 1; index < length; index++) {
    const after = slice[index]
    const upper = Internal.shape(after) ? after.re : Number(after ?? 0)
    const extra = Internal.shape(after) ? after.im : 0
    let width = scale ? scale.re : 0
    let depth = scale ? scale.im : 0
    if (!scale) {
      const current = (points as unknown[])[index]
      const target = Internal.shape(current) ? current.re : Number(current ?? 0)
      const phase = Internal.shape(current) ? current.im : 0
      width = target - origin
      depth = phase - before
      origin = target
      before = phase
    }
    const alpha = upper + prior
    const gamma = extra + previous
    prior = upper
    previous = extra
    reals += alpha * width - gamma * depth
    imags += alpha * depth + gamma * width
  }
  return { re: (0.5 * reals) || 0, im: (0.5 * imags) || 0 }
}
