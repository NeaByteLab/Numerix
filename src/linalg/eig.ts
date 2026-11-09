import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Maths from '@app/math/index.ts'
import matmul from '@app/linalg/matmul.ts'
import qr from '@app/linalg/qr.ts'

/**
 * Compute eigenvalues and eigenvectors.
 * @description Uses Jacobi iteration for symmetric matrices and QR iteration otherwise.
 * @param matrix - Square matrix to decompose
 * @param compact - When true, returns eigenvalues without eigenvectors
 * @returns Eigenvalues alone or eigenvalues with eigenvectors
 */
export default function eig(
  matrix: number[][],
  compact?: boolean
): number[] | Types.NumerixEigen
/**
 * Compute complex eigenvalues and eigenvectors.
 * @description Uses block Jacobi iteration for Hermitian matrices and complex QR iteration otherwise.
 * @param matrix - Square complex matrix to decompose
 * @param compact - When true, returns eigenvalues without eigenvectors
 * @returns Eigenvalues alone or eigenvalues with complex eigenvectors
 */
export default function eig(
  matrix: (number | Types.NumerixComplex)[][],
  compact?: boolean
):
  | number[]
  | Types.NumerixComplex[]
  | Types.NumerixEigen
  | {
    values: number[] | Types.NumerixComplex[]
    vectors: Types.NumerixComplex[][]
  }
/**
 * Compute eigenvalues and eigenvectors.
 * @description Uses Jacobi iteration for symmetric or Hermitian matrices and QR iteration otherwise.
 * @param matrix - Square matrix to decompose
 * @param compact - When true, returns eigenvalues without eigenvectors
 * @returns Eigenvalues alone or eigenvalues with eigenvectors
 */
