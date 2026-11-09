import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Compute a QR decomposition.
 * @description Factorizes a matrix into orthogonal and upper-triangular factors.
 * @param matrix - Matrix to factorize
 * @param method - Decomposition mode
 * @returns Orthogonal and upper-triangular factors or the upper-triangular factor alone
 */
export default function qr(
  matrix: number[][],
  method?: 'reduced' | 'complete'
): Types.NumerixQr
/**
 * Compute the upper-triangular QR factor.
 * @description Returns only the upper-triangular factor of a QR decomposition.
 * @param matrix - Matrix to factorize
 * @param method - Decomposition mode returning only the upper-triangular factor
 * @returns Upper-triangular factor matrix
 */
export default function qr(
  matrix: number[][],
  method: 'r'
): number[][]
/**
 * Compute a complex QR decomposition.
 * @description Factorizes a complex matrix into unitary factors.
 * @param matrix - Complex matrix to factorize
 * @param method - Decomposition mode
 * @returns Unitary and upper-triangular factors or the upper-triangular factor alone
 */
export default function qr(
  matrix: (number | Types.NumerixComplex)[][],
  method?: 'reduced' | 'complete'
): { Q: Types.NumerixComplex[][]; R: Types.NumerixComplex[][] }
/**
 * Compute the complex upper-triangular QR factor.
 * @description Returns only the upper-triangular factor of a complex QR decomposition.
 * @param matrix - Complex matrix to factorize
 * @param method - Decomposition mode returning only the upper-triangular factor
 * @returns Complex upper-triangular factor matrix
 */
export default function qr(
  matrix: (number | Types.NumerixComplex)[][],
  method: 'r'
): Types.NumerixComplex[][]
/**
 * Compute a QR decomposition.
 * @description Factorizes a matrix into orthogonal and upper-triangular factors.
 * @param matrix - Matrix to factorize
 * @param method - Decomposition mode
 * @returns Orthogonal and upper-triangular factors or the upper-triangular factor alone
 */
