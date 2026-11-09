import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import div from '@app/math/div.ts'

/**
 * Compute the gradient of a matrix.
 * @description Estimates derivatives from adjacent sample differences.
 * @param samples - Matrix of sampled values to differentiate
 * @param spacing - Distance between consecutive samples
 * @param level - Optional axis or second-axis spacing for a two-dimensional gradient
 * @param target - Optional axis when per-axis spacings are provided
 * @returns Gradient estimates along one or both axes
 */
export default function gradient(
  samples: number[][],
  spacing?: number | number[],
  level?: number | number[],
  target?: number
): [number[][], number[][]] | number[][]
/**
 * Compute the gradient of a vector.
 * @description Estimates derivatives from adjacent sample differences.
 * @param samples - Vector of sampled values to differentiate
 * @param spacing - Distance between consecutive samples
 * @param level - Optional axis for a one-dimensional gradient
 * @returns Gradient estimates for each sample
 */
export default function gradient(
  samples: number[],
  spacing?: number | number[],
  level?: number
): number[]
/**
 * Compute a complex gradient.
 * @description Estimates derivatives from adjacent sample differences.
 * @param samples - Complex vector or matrix to differentiate
 * @param spacing - Distance between consecutive samples
 * @param level - Optional axis or second-axis spacing
 * @param target - Optional axis when per-axis spacings are provided
 * @returns Complex gradient estimates
 */
export default function gradient(
  samples:
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][],
  spacing?:
    | number
    | Types.NumerixComplex
    | number[]
    | Types.NumerixComplex[]
    | (number | Types.NumerixComplex)[],
  level?:
    | number
    | Types.NumerixComplex
    | number[]
    | Types.NumerixComplex[]
    | (number | Types.NumerixComplex)[],
  target?: number
):
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][]
  | [Types.NumerixComplex[][], Types.NumerixComplex[][]]
/**
 * Compute the gradient of sampled values.
 * @description Estimates derivatives from adjacent sample differences.
 * @param samples - Sampled values to differentiate
 * @param spacing - Distance between consecutive samples
 * @param level - Optional axis or second-axis spacing for a two-dimensional gradient
 * @param target - Optional axis when per-axis spacings are provided
 * @returns Gradient estimates for each interior sample
 */
