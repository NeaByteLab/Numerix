import * as Internal from '@app/internal/index.ts'

/** Lower-range Chebyshev coefficients for the modified Bessel function */
const lower = [
  -4.4153416464793395e-18,
  3.3307945188222384e-17,
  -2.431279846547955e-16,
  1.715391285555133e-15,
  -1.1685332877993451e-14,
  7.676185498604936e-14,
  -4.856446783111929e-13,
  2.95505266312964e-12,
  -1.726826291441556e-11,
  9.675809035373237e-11,
  -5.189795601635263e-10,
  2.6598237246823866e-09,
  -1.300025009986248e-08,
  6.046995022541919e-08,
  -2.670793853940612e-07,
  1.1173875391201037e-06,
  -4.4167383584587505e-06,
  1.6448448070728896e-05,
  -5.754195010082104e-05,
  0.00018850288509584165,
  -0.0005763755745385824,
  0.0016394756169413357,
  -0.004324309995050576,
  0.010546460394594998,
  -0.02373741480589947,
  0.04930528423967071,
  -0.09490109704804764,
  0.17162090152220877,
  -0.3046826723431984,
  0.6767952744094761
]

/** Upper-range Chebyshev coefficients for the modified Bessel function */
const upper = [
  -7.233180487874754e-18,
  -4.830504485944182e-18,
  4.46562142029676e-17,
  3.461222867697461e-17,
  -2.8276239805165836e-16,
  -3.425485619677219e-16,
  1.7725601330565263e-15,
  3.8116806693526224e-15,
  -9.554846698828307e-15,
  -4.150569347287222e-14,
  1.54008621752141e-14,
  3.8527783827421426e-13,
  7.180124451383666e-13,
  -1.7941785315068062e-12,
  -1.3215811840447713e-11,
  -3.1499165279632416e-11,
  1.1889147107846439e-11,
  4.94060238822497e-10,
  3.3962320257083865e-09,
  2.266668990498178e-08,
  2.0489185894690638e-07,
  2.8913705208347567e-06,
  6.889758346916825e-05,
  0.0033691164782556943,
  0.8044904110141088
]

/**
 * Build a Kaiser window.
 * @description Generates a window shaped by a Bessel function.
 * @param length - Window length or lengths to produce
 * @param shape - Shape parameter of the Bessel function
 * @returns Kaiser window values matching the input shape
 */
export default function kaiser(
  length: number | number[] | number[][],
  shape: number | 'i0' = 14
): number | number[] | number[][] {
  if (Array.isArray(length)) {
    return Internal.unary(length, (scalar) => kaiser(scalar, 'i0') as number)
  }
  if (shape === 'i0') {
    const magnitude = Math.abs(length)
    const coeffs = magnitude <= 8.0 ? lower : upper
    const factor = magnitude <= 8.0 ? magnitude / 2.0 - 2.0 : 32.0 / magnitude - 2.0
    let first = coeffs[0] ?? 0
    let prior = 0
    let older = 0
    for (let index = 1; index < coeffs.length; index++) {
      older = prior
      prior = first
      first = factor * prior - older + (coeffs[index] ?? 0)
    }
    const evaluated = Math.exp(magnitude) * 0.5 * (first - older)
    return magnitude <= 8.0 ? evaluated : evaluated / Math.sqrt(magnitude)
  }
  return Internal.taper(length, (index, final) => {
    const radius = 1 - ((2 * index) / final - 1) ** 2
    return (kaiser(shape * Math.sqrt(radius > 0 ? radius : 0), 'i0') as number) /
      (kaiser(shape, 'i0') as number)
  })
}