export default function qr(
  matrix: (number | Types.NumerixComplex)[][],
  method: 'reduced' | 'complete' | 'r' = 'reduced'
):
  | Types.NumerixQr
  | number[][]
  | { Q: Types.NumerixComplex[][]; R: Types.NumerixComplex[][] }
  | Types.NumerixComplex[][] {
  if (method !== 'reduced' && method !== 'complete' && method !== 'r') {
    throw new RangeError(`Unrecognized mode '${method}'`)
  }
  const height = matrix.length
  const width = matrix[0]?.length ?? 0
  const complex = Internal.classify(matrix, true, true) === true
  const reals = new Float64Array(height * width)
  const imags = new Float64Array(height * width)
  for (let outer = 0; outer < height; outer++) {
    for (let column = 0; column < width; column++) {
      const entry = matrix[outer]?.[column]
      const index = column * height + outer
      if (typeof entry === 'number') {
        reals[index] = entry
      } else {
        reals[index] = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
        imags[index] = Internal.shape(entry) ? entry.im : 0
      }
    }
  }
  const steps = Math.min(width, height)
  const first = new Array<Float64Array>(steps)
  const second = new Array<Float64Array>(steps)
  const third = new Float64Array(steps)
  const fourth = new Float64Array(steps)
  for (let stage = 0; stage < steps; stage++) {
    const origin = stage * height
    const alpha = reals[origin + stage] ?? 0
    const omega = imags[origin + stage] ?? 0
    let maximum = Math.max(Math.abs(alpha), Math.abs(omega))
    for (let outer = stage + 1; outer < height; outer++) {
      maximum = Math.max(
        maximum,
        Math.abs(reals[origin + outer] ?? 0),
        Math.abs(imags[origin + outer] ?? 0)
      )
    }
    let tails = 0
    if (maximum > 0) {
      for (let outer = stage + 1; outer < height; outer++) {
        tails += ((reals[origin + outer] ?? 0) / maximum) ** 2 +
          ((imags[origin + outer] ?? 0) / maximum) ** 2
      }
    }
    if (tails === 0 && omega === 0) {
      continue
    }
    const cosine = alpha / maximum
    const sines = omega / maximum
    const pivot = (cosine >= 0 ? -1 : 1) * Math.sqrt(cosine * cosine + sines * sines + tails)
    third[stage] = (pivot - cosine) / pivot
    fourth[stage] = -sines / pivot
    const delta = cosine - pivot
    const denom = maximum * (delta * delta + sines * sines)
    const items = new Float64Array(height)
    const pairs = new Float64Array(height)
    items[stage] = 1
    for (let outer = stage + 1; outer < height; outer++) {
      const entry = reals[origin + outer] ?? 0
      const other = imags[origin + outer] ?? 0
      items[outer] = (entry * delta + other * sines) / denom
      pairs[outer] = (other * delta - entry * sines) / denom
    }
    first[stage] = items
    second[stage] = pairs
    reals[origin + stage] = pivot * maximum
    imags[origin + stage] = 0
    for (let outer = stage + 1; outer < height; outer++) {
      reals[origin + outer] = 0
      imags[origin + outer] = 0
    }
    const gamma = third[stage] ?? 0
    const theta = -(fourth[stage] ?? 0)
    for (let column = stage + 1; column < width; column++) {
      const offset = column * height
      let inner = 0
      let cross = 0
      for (let outer = stage; outer < height; outer++) {
        const point = items[outer] ?? 0
        const phase = -(pairs[outer] ?? 0)
        const value = reals[offset + outer] ?? 0
        const extra = imags[offset + outer] ?? 0
        inner += point * value - phase * extra
        cross += point * extra + phase * value
      }
      const shift = gamma * inner - theta * cross
      const twist = gamma * cross + theta * inner
      for (let outer = stage; outer < height; outer++) {
        const point = items[outer] ?? 0
        const phase = pairs[outer] ?? 0
        reals[offset + outer] = (reals[offset + outer] ?? 0) - (point * shift - phase * twist)
        imags[offset + outer] = (imags[offset + outer] ?? 0) - (point * twist + phase * shift)
      }
    }
  }
  const count = method === 'complete' ? height : steps
  const upper = Array.from(
    { length: count },
    (_outer, outer) =>
      Array.from({ length: width }, (_inner, column) => {
        if (outer <= column) {
          const entry = (reals[column * height + outer] ?? 0) || 0
          return complex ? { re: entry, im: (imags[column * height + outer] ?? 0) || 0 } : entry
        }
        return complex ? { re: 0, im: 0 } : 0
      })
  ) as number[][] | Types.NumerixComplex[][]
  if (method === 'r') {
    return upper
  }
  const bases = new Float64Array(height * count)
  const signs = new Float64Array(height * count)
  for (let column = 0; column < count; column++) {
    bases[column * height + column] = 1
  }
  for (let stage = steps - 1; stage >= 0; stage--) {
    const items = first[stage]
    if (!items) {
      continue
    }
    const pairs = second[stage]!
    const gamma = third[stage] ?? 0
    const theta = fourth[stage] ?? 0
    for (let column = stage; column < count; column++) {
      const offset = column * height
      let inner = 0
      let cross = 0
      for (let outer = stage; outer < height; outer++) {
        const point = items[outer] ?? 0
        const phase = -(pairs[outer] ?? 0)
        const value = bases[offset + outer] ?? 0
        const extra = signs[offset + outer] ?? 0
        inner += point * value - phase * extra
        cross += point * extra + phase * value
      }
      const shift = gamma * inner - theta * cross
      const twist = gamma * cross + theta * inner
      for (let outer = stage; outer < height; outer++) {
        const point = items[outer] ?? 0
        const phase = pairs[outer] ?? 0
        bases[offset + outer] = (bases[offset + outer] ?? 0) - (point * shift - phase * twist)
        signs[offset + outer] = (signs[offset + outer] ?? 0) - (point * twist + phase * shift)
      }
    }
  }
  return {
    Q: Array.from(
      { length: height },
      (_outer, outer) =>
        Array.from({ length: count }, (_inner, column) => {
          const entry = (bases[column * height + outer] ?? 0) || 0
          return complex ? { re: entry, im: (signs[column * height + outer] ?? 0) || 0 } : entry
        })
    ),
    R: upper
  } as Types.NumerixQr | { Q: Types.NumerixComplex[][]; R: Types.NumerixComplex[][] }
}
