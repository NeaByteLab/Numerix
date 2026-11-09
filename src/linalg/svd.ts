import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import eig from '@app/linalg/eig.ts'

/**
 * Compute a singular value decomposition.
 * @description Derives singular values from the matrix eigenpairs.
 * @param matrix - Matrix to decompose
 * @param compact - When true, returns singular values without factors
 * @param complete - When true, returns full left and right factor matrices
 * @returns Singular values alone or singular values with factors
 */
export default function svd(
  matrix: number[][],
  compact?: boolean,
  complete?: boolean
): number[] | Types.NumerixSvd
/**
 * Compute a complex singular value decomposition.
 * @description Derives singular values and unitary factors.
 * @param matrix - Complex matrix to decompose
 * @param compact - When true, returns singular values without factors
 * @param complete - When true, returns full left and right factor matrices
 * @returns Singular values alone or singular values with complex factors
 */
export default function svd(
  matrix: (number | Types.NumerixComplex)[][],
  compact?: boolean,
  complete?: boolean
):
  | number[]
  | {
    U: Types.NumerixComplex[][]
    S: number[]
    Vt: Types.NumerixComplex[][]
  }
/**
 * Compute a singular value decomposition.
 * @description Derives singular values from the matrix eigenpairs.
 * @param matrix - Matrix to decompose
 * @param compact - When true, returns singular values without factors
 * @param complete - When true, returns full left and right factor matrices
 * @returns Singular values alone or singular values with factors
 */
