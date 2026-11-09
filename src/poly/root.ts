import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Linalg from '@app/linalg/index.ts'
import convert from '@app/poly/convert.ts'

/**
 * Compute polynomial roots.
 * @description Finds root values or the derived root polynomial.
 * @param input - Coefficients, roots, or square matrix
 * @param roots - When true, returns the derived root polynomial, or specifies the polynomial basis
 * @param basis - Polynomial basis or inverted flag
 * @returns Root values or coefficients of the root polynomial
 */
export default function root(
  input: number[] | number[][],
  roots?: boolean | Types.NumerixBasis,
  basis?: Types.NumerixBasis | boolean
): number[]
/**
 * Build polynomial coefficients from roots.
 * @description Returns the monic polynomial of the complex inputs.
 * @param input - Complex roots of the polynomial
 * @param roots - When true, returns the derived root polynomial
 * @param basis - Polynomial basis or inverted flag
 * @returns Complex coefficients of the root polynomial
 */
export default function root(
  input: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  roots?: boolean | Types.NumerixBasis,
  basis?: Types.NumerixBasis | boolean
): number[] | Types.NumerixComplex[]
/**
 * Compute polynomial roots.
 * @description Finds root values or the derived root polynomial.
 * @param input - Coefficients, roots, or square matrix
 * @param roots - When true, returns the derived root polynomial, or specifies the polynomial basis
 * @param basis - Polynomial basis or inverted flag
 * @returns Root values or coefficients of the root polynomial
 */
