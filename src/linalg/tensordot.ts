import type * as Types from '@app/types.ts'
import * as Dtype from '@app/dtype/index.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'
import inner from '@app/linalg/inner.ts'
import matmul from '@app/linalg/matmul.ts'
import outer from '@app/linalg/outer.ts'

/**
 * Contract two arrays along axes.
 * @description Contracts the requested axes of both operands.
 * @param first - First operand of the contraction
 * @param right - Second operand of the contraction
 * @param levels - Number of axes or explicit axis lists contracted on each operand
 * @returns Contracted scalar, vector, or matrix
 */
export default function tensordot(
  first: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  right: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  levels: number | [number, number] | [number[], number[]] = 2
):
  | number
  | number[]
  | number[][]
  | Types.NumerixComplex
  | Types.NumerixComplex[]
  | Types.NumerixComplex[][] {
  const shapes = Dtype.info(first).shape
  const bounds = Dtype.info(right).shape
  const order = shapes.length
  const degree = bounds.length
  if (typeof levels === 'number') {
    if (levels <= 0) {
      return outer(first, right)
    }
    if (levels > order || levels > degree) {
      throw new RangeError('tuple index out of range')
    }
    return tensordot(first, right, [
      Array.from({ length: levels }, (_outer, index) => order - levels + index),
      Array.from({ length: levels }, (_outer, index) => index)
    ])
  }
  const primary = Array.isArray(levels[0]) ? levels[0] : [levels[0]]
  const secondary = Array.isArray(levels[1]) ? levels[1] : [levels[1]]
  if (primary.length !== secondary.length) {
    throw new RangeError('shape-mismatch for sum')
  }
  const normalized = primary.map((chosen) => {
    const resolved = chosen < 0 ? order + chosen : chosen
    if (resolved < 0 || resolved >= order) {
      throw new RangeError('axis out of bounds')
    }
    return resolved
  })
  const mirrored = secondary.map((chosen) => {
    const resolved = chosen < 0 ? degree + chosen : chosen
    if (resolved < 0 || resolved >= degree) {
      throw new RangeError('axis out of bounds')
    }
    return resolved
  })
  if (
    (normalized.length === 2 && normalized[0] === normalized[1]) ||
    (mirrored.length === 2 && mirrored[0] === mirrored[1]) ||
    normalized.length > 2
  ) {
    throw new RangeError('duplicate axes are not allowed in tensordot')
  }
  if (normalized.length === 0) {
    return outer(first, right)
  }
  if (normalized.length === 2) {
    const height = shapes[normalized[0]!] ?? 0
    const width = shapes[normalized[1]!] ?? 0
    if (height !== bounds[mirrored[0]!] || width !== bounds[mirrored[1]!]) {
      throw new RangeError('shape-mismatch for sum')
    }
    const source = first as (number | Types.NumerixComplex)[][]
    const target = right as (number | Types.NumerixComplex)[][]
    const flipped = normalized[0] === 1
    const swapped = mirrored[0] === 1
    if (
      Internal.classify(first, true, true) !== true &&
      Internal.classify(right, true, true) !== true
    ) {
      let total = 0
      for (let outer = 0; outer < height; outer++) {
        for (let column = 0; column < width; column++) {
          total += Number((flipped ? source[column]?.[outer] : source[outer]?.[column]) ?? 0) *
            Number((swapped ? target[column]?.[outer] : target[outer]?.[column]) ?? 0)
        }
      }
      return total
    }
    let reals = 0
    let imags = 0
    for (let outer = 0; outer < height; outer++) {
      for (let column = 0; column < width; column++) {
        const alpha = flipped ? source[column]?.[outer] : source[outer]?.[column]
        const omega = swapped ? target[column]?.[outer] : target[outer]?.[column]
        const point = Internal.shape(alpha) ? alpha.re : Number(alpha ?? 0)
        const phase = Internal.shape(alpha) ? alpha.im : 0
        const prior = Internal.shape(omega) ? omega.re : Number(omega ?? 0)
        const extra = Internal.shape(omega) ? omega.im : 0
        reals += point * prior - phase * extra
        imags += point * extra + phase * prior
      }
    }
    return { re: reals, im: imags }
  }
  const start = normalized[0]!
  const final = mirrored[0]!
  if (shapes[start] !== bounds[final]) {
    throw new RangeError('matmul inner dimensions must match')
  }
  if (order === 2 && shapes[1 - start] === 0) {
    return []
  }
  if (degree === 2 && bounds[1 - final] === 0) {
    return order === 2 ? Array.from({ length: shapes[1 - start] ?? 0 }, () => []) : []
  }
  const aligned = order === 2 && start === 0
    ? (Shape.transpose(first as number[][]) as number[][] | Types.NumerixComplex[][])
    : first
  return degree === 2 && final === 1 ? inner(aligned, right) : matmul(aligned, right)
}