export default function gradient(
  samples:
    | number[]
    | number[][]
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][]
    | (number | Types.NumerixComplex)[]
    | (number | Types.NumerixComplex)[][],
  spacing:
    | number
    | Types.NumerixComplex
    | number[]
    | Types.NumerixComplex[]
    | (number | Types.NumerixComplex)[] = 1,
  level?:
    | number
    | Types.NumerixComplex
    | number[]
    | Types.NumerixComplex[]
    | (number | Types.NumerixComplex)[],
  target?: number
):
  | number[]
  | number[][]
  | [number[][], number[][]]
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][]
  | [Types.NumerixComplex[][], Types.NumerixComplex[][]] {
  const complex = Internal.classify(samples, true, true) === true ||
    Internal.classify(spacing, true, true) === true ||
    (level !== undefined && typeof level !== 'number' &&
      Internal.classify(level, true, true) === true)
  if (Array.isArray(samples[0])) {
    const matrix = samples as unknown[][]
    const height = matrix.length
    const width = matrix[0]?.length ?? 0
    const paired = Array.isArray(level) || Internal.shape(level) || target !== undefined
    const chosen = paired ? target : (level as number | undefined)
    const shifted = chosen !== undefined ? (chosen < 0 ? 2 + chosen : chosen) : undefined
    if (shifted !== undefined && shifted !== 0 && shifted !== 1) {
      throw new RangeError('axis is out of bounds for array of dimension 2')
    }
    let vertical: number[][] | Types.NumerixComplex[][] = []
    if (shifted !== 1) {
      if (width === 0) {
        gradient(new Array<number>(height).fill(0), spacing as number)
        vertical = Array.from({ length: height }, () => [])
      } else {
        const result = Array.from({ length: height }, () => new Array<unknown>(width))
        const buffer = new Array<unknown>(height)
        for (let column = 0; column < width; column++) {
          const derived = gradient(
            Internal.column(matrix, height, column, buffer) as number[],
            spacing as number
          ) as unknown[]
          for (let outer = 0; outer < height; outer++) {
            result[outer]![column] = derived[outer]
          }
        }
        vertical = result as number[][] | Types.NumerixComplex[][]
      }
      if (complex) {
        vertical = Internal.nested(vertical) as Types.NumerixComplex[][]
      }
      if (shifted === 0) {
        return vertical
      }
    }
    const horizontal = matrix.map((slice) =>
      gradient(
        (slice ?? []) as number[] | Types.NumerixComplex[],
        (paired && level !== undefined ? level : spacing) as number
      )
    )
    const across = (
      complex ? Internal.nested(horizontal) : horizontal
    ) as number[][] | Types.NumerixComplex[][]
    return (
      shifted === 1 ? across : [vertical, across]
    ) as
      | number[][]
      | Types.NumerixComplex[][]
      | [number[][], number[][]]
      | [Types.NumerixComplex[][], Types.NumerixComplex[][]]
  }
  if (typeof level === 'number' && level !== 0 && level !== -1) {
    throw new RangeError('axis is out of bounds for array of dimension 1')
  }
  const count = samples.length
  let stride: number | Types.NumerixComplex | unknown[] = spacing
  if (Array.isArray(stride)) {
    if (stride.length !== count) {
      throw new RangeError('distances must match the length of the corresponding dimension')
    }
    if (count >= 2) {
      const start = stride[0]
      const first = stride[1]
      let shaped = Internal.shape(start) || Internal.shape(first)
      const reals = (Internal.shape(first) ? first.re : Number(first ?? 0)) -
        (Internal.shape(start) ? start.re : Number(start ?? 0))
      const imags = (Internal.shape(first) ? first.im : 0) - (Internal.shape(start) ? start.im : 0)
      let uniform = !Number.isNaN(reals) && !Number.isNaN(imags)
      for (let index = 2; index < count && uniform; index++) {
        const prior = stride[index - 1]
        const point = stride[index]
        if (Internal.shape(point)) {
          shaped = true
        }
        if (
          (Internal.shape(point) ? point.re : Number(point ?? 0)) -
                (Internal.shape(prior) ? prior.re : Number(prior ?? 0)) !==
            reals ||
          (Internal.shape(point) ? point.im : 0) - (Internal.shape(prior) ? prior.im : 0) !== imags
        ) {
          uniform = false
        }
      }
      if (uniform) {
        stride = shaped ? { re: reals, im: imags } : reals
      }
    }
  }
  if (count < 2) {
    throw new RangeError('Shape of array too small to calculate a numerical gradient')
  }
  const finish = count - 1
  if (Array.isArray(stride)) {
    if (!complex) {
      return Array.from({ length: count }, (_outer, index) => {
        if (index === 0 || index === finish) {
          const offset = index === 0 ? 0 : finish - 1
          return (
            Number((samples as unknown[])[offset + 1] ?? 0) -
            Number((samples as unknown[])[offset] ?? 0)
          ) / (((stride as number[])[offset + 1] ?? 1) - ((stride as number[])[offset] ?? 0))
        }
        const prior = ((stride as number[])[index] ?? 0) - ((stride as number[])[index - 1] ?? 0)
        const after = ((stride as number[])[index + 1] ?? 0) - ((stride as number[])[index] ?? 0)
        const total = prior + after
        return (-after / (prior * total)) *
            Number((samples as unknown[])[index - 1] ?? 0) +
          ((after - prior) / (prior * after)) * Number((samples as unknown[])[index] ?? 0) +
          (prior / (after * total)) * Number((samples as unknown[])[index + 1] ?? 0)
      })
    }
    return Array.from({ length: count }, (_outer, index) => {
      if (index === 0 || index === finish) {
        const offset = index === 0 ? 0 : finish - 1
        const lower = (samples as unknown[])[offset]
        const upper = (samples as unknown[])[offset + 1]
        const prior = stride[offset]
        const after = stride[offset + 1]
        return div(
          {
            re: (Internal.shape(upper) ? upper.re : Number(upper ?? 0)) -
              (Internal.shape(lower) ? lower.re : Number(lower ?? 0)),
            im: (Internal.shape(upper) ? upper.im : 0) - (Internal.shape(lower) ? lower.im : 0)
          },
          {
            re: (Internal.shape(after) ? after.re : Number(after ?? 1)) -
              (Internal.shape(prior) ? prior.re : Number(prior ?? 0)),
            im: (Internal.shape(after) ? after.im : 0) - (Internal.shape(prior) ? prior.im : 0)
          }
        ) as Types.NumerixComplex
      }
      const lower = (samples as unknown[])[index - 1]
      const state = (samples as unknown[])[index]
      const upper = (samples as unknown[])[index + 1]
      const prior = stride[index - 1]
      const point = stride[index]
      const later = stride[index + 1]
      const center = Internal.shape(point) ? point.re : Number(point ?? 0)
      const middle = Internal.shape(point) ? point.im : 0
      const behind = center - (Internal.shape(prior) ? prior.re : Number(prior ?? 0))
      const before = middle - (Internal.shape(prior) ? prior.im : 0)
      const beyond = (Internal.shape(later) ? later.re : Number(later ?? 0)) - center
      const ahead = (Internal.shape(later) ? later.im : 0) - middle
      if ((behind === 0 && before === 0) || (beyond === 0 && ahead === 0)) {
        return { re: NaN, im: NaN }
      }
      const crest = Math.max(
        Math.abs(behind),
        Math.abs(before),
        Math.abs(beyond),
        Math.abs(ahead)
      ) || 1
      const alpha = behind / crest
      const gamma = before / crest
      const delta = beyond / crest
      const omega = ahead / crest
      const front = alpha * alpha - gamma * gamma
      const phase = 2 * alpha * gamma
      const bound = delta * delta - omega * omega
      const angle = 2 * delta * omega
      const range = bound - front
      const extra = angle - phase
      const scale = alpha * delta - gamma * omega
      const shift = alpha * omega + gamma * delta
      const total = delta + alpha
      const sweep = omega + gamma
      const first = Internal.shape(lower) ? lower.re : Number(lower ?? 0)
      const other = Internal.shape(lower) ? lower.im : 0
      const value = Internal.shape(state) ? state.re : Number(state ?? 0)
      const image = Internal.shape(state) ? state.im : 0
      const final = Internal.shape(upper) ? upper.re : Number(upper ?? 0)
      const limit = Internal.shape(upper) ? upper.im : 0
      return div(
        {
          re: (front * final - phase * limit) +
            (range * value - extra * image) -
            (bound * first - angle * other),
          im: (front * limit + phase * final) +
            (range * image + extra * value) -
            (bound * other + angle * first)
        },
        {
          re: (scale * total - shift * sweep) * crest,
          im: (scale * sweep + shift * total) * crest
        }
      ) as Types.NumerixComplex
    })
  }
  if (!complex) {
    const scale = Number(stride ?? 1)
    return Array.from(
      { length: count },
      (_outer, index) =>
        (Number((samples as number[])[index === finish ? finish : index + 1] ?? 0) -
          Number((samples as number[])[index === 0 ? 0 : index - 1] ?? 0)) *
        (1 / ((index === 0 || index === finish ? 1 : 2) * scale))
    )
  }
  const delta = Internal.components(stride as number)
  return Array.from({ length: count }, (_outer, index) => {
    const lower = (samples as unknown[])[index === 0 ? 0 : index - 1]
    const upper = (samples as unknown[])[index === finish ? finish : index + 1]
    const scale = index === 0 || index === finish ? 1 : 2
    return div(
      {
        re: (Internal.shape(upper) ? upper.re : Number(upper ?? 0)) -
          (Internal.shape(lower) ? lower.re : Number(lower ?? 0)),
        im: (Internal.shape(upper) ? upper.im : 0) - (Internal.shape(lower) ? lower.im : 0)
      },
      { re: scale * delta.re, im: scale * delta.im }
    ) as Types.NumerixComplex
  })
}