export default function eig(
  matrix: (number | Types.NumerixComplex)[][],
  compact = false
):
  | number[]
  | Types.NumerixComplex[]
  | Types.NumerixEigen
  | {
    values: number[] | Types.NumerixComplex[]
    vectors: Types.NumerixComplex[][]
  } {
  const order = matrix.length
  if (order > 0 && (matrix[0]?.length ?? 0) !== order) {
    throw new RangeError('Last 2 dimensions of the array must be square')
  }
  let complex = false
  let crest = 0
  let summit = 0
  for (let outer = 0; outer < order; outer++) {
    const slice = matrix[outer]
    for (let column = 0; column < order; column++) {
      const entry = slice?.[column]
      const shaped = Internal.shape(entry)
      if (shaped) {
        complex = true
      }
      const reals = shaped ? entry.re : Number(entry ?? 0)
      const imags = shaped ? entry.im : 0
      crest = Math.max(crest, Math.abs(reals), Math.abs(imags))
      summit = Math.max(summit, Math.hypot(reals, imags))
    }
  }
  if (crest > 0 && Number.isFinite(crest) && (crest < 1e-100 || crest > 1e100)) {
    const decomposed = eig(
      matrix.map((outer) =>
        outer.map((entry) =>
          complex
            ? {
              re: (Internal.shape(entry) ? entry.re : Number(entry ?? 0)) / crest,
              im: (Internal.shape(entry) ? entry.im : 0) / crest
            }
            : (Internal.shape(entry) ? entry.re : Number(entry ?? 0)) / crest
        )
      ) as number[][],
      compact
    )
    const values = (Array.isArray(decomposed) ? decomposed : decomposed.values).map((entry) =>
      Internal.shape(entry)
        ? { re: entry.re * crest, im: entry.im * crest }
        : Number(entry ?? 0) * crest
    ) as number[] | Types.NumerixComplex[]
    return (
      Array.isArray(decomposed) ? values : { values, vectors: decomposed.vectors }
    ) as typeof decomposed
  }
  let hermitian = true
  const tolerance = (complex ? summit : crest) * 1e-12
  for (let outer = 0; outer < order && hermitian; outer++) {
    const diagonal = matrix[outer]?.[outer]
    if (complex && Math.abs(Internal.shape(diagonal) ? diagonal.im : 0) > tolerance) {
      hermitian = false
      break
    }
    for (let column = outer + 1; column < order; column++) {
      const upper = matrix[outer]?.[column]
      const lower = matrix[column]?.[outer]
      if (
        Math.abs(
            (Internal.shape(upper) ? upper.re : Number(upper ?? 0)) -
              (Internal.shape(lower) ? lower.re : Number(lower ?? 0))
          ) > tolerance ||
        Math.abs((Internal.shape(upper) ? upper.im : 0) + (Internal.shape(lower) ? lower.im : 0)) >
          tolerance
      ) {
        hermitian = false
        break
      }
    }
  }
  if (!hermitian) {
    let values: (number | Types.NumerixComplex)[]
    if (!complex) {
      const roots = new Array<number>(order).fill(Number.NaN)
      const source = Internal.working(matrix as number[][])
      let sweeps = 0
      let active = order - 1
      const shifted = Array.from({ length: order }, () => new Array<number>(order).fill(0))
      while (active >= 0) {
        while (
          active > 0 &&
          sweeps > 0 &&
          Math.abs(source[active]?.[active - 1] ?? 0) <=
            Math.max(
              (crest || 1) * 1e-14,
              (Math.abs(source[active - 1]?.[active - 1] ?? 0) +
                Math.abs(source[active]?.[active] ?? 0)) *
                1e-14
            )
        ) {
          roots[active] = source[active]?.[active] ?? 0
          active--
        }
        if (active === 0) {
          roots[0] = source[0]?.[0] ?? 0
          break
        }
        if (sweeps >= 500) {
          break
        }
        sweeps++
        const extent = active + 1
        shifted.length = extent
        const leading = source[active - 1]?.[active - 1] ?? 0
        const trailing = source[active]?.[active] ?? 0
        const middle = (leading + trailing) / 2
        const discriminant = middle * middle -
          (leading * trailing -
            (source[active - 1]?.[active] ?? 0) * (source[active]?.[active - 1] ?? 0))
        const radical = discriminant > 0 ? Math.sqrt(discriminant) : 0
        for (let attempt = 0; attempt < 2; attempt++) {
          const shift = attempt === 0
            ? (Math.abs(middle + radical - trailing) <= Math.abs(middle - radical - trailing)
              ? middle + radical
              : middle - radical)
            : trailing
          for (let outer = 0; outer < extent; outer++) {
            const target = shifted[outer]!
            target.length = extent
            const current = source[outer] ?? []
            for (let column = 0; column < extent; column++) {
              target[column] = (current[column] ?? 0) - (column === outer ? shift : 0)
            }
          }
          const decomposed = qr(shifted)
          let invertible = true
          for (let index = 0; index < extent; index++) {
            if ((decomposed.R[index]?.[index] ?? 0) === 0) {
              invertible = false
              break
            }
          }
          if (invertible) {
            const product = matmul(decomposed.R, decomposed.Q)
            for (let outer = 0; outer < product.length; outer++) {
              const slice = product[outer]!
              const target = source[outer]
              if (target) {
                for (let column = 0; column < extent; column++) {
                  target[column] = (slice[column] ?? 0) + (column === outer ? shift : 0)
                }
              }
            }
            break
          }
        }
      }
      values = roots.map((entry, index) =>
        Number.isNaN(entry) ? (source[index]?.[index] ?? 0) : entry
      )
    } else {
      const source = Internal.nested(matrix) as Types.NumerixComplex[][]
      values = new Array<Types.NumerixComplex>(order)
      let active = order - 1
      let sweeps = 0
      while (active >= 0) {
        while (
          active > 0 &&
          sweeps > 0 &&
          Math.hypot(
              source[active]?.[active - 1]?.re ?? 0,
              source[active]?.[active - 1]?.im ?? 0
            ) <=
            Math.max(
              (summit || 1) * 1e-14,
              (Math.hypot(
                source[active - 1]?.[active - 1]?.re ?? 0,
                source[active - 1]?.[active - 1]?.im ?? 0
              ) +
                Math.hypot(source[active]?.[active]?.re ?? 0, source[active]?.[active]?.im ?? 0)) *
                1e-14
            )
        ) {
          const entry = source[active]?.[active]
          values[active] = {
            re: (entry?.re ?? 0) || 0,
            im: (entry?.im ?? 0) || 0
          }
          active--
        }
        if (active === 0 || sweeps >= 500) {
          for (let index = 0; index <= active; index++) {
            const entry = source[index]?.[index]
            values[index] = {
              re: (entry?.re ?? 0) || 0,
              im: (entry?.im ?? 0) || 0
            }
          }
          break
        }
        sweeps++
        const alpha = source[active - 1]?.[active - 1] ?? { re: 0, im: 0 }
        const omega = source[active - 1]?.[active] ?? { re: 0, im: 0 }
        const gamma = source[active]?.[active - 1] ?? { re: 0, im: 0 }
        const delta = source[active]?.[active] ?? { re: 0, im: 0 }
        const trace = 0.5 * (alpha.re + delta.re)
        const extra = 0.5 * (alpha.im + delta.im)
        const radius = Maths.sqrt({
          re: trace * trace - extra * extra -
            ((alpha.re * delta.re - alpha.im * delta.im) -
              (omega.re * gamma.re - omega.im * gamma.im)),
          im: 2 * trace * extra -
            ((alpha.re * delta.im + alpha.im * delta.re) -
              (omega.re * gamma.im + omega.im * gamma.re))
        }) as Types.NumerixComplex
        const shift = Math.hypot(
            trace + radius.re - delta.re,
            extra + radius.im - delta.im
          ) <=
            Math.hypot(trace - radius.re - delta.re, extra - radius.im - delta.im)
          ? { re: trace + radius.re, im: extra + radius.im }
          : { re: trace - radius.re, im: extra - radius.im }
        const factor = qr(
          Array.from(
            { length: active + 1 },
            (_outer, outer) =>
              Array.from({ length: active + 1 }, (_inner, column) => {
                const entry = source[outer]?.[column] ?? { re: 0, im: 0 }
                return outer === column
                  ? { re: entry.re - shift.re, im: entry.im - shift.im }
                  : { re: entry.re, im: entry.im }
              })
          )
        )
        const product = matmul(factor.R, factor.Q)
        for (let outer = 0; outer < product.length; outer++) {
          const current = product[outer]!
          for (let column = 0; column < active + 1; column++) {
            const entry = current[column]!
            const target = source[outer]![column]!
            target.re = outer === column ? entry.re + shift.re : entry.re
            target.im = outer === column ? entry.im + shift.im : entry.im
          }
        }
      }
    }
    if (compact) {
      return values as number[] | Types.NumerixComplex[]
    }
    return {
      values: values as number[] | Types.NumerixComplex[],
      vectors: Array.from({ length: order }, (_unused, index) => {
        const chosen = values[index]
        const target = Internal.shape(chosen) ? chosen.re : Number(chosen ?? 0)
        const shifted = Internal.shape(chosen) ? chosen.im : 0
        const scale = Math.max(complex ? summit : crest, Math.hypot(target, shifted)) || 1
        const reals = new Float64Array(order * order)
        const imags = new Float64Array(order * order)
        for (let outer = 0; outer < order; outer++) {
          const offset = outer * order
          const slice = matrix[outer]
          for (let column = 0; column < order; column++) {
            const entry = slice?.[column]
            const first = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
            const other = Internal.shape(entry) ? entry.im : 0
            reals[offset + column] = outer === column ? first - target + scale * 1e-12 : first
            imags[offset + column] = outer === column ? other - shifted : other
          }
        }
        const permutation = Array.from({ length: order }, (_outer, cursor) => cursor)
        for (let column = 0; column < order; column++) {
          const origin = column * order
          let chosen = column
          let largest = Math.hypot(
            reals[origin + column] ?? 0,
            imags[origin + column] ?? 0
          )
          for (let outer = column + 1; outer < order; outer++) {
            const entry = Math.hypot(
              reals[outer * order + column] ?? 0,
              imags[outer * order + column] ?? 0
            )
            if (entry > largest) {
              largest = entry
              chosen = outer
            }
          }
          if (chosen !== column) {
            const target = chosen * order
            for (let cursor = 0; cursor < order; cursor++) {
              ;[reals[origin + cursor], reals[target + cursor]] = [
                reals[target + cursor] ?? 0,
                reals[origin + cursor] ?? 0
              ]
              ;[imags[origin + cursor], imags[target + cursor]] = [
                imags[target + cursor] ?? 0,
                imags[origin + cursor] ?? 0
              ]
            }
            ;[permutation[column], permutation[chosen]] = [
              permutation[chosen] ?? 0,
              permutation[column] ?? 0
            ]
          }
          let pivot = reals[origin + column] ?? 0
          const phase = imags[origin + column] ?? 0
          let divisor = pivot * pivot + phase * phase
          if (divisor === 0) {
            pivot = scale * 1e-14
            divisor = pivot * pivot
          }
          for (let outer = column + 1; outer < order; outer++) {
            const offset = outer * order
            const local = reals[offset + column] ?? 0
            const image = imags[offset + column] ?? 0
            const factor = complex ? (local * pivot + image * phase) / divisor : local / pivot
            const angle = complex ? (image * pivot - local * phase) / divisor : 0
            reals[offset + column] = factor
            imags[offset + column] = angle
            for (let cursor = column + 1; cursor < order; cursor++) {
              const stored = reals[origin + cursor] ?? 0
              const other = imags[origin + cursor] ?? 0
              reals[offset + cursor] = (reals[offset + cursor] ?? 0) -
                (factor * stored - angle * other)
              imags[offset + cursor] = (imags[offset + cursor] ?? 0) -
                (factor * other + angle * stored)
            }
          }
        }
        const vector = new Float64Array(order).fill(1)
        const paired = new Float64Array(order).fill(0)
        const forward = new Float64Array(order)
        const behind = new Float64Array(order)
        const solution = new Float64Array(order)
        const companion = new Float64Array(order)
        for (let iteration = 0; iteration < 30; iteration++) {
          for (let outer = 0; outer < order; outer++) {
            const offset = outer * order
            let total = vector[permutation[outer] ?? 0] ?? 0
            let extra = paired[permutation[outer] ?? 0] ?? 0
            for (let column = 0; column < outer; column++) {
              const local = reals[offset + column] ?? 0
              const image = imags[offset + column] ?? 0
              const alpha = forward[column] ?? 0
              const omega = behind[column] ?? 0
              total -= local * alpha - image * omega
              extra -= local * omega + image * alpha
            }
            forward[outer] = total
            behind[outer] = extra
          }
          for (let outer = order - 1; outer >= 0; outer--) {
            const offset = outer * order
            let total = forward[outer] ?? 0
            let extra = behind[outer] ?? 0
            for (let column = outer + 1; column < order; column++) {
              const local = reals[offset + column] ?? 0
              const image = imags[offset + column] ?? 0
              const alpha = solution[column] ?? 0
              const omega = companion[column] ?? 0
              total -= local * alpha - image * omega
              extra -= local * omega + image * alpha
            }
            let pivot = reals[offset + outer] ?? 0
            const phase = imags[offset + outer] ?? 0
            let divisor = pivot * pivot + phase * phase
            if (divisor === 0) {
              pivot = scale * 1e-14
              divisor = pivot * pivot
            }
            solution[outer] = complex ? (total * pivot + extra * phase) / divisor : total / pivot
            companion[outer] = complex ? (extra * pivot - total * phase) / divisor : 0
          }
          let square = 0
          for (let cursor = 0; cursor < order; cursor++) {
            square += (solution[cursor] ?? 0) ** 2 + (companion[cursor] ?? 0) ** 2
          }
          const scalar = 1 / (Math.sqrt(square) || 1)
          for (let cursor = 0; cursor < order; cursor++) {
            vector[cursor] = (solution[cursor] ?? 0) * scalar
            paired[cursor] = (companion[cursor] ?? 0) * scalar
          }
          if (!complex) {
            let residual = 0
            for (let outer = 0; outer < order; outer++) {
              let product = 0
              for (let column = 0; column < order; column++) {
                product += ((matrix as number[][])[outer]?.[column] ?? 0) * (vector[column] ?? 0)
              }
              residual += (product - target * (vector[outer] ?? 0)) ** 2
            }
            if (Math.sqrt(residual) <= scale * 1e-13) {
              break
            }
          }
        }
        return Array.from({ length: order }, (_outer, cursor) => {
          const local = (vector[cursor] ?? 0) || 0
          return complex ? { re: local, im: (paired[cursor] ?? 0) || 0 } : local
        })
      })
    } as
      | Types.NumerixEigen
      | {
        values: number[] | Types.NumerixComplex[]
        vectors: Types.NumerixComplex[][]
      }
  }
  if (complex) {
    const block = Array.from({ length: 2 * order }, () => new Array<number>(2 * order).fill(0))
    for (let outer = 0; outer < order; outer++) {
      for (let column = 0; column < order; column++) {
        const entry = matrix[outer]?.[column]
        const reals = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
        const imags = Internal.shape(entry) ? entry.im : 0
        block[outer]![column] = reals
        block[outer]![order + column] = -imags
        block[order + outer]![column] = imags
        block[order + outer]![order + column] = reals
      }
    }
    const primal = eig(block, compact) as number[] | Types.NumerixEigen
    if (compact) {
      return Array.from(
        { length: order },
        (_outer, index) => (primal as number[])[2 * index] ?? 0
      )
    }
    const first: Float64Array[] = []
    const second: Float64Array[] = []
    for (let candidate = 0; candidate < 2 * order && first.length < order; candidate++) {
      const column = (primal as Types.NumerixEigen).vectors[candidate] ?? []
      const source = Float64Array.from({ length: order }, (_outer, index) => column[index] ?? 0)
      const other = Float64Array.from(
        { length: order },
        (_outer, index) => column[order + index] ?? 0
      )
      for (let prior = 0; prior < first.length; prior++) {
        let product = 0
        let crossed = 0
        for (let index = 0; index < order; index++) {
          product += (first[prior]![index] ?? 0) * (source[index] ?? 0) -
            (-(second[prior]![index] ?? 0)) * (other[index] ?? 0)
          crossed += (first[prior]![index] ?? 0) * (other[index] ?? 0) +
            (-(second[prior]![index] ?? 0)) * (source[index] ?? 0)
        }
        for (let index = 0; index < order; index++) {
          source[index] = (source[index] ?? 0) -
            (product * (first[prior]![index] ?? 0) - crossed * (second[prior]![index] ?? 0))
          other[index] = (other[index] ?? 0) -
            (product * (second[prior]![index] ?? 0) + crossed * (first[prior]![index] ?? 0))
        }
      }
      let square = 0
      for (let index = 0; index < order; index++) {
        square += (source[index] ?? 0) ** 2 + (other[index] ?? 0) ** 2
      }
      if (square > 1e-14) {
        const scale = 1 / Math.sqrt(square)
        for (let index = 0; index < order; index++) {
          source[index] = (source[index] ?? 0) * scale
          other[index] = (other[index] ?? 0) * scale
        }
        first.push(source)
        second.push(other)
      }
    }
    return {
      values: Array.from(
        { length: order },
        (_outer, index) => (primal as Types.NumerixEigen).values[2 * index] ?? 0
      ),
      vectors: Array.from(
        { length: order },
        (_outer, index) =>
          Array.from({ length: order }, (_inner, inner) => ({
            re: (first[index]?.[inner] ?? 0) || 0,
            im: (second[index]?.[inner] ?? 0) || 0
          }))
      )
    }
  }
  const working = Internal.working(matrix as number[][])
  const columns: number[][] = compact ? [] : Array.from(
    { length: order },
    (_outer, outer) => Array.from({ length: order }, (_inner, column) => (outer === column ? 1 : 0))
  )
  let magnitude = 0
  for (let outer = 0; outer < order; outer++) {
    for (let column = 0; column < order; column++) {
      magnitude += (working[outer]?.[column] ?? 0) ** 2
    }
  }
  const threshold = Math.sqrt(magnitude) * Number.EPSILON
  for (let sweep = 0; sweep < 60; sweep++) {
    let remainder = 0
    for (let outer = 0; outer < order - 1; outer++) {
      for (let column = outer + 1; column < order; column++) {
        remainder += (working[outer]?.[column] ?? 0) ** 2
      }
    }
    if (Math.sqrt(2 * remainder) <= threshold) {
      break
    }
    for (let outer = 0; outer < order - 1; outer++) {
      for (let column = outer + 1; column < order; column++) {
        const entry = working[outer]?.[column] ?? 0
        if (Math.abs(entry) <= threshold * 0.01) {
          continue
        }
        const ratio = ((working[column]?.[column] ?? 0) - (working[outer]?.[outer] ?? 0)) /
          (2 * entry)
        const tangent = (ratio >= 0 ? 1 : -1) /
          (Math.abs(ratio) + Math.sqrt(ratio * ratio + 1))
        const cosine = 1 / Math.sqrt(tangent * tangent + 1)
        const signed = tangent * cosine
        for (let index = 0; index < order; index++) {
          const slice = working[index]
          if (slice) {
            const first = slice[outer] ?? 0
            const second = slice[column] ?? 0
            slice[outer] = cosine * first - signed * second
            slice[column] = signed * first + cosine * second
          }
        }
        const upper = working[outer]
        const lower = working[column]
        if (upper && lower) {
          for (let index = 0; index < order; index++) {
            const first = upper[index] ?? 0
            const second = lower[index] ?? 0
            upper[index] = cosine * first - signed * second
            lower[index] = signed * first + cosine * second
          }
        }
        if (!compact) {
          for (let index = 0; index < order; index++) {
            const slice = columns[index]
            if (slice) {
              const first = slice[outer] ?? 0
              const second = slice[column] ?? 0
              slice[outer] = cosine * first - signed * second
              slice[column] = signed * first + cosine * second
            }
          }
        }
      }
    }
  }
  const indices = Array.from({ length: order }, (_outer, index) => index).sort(
    (first, second) => (working[first]?.[first] ?? 0) - (working[second]?.[second] ?? 0)
  )
  const values = indices.map((entry) => working[entry]?.[entry] ?? 0)
  if (compact) {
    return values
  }
  return {
    values,
    vectors: indices.map((entry) =>
      Internal.column(columns, order, entry, new Array<number>(order), 0) as number[]
    )
  }
}