export default function svd(
  matrix: (number | Types.NumerixComplex)[][],
  compact = false,
  complete = false
):
  | number[]
  | Types.NumerixSvd
  | {
    U: Types.NumerixComplex[][]
    S: number[]
    Vt: Types.NumerixComplex[][]
  } {
  const height = matrix.length
  const width = matrix[0]?.length ?? 0
  const complex = Internal.classify(matrix, true, true) === true
  const factors = Math.min(height, width)
  const breadth = complete ? height : factors
  const depth = complete ? width : factors
  const reals = new Float64Array(height * width)
  const imags = new Float64Array(height * width)
  let crest = 0
  for (let outer = 0; outer < height; outer++) {
    const offset = outer * width
    const slice = matrix[outer]
    for (let column = 0; column < width; column++) {
      const entry = slice?.[column]
      if (typeof entry === 'number') {
        crest = Math.max(crest, Math.abs(entry))
        reals[offset + column] = entry
      } else {
        const first = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
        const other = Internal.shape(entry) ? entry.im : 0
        crest = Math.max(crest, Math.abs(first), Math.abs(other))
        reals[offset + column] = first
        imags[offset + column] = other
      }
    }
  }
  const factor = crest > 0 && Number.isFinite(crest) ? crest : 1
  if (factor !== 1) {
    for (let index = 0; index < reals.length; index++) {
      reals[index] = (reals[index] ?? 0) / factor
      imags[index] = (imags[index] ?? 0) / factor
    }
  }
  const blocks = complex
    ? Array.from({ length: 2 * width }, () => new Array<number>(2 * width).fill(0))
    : Internal.kernel(
      Array.from(
        { length: width },
        (_outer, index) =>
          Float64Array.from(
            { length: height },
            (_inner, outer) => reals[outer * width + index] ?? 0
          )
      ),
      width,
      height
    )
  if (complex) {
    for (let index = 0; index < width; index++) {
      for (let inner = 0; inner < width; inner++) {
        let first = 0
        let second = 0
        for (let outer = 0; outer < height; outer++) {
          const alpha = reals[outer * width + index] ?? 0
          const omega = imags[outer * width + index] ?? 0
          const right = reals[outer * width + inner] ?? 0
          const other = imags[outer * width + inner] ?? 0
          first += alpha * right + omega * other
          second += alpha * other - omega * right
        }
        blocks[index]![inner] = first
        blocks[index]![width + inner] = -second
        blocks[width + index]![inner] = second
        blocks[width + index]![width + inner] = first
      }
    }
  }
  const eigen = eig(blocks, false) as Types.NumerixEigen
  const singular = complex
    ? eigen.values
    : Float64Array.from({ length: eigen.values.length }, (_unused, index) => {
      const vector = eigen.vectors[index]
      if (!vector) {
        return Math.sqrt(Math.max(0, eigen.values[index] ?? 0))
      }
      let square = 0
      for (let outer = 0; outer < height; outer++) {
        const offset = outer * width
        let projection = 0
        for (let inner = 0; inner < width; inner++) {
          projection += (reals[offset + inner] ?? 0) * (vector[inner] ?? 0)
        }
        square += projection * projection
      }
      return Math.sqrt(square)
    })
  const order = Array.from({ length: eigen.values.length }, (_outer, index) => index).sort(
    (first, second) => (singular[second] ?? 0) - (singular[first] ?? 0)
  )
  if (!complex && compact) {
    return Array.from(
      { length: factors },
      (_unused, stage) => (singular[order[stage] ?? 0] ?? 0) * factor
    )
  }
  const uppers: Float64Array[] = []
  const lowers: Float64Array[] = []
  for (let index = 0; index < eigen.values.length && uppers.length < depth; index++) {
    const vector = eigen.vectors[order[index] ?? 0] ?? []
    const local = Float64Array.from({ length: width }, (_inner, inner) => vector[inner] ?? 0)
    const extra = Float64Array.from(
      { length: width },
      (_inner, inner) => (complex ? (vector[width + inner] ?? 0) : 0)
    )
    if (complex) {
      for (let prior = 0; prior < uppers.length; prior++) {
        const prefix = uppers[prior]!
        const suffix = lowers[prior]!
        let first = 0
        let second = 0
        for (let inner = 0; inner < width; inner++) {
          const alpha = prefix[inner] ?? 0
          const omega = -(suffix[inner] ?? 0)
          const right = local[inner] ?? 0
          const other = extra[inner] ?? 0
          first += alpha * right - omega * other
          second += alpha * other + omega * right
        }
        for (let inner = 0; inner < width; inner++) {
          const alpha = prefix[inner] ?? 0
          const omega = suffix[inner] ?? 0
          local[inner] = (local[inner] ?? 0) - (first * alpha - second * omega)
          extra[inner] = (extra[inner] ?? 0) - (first * omega + second * alpha)
        }
      }
      let square = 0
      for (let inner = 0; inner < width; inner++) {
        square += (local[inner] ?? 0) ** 2 + (extra[inner] ?? 0) ** 2
      }
      if (square > 1e-14) {
        const scale = 1 / Math.sqrt(square)
        for (let inner = 0; inner < width; inner++) {
          local[inner] = (local[inner] ?? 0) * scale
          extra[inner] = (extra[inner] ?? 0) * scale
        }
        uppers.push(local)
        lowers.push(extra)
      }
    } else {
      uppers.push(local)
      lowers.push(extra)
    }
  }
  const values = Array.from({ length: factors }, (_unused, stage) => {
    if (!complex) {
      return (singular[order[stage] ?? 0] ?? 0) * factor
    }
    const local = uppers[stage]
    const extra = lowers[stage]
    if (!local || !extra) {
      return Math.sqrt(Math.max(0, eigen.values[order[2 * stage] ?? 0] ?? 0)) * factor
    }
    let square = 0
    for (let outer = 0; outer < height; outer++) {
      const offset = outer * width
      let first = 0
      let second = 0
      for (let cursor = 0; cursor < width; cursor++) {
        const alpha = reals[offset + cursor] ?? 0
        const omega = imags[offset + cursor] ?? 0
        const right = local[cursor] ?? 0
        const other = extra[cursor] ?? 0
        first += alpha * right - omega * other
        second += alpha * other + omega * right
      }
      square += first * first + second * second
    }
    return Math.sqrt(square) * factor
  })
  if (compact) {
    return values
  }
  const lefts: Float64Array[] = []
  const rights: Float64Array[] = []
  const first = new Float64Array(height)
  const second = new Float64Array(height)
  for (let column = 0; column < breadth; column++) {
    const sigma = column < factors ? (values[column] ?? 0) / factor : 0
    if (
      sigma > ((values[0] ?? 0) / factor) * Math.max(height, width) * Number.EPSILON &&
      column < uppers.length
    ) {
      const upper = new Float64Array(height)
      const lower = new Float64Array(height)
      const local = uppers[column]!
      const extra = lowers[column]!
      for (let outer = 0; outer < height; outer++) {
        const offset = outer * width
        let alpha = 0
        let omega = 0
        for (let cursor = 0; cursor < width; cursor++) {
          const entry = reals[offset + cursor] ?? 0
          const phase = imags[offset + cursor] ?? 0
          const right = local[cursor] ?? 0
          const other = extra[cursor] ?? 0
          alpha += entry * right - phase * other
          omega += entry * other + phase * right
        }
        upper[outer] = alpha / sigma
        lower[outer] = omega / sigma
      }
      lefts.push(upper)
      rights.push(lower)
      continue
    }
    let largest = -1
    const chosen = new Float64Array(height)
    const offset = new Float64Array(height)
    for (let basis = 0; basis < height; basis++) {
      first.fill(0)
      second.fill(0)
      first[basis] = 1
      for (let prior = 0; prior < lefts.length; prior++) {
        const prefix = lefts[prior]!
        const suffix = rights[prior]!
        let third = 0
        let fourth = 0
        for (let outer = 0; outer < height; outer++) {
          const alpha = prefix[outer] ?? 0
          const omega = -(suffix[outer] ?? 0)
          const right = first[outer] ?? 0
          const other = second[outer] ?? 0
          third += alpha * right - omega * other
          fourth += alpha * other + omega * right
        }
        for (let outer = 0; outer < height; outer++) {
          const alpha = prefix[outer] ?? 0
          const omega = suffix[outer] ?? 0
          first[outer] = (first[outer] ?? 0) - (third * alpha - fourth * omega)
          second[outer] = (second[outer] ?? 0) - (third * omega + fourth * alpha)
        }
      }
      let square = 0
      for (let outer = 0; outer < height; outer++) {
        square += (first[outer] ?? 0) ** 2 + (second[outer] ?? 0) ** 2
      }
      if (square > largest) {
        largest = square
        chosen.set(first)
        offset.set(second)
      }
    }
    const scale = largest > 1e-24 ? 1 / Math.sqrt(largest) : 0
    for (let outer = 0; outer < height; outer++) {
      chosen[outer] = (chosen[outer] ?? 0) * scale
      offset[outer] = (offset[outer] ?? 0) * scale
    }
    lefts.push(chosen)
    rights.push(offset)
  }
  return {
    U: Array.from(
      { length: height },
      (_outer, outer) =>
        Array.from({ length: breadth }, (_inner, column) => {
          const first = (lefts[column]?.[outer] ?? 0) || 0
          return complex ? { re: first, im: (rights[column]?.[outer] ?? 0) || 0 } : first
        })
    ),
    S: values,
    Vt: Array.from(
      { length: depth },
      (_outer, stage) =>
        Array.from({ length: width }, (_inner, inner) => {
          const first = (uppers[stage]?.[inner] ?? 0) || 0
          return complex ? { re: first, im: -(lowers[stage]?.[inner] ?? 0) || 0 } : first
        })
    )
  } as
    | Types.NumerixSvd
    | {
      U: Types.NumerixComplex[][]
      S: number[]
      Vt: Types.NumerixComplex[][]
    }
}