export default function root(
  input: number[] | number[][] | Types.NumerixComplex[] | Types.NumerixComplex[][],
  roots?: boolean | Types.NumerixBasis,
  basis?: Types.NumerixBasis | boolean
): number[] | Types.NumerixComplex[] {
  const inverted = typeof roots === 'boolean' ? roots : typeof basis === 'boolean' ? basis : false
  const family: Types.NumerixBasis = typeof roots === 'string'
    ? roots
    : typeof basis === 'string'
    ? basis
    : 'poly'
  if (
    family !== 'poly' &&
    family !== 'cheb' &&
    family !== 'leg' &&
    family !== 'herm' &&
    family !== 'herme' &&
    family !== 'lag'
  ) {
    throw new RangeError("basis must be one of 'poly', 'cheb', 'leg', 'herm', 'herme', or 'lag'")
  }
  if (Array.isArray(input[0])) {
    const coeffs = root(
      Linalg.eig(input as number[][], true) as number[],
      true,
      'poly'
    ) as (number | Types.NumerixComplex)[]
    let complex = Internal.classify(input, true, true) === true
    if (!complex) {
      for (let index = 0; index < coeffs.length; index++) {
        const entry = coeffs[index]
        if (Math.abs(Internal.shape(entry) ? entry.im : 0) > 1e-12) {
          complex = true
          break
        }
      }
    }
    const output = Array.from<unknown, number | Types.NumerixComplex>(
      { length: coeffs.length },
      (_outer, index) => {
        const entry = coeffs[inverted ? index : coeffs.length - 1 - index]
        const reals = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
        const imags = Internal.shape(entry) ? entry.im : 0
        return complex
          ? { re: reals === 0 ? 0 : reals, im: Math.abs(imags) < 1e-15 ? 0 : imags }
          : (reals || 0)
      }
    )
    return (
      !inverted || family === 'poly' ? output : convert(output as number[], 'poly', family)
    ) as number[] | Types.NumerixComplex[]
  }
  const complex = Internal.classify(input, true, true) === true
  if (inverted) {
    if (!complex) {
      const output = new Array<number>(input.length + 1).fill(0)
      output[0] = 1
      for (let index = 0; index < input.length; index++) {
        const point = Number(input[index] ?? 0)
        for (let power = index + 1; power >= 0; power--) {
          const updated = (power > 0 ? output[power - 1]! : 0) - output[power]! * point
          output[power] = updated === 0 ? 0 : updated
        }
      }
      return (
        family === 'poly' ? output : convert(output, 'poly', family)
      ) as number[]
    }
    const output = Array.from(
      { length: input.length + 1 },
      (_outer, power) => ({ re: power === 0 ? 1 : 0, im: 0 })
    )
    for (let index = 0; index < input.length; index++) {
      const point = input[index]
      const reals = Internal.shape(point) ? point.re : Number(point ?? 0)
      const imags = Internal.shape(point) ? point.im : 0
      for (let power = index + 1; power >= 0; power--) {
        const entry = output[power]!
        const alpha = (power > 0 ? output[power - 1]!.re : 0) -
          (entry.re * reals - entry.im * imags)
        const omega = (power > 0 ? output[power - 1]!.im : 0) -
          (entry.re * imags + entry.im * reals)
        entry.re = alpha === 0 ? 0 : alpha
        entry.im = omega === 0 ? 0 : omega
      }
    }
    return (
      family === 'poly' ? output : convert(output, 'poly', family)
    ) as Types.NumerixComplex[]
  }
  const source = family === 'poly'
    ? (input as (number | Types.NumerixComplex)[])
    : convert(input as (number | Types.NumerixComplex)[], family, 'poly')
  if (source.length === 0) {
    throw new RangeError('Coefficient array is empty')
  }
  let crest = 0
  if (family !== 'poly') {
    if (!complex) {
      for (let index = 0; index < source.length; index++) {
        crest = Math.max(crest, Math.abs(Number(source[index] ?? 0)))
      }
    } else {
      for (let index = 0; index < source.length; index++) {
        const entry = source[index]
        crest = Math.max(
          crest,
          Internal.shape(entry) ? Math.hypot(entry.re, entry.im) : Math.abs(Number(entry ?? 0))
        )
      }
    }
  }
  let finish = source.length - 1
  if (!complex) {
    while (finish > 0) {
      const reals = Number(source[finish] ?? 0)
      if (family === 'poly' ? reals === 0 : Math.abs(reals) <= crest * 1e-15) {
        finish--
      } else {
        break
      }
    }
  } else {
    while (finish > 0) {
      const entry = source[finish]
      const reals = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
      const imags = Internal.shape(entry) ? entry.im : 0
      if (
        family === 'poly' ? reals === 0 && imags === 0 : Math.hypot(reals, imags) <= crest * 1e-15
      ) {
        finish--
      } else {
        break
      }
    }
  }
  if (finish <= 0) {
    return []
  }
  let zeroes = 0
  if (!complex) {
    while (zeroes < finish && Number(source[zeroes] ?? 0) === 0) {
      zeroes++
    }
  } else {
    while (zeroes < finish) {
      const entry = source[zeroes]
      if (
        (Internal.shape(entry) ? entry.re : Number(entry ?? 0)) === 0 &&
        (Internal.shape(entry) ? entry.im : 0) === 0
      ) {
        zeroes++
      } else {
        break
      }
    }
  }
  const degree = finish - zeroes
  if (degree <= 0) {
    return complex
      ? Array.from({ length: zeroes }, () => ({ re: 0, im: 0 }))
      : new Array<number>(zeroes).fill(0)
  }
  const front = Internal.components((source[finish] ?? 1) as number)
  const scale = Math.max(Math.abs(front.re), Math.abs(front.im)) || 1
  const cosine = front.re / scale
  const sines = front.im / scale
  const divisor = scale * (cosine * cosine + sines * sines || 1)
  const reals = new Float64Array(degree + 1)
  const imags = new Float64Array(degree + 1)
  if (!complex) {
    for (let power = 0; power <= degree; power++) {
      reals[power] = Number(source[zeroes + power] ?? 0) / (front.re || 1)
    }
  } else {
    for (let power = 0; power <= degree; power++) {
      const entry = source[zeroes + power]
      const first = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
      const right = Internal.shape(entry) ? entry.im : 0
      reals[power] = (first * cosine + right * sines) / divisor
      imags[power] = (right * cosine - first * sines) / divisor
    }
  }
  if (!complex && degree === 2) {
    const linear = reals[1] ?? 0
    const discriminant = linear * linear - 4 * (reals[0] ?? 0)
    if (discriminant < 0) {
      return new Array<number>(zeroes).fill(0)
    }
    const radical = Math.sqrt(discriminant)
    const quadratic = new Array<number>(zeroes).fill(0)
    quadratic.push((-linear - radical) / 2, (-linear + radical) / 2)
    return quadratic.sort((prior, later) => prior - later)
  }
  const radius = complex ? 0.9 : 1
  const angle = (2 * Math.PI) / degree
  const trials = Float64Array.from(
    { length: degree },
    (_outer, index) => degree === 1 ? -(reals[0] ?? 0) : radius * Math.cos(angle * index + 0.1)
  )
  const errors = Float64Array.from(
    { length: degree },
    (_outer, index) => degree === 1 ? -(imags[0] ?? 0) : radius * Math.sin(angle * index + 0.1)
  )
  for (let round = 0; degree > 1 && round < (complex ? 200 : 100); round++) {
    let largest = 0
    for (let index = 0; index < degree; index++) {
      const alpha = trials[index] ?? 0
      const omega = errors[index] ?? 0
      let accum = 1
      let tally = 0
      for (let power = degree - 1; power >= 0; power--) {
        ;[accum, tally] = [
          accum * alpha - tally * omega + (reals[power] ?? 0),
          accum * omega + tally * alpha + (imags[power] ?? 0)
        ]
      }
      let slope = 1
      let twist = 0
      for (let other = 0; other < degree; other++) {
        if (index === other) {
          continue
        }
        const delta = alpha - (trials[other] ?? 0)
        const gamma = omega - (errors[other] ?? 0)
        ;[slope, twist] = [slope * delta - twist * gamma, slope * gamma + twist * delta]
      }
      const square = slope * slope + twist * twist || 1e-30
      const nudge = (accum * slope + tally * twist) / square
      const drift = (tally * slope - accum * twist) / square
      trials[index] = alpha - nudge
      errors[index] = omega - drift
      largest = Math.max(
        largest,
        complex
          ? Math.hypot(nudge, drift) / (Math.hypot(trials[index] ?? 0, errors[index] ?? 0) || 1)
          : Math.abs(nudge) + Math.abs(drift)
      )
    }
    if (largest < 1e-15) {
      break
    }
  }
  if (complex) {
    const output = Array.from({ length: zeroes }, () => ({ re: 0, im: 0 }))
    for (let index = 0; index < degree; index++) {
      const alpha = trials[index] ?? 0
      const omega = errors[index] ?? 0
      const extent = Math.hypot(alpha, omega)
      output.push({
        re: Math.abs(alpha) <= extent * 1e-15 ? 0 : alpha,
        im: Math.abs(omega) <= extent * 1e-15 ? 0 : omega
      })
    }
    return output.sort((first, second) =>
      first.im === second.im ||
        Math.abs(first.re - second.re) >
          Math.max(Math.hypot(first.re, first.im), Math.hypot(second.re, second.im)) * 1e-12
        ? first.re - second.re
        : first.im - second.im
    )
  }
  const result = new Array<number>(zeroes).fill(0)
  for (let index = 0; index < degree; index++) {
    if (Math.abs(errors[index] ?? 0) < 1e-6) {
      let refined = trials[index] ?? 0
      for (let cycle = 0; cycle < 3; cycle++) {
        let value = 1
        let remain = 0
        let slope = 0
        for (let power = degree - 1; power >= 0; power--) {
          slope = slope * refined + value
          const product = value * refined
          const scaled = 134217729 * value
          const upper = scaled - (scaled - value)
          const lower = value - upper
          const halved = 134217729 * refined
          const major = halved - (halved - refined)
          const minor = refined - major
          const coeff = reals[power] ?? 0
          const updated = product + coeff
          const extra = updated - product
          value = updated
          remain = remain * refined +
            (((upper * major - product) + upper * minor +
              lower * major) +
              lower * minor +
              ((product - (updated - extra)) + (coeff - extra)))
        }
        if (Math.abs(slope) > 1e-14) {
          refined -= (value + remain) / slope
        }
      }
      result.push(refined)
    }
  }
  return result.sort((prior, later) => prior - later)
}
