import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute the determinant of a matrix.
 * @description Uses elimination and tracks the determinant sign.
 * @param matrix - Square matrix whose determinant is computed
 * @param logged - When true, returns the log-determinant with sign
 * @returns Determinant value or log-determinant with sign
 */
export default function det(
  matrix: number[][] | Types.NumerixComplex[][],
  logged = false
): number | Types.NumerixComplex | Types.NumerixDet {
  const order = matrix.length
  if (order > 0 && (matrix[0]?.length ?? 0) !== order) {
    throw new RangeError('Last 2 dimensions of the array must be square')
  }
  if (Internal.classify(matrix, true, true) !== true) {
    const working = Internal.working(matrix as number[][])
    let parity = 1
    let product = 1
    let logarithm = 0
    for (let index = 0; index < order; index++) {
      let chosen = index
      let largest = Math.abs(working[index]?.[index] ?? 0)
      for (let cursor = index + 1; cursor < order; cursor++) {
        const option = Math.abs(working[cursor]?.[index] ?? 0)
        if (option > largest) {
          largest = option
          chosen = cursor
        }
      }
      if (largest === 0) {
        return logged ? { sign: 0, logDet: -Infinity } : 0
      }
      if (chosen !== index) {
        ;[working[index], working[chosen]] = [working[chosen] ?? [], working[index] ?? []]
        parity = -parity
      }
      const pivot = working[index]!
      const entry = pivot[index] ?? 1
      if (entry < 0) {
        parity = -parity
      }
      if (logged) {
        logarithm += Math.log(largest)
      } else {
        product *= largest
      }
      for (let cursor = index + 1; cursor < order; cursor++) {
        const current = working[cursor]!
        const factor = (current[index] ?? 0) / entry
        for (let column = index + 1; column < order; column++) {
          current[column] = (current[column] ?? 0) - factor * (pivot[column] ?? 0)
        }
      }
    }
    const signed = parity * product
    return logged ? { sign: Math.sign(signed), logDet: logarithm } : signed
  }
  const working = Internal.nested(matrix) as Types.NumerixComplex[][]
  let parity = 1
  let reals = 1
  let imags = 0
  let logarithm = 0
  for (let index = 0; index < order; index++) {
    let chosen = index
    let largest = Math.hypot(working[index]?.[index]?.re ?? 0, working[index]?.[index]?.im ?? 0)
    for (let cursor = index + 1; cursor < order; cursor++) {
      const option = Math.hypot(
        working[cursor]?.[index]?.re ?? 0,
        working[cursor]?.[index]?.im ?? 0
      )
      if (option > largest) {
        largest = option
        chosen = cursor
      }
    }
    if (largest === 0) {
      return logged ? { sign: { re: 0, im: 0 }, logDet: -Infinity } : { re: 0, im: 0 }
    }
    if (chosen !== index) {
      ;[working[index], working[chosen]] = [working[chosen] ?? [], working[index] ?? []]
      parity = -parity
    }
    const pivot = working[index]!
    const entry = pivot[index] ?? { re: 1, im: 0 }
    const cosine = entry.re / largest
    const sines = entry.im / largest
    const factor = logged ? 1 : largest
    logarithm += logged ? Math.log(largest) : 0
    ;[reals, imags] = [
      (reals * cosine - imags * sines) * factor,
      (reals * sines + imags * cosine) * factor
    ]
    for (let cursor = index + 1; cursor < order; cursor++) {
      const current = working[cursor]!
      const front = current[index] ?? { re: 0, im: 0 }
      const alpha = (front.re * cosine + front.im * sines) / largest
      const omega = (front.im * cosine - front.re * sines) / largest
      for (let column = index + 1; column < order; column++) {
        const above = pivot[column] ?? { re: 0, im: 0 }
        const below = current[column]!
        below.re -= alpha * above.re - omega * above.im
        below.im -= alpha * above.im + omega * above.re
      }
    }
  }
  const alpha = parity * reals
  const omega = parity * imags
  if (logged) {
    const scale = Math.hypot(alpha, omega)
    return {
      sign: scale === 0 ? { re: 0, im: 0 } : {
        re: (alpha / scale) || 0,
        im: (omega / scale) || 0
      },
      logDet: logarithm
    }
  }
  return {
    re: alpha || 0,
    im: omega || 0
  }
}
