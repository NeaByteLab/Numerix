import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Convolve a signal with a kernel.
 * @description Computes discrete convolution over the signal entries.
 * @param signal - Input signal samples to convolve
 * @param kernel - Kernel weights applied across the signal
 * @param method - Output length method for the convolution
 * @returns Convolved signal values
 */
export default function convolve(
  signal: number | number[],
  kernel: number | number[],
  method?: 'full' | 'same' | 'valid'
): number[]
/**
 * Convolve a complex signal.
 * @description Computes discrete convolution over complex or real entries.
 * @param signal - Input signal samples to convolve
 * @param kernel - Kernel weights applied across the signal
 * @param method - Output length method for the convolution
 * @returns Convolved signal values
 */
export default function convolve(
  signal: number | number[] | Types.NumerixComplex | Types.NumerixComplex[],
  kernel: number | number[] | Types.NumerixComplex | Types.NumerixComplex[],
  method?: 'full' | 'same' | 'valid'
): number[] | Types.NumerixComplex[]
/**
 * Convolve a signal with a kernel.
 * @description Computes discrete convolution over the signal entries.
 * @param signal - Input signal samples to convolve
 * @param kernel - Kernel weights applied across the signal
 * @param method - Output length method for the convolution
 * @returns Convolved signal values
 */
export default function convolve(
  signal: number | number[] | Types.NumerixComplex | Types.NumerixComplex[],
  kernel: number | number[] | Types.NumerixComplex | Types.NumerixComplex[],
  method: 'full' | 'same' | 'valid' = 'full'
): number[] | Types.NumerixComplex[] {
  const samples = Array.isArray(signal) ? signal : [signal]
  const weights = Array.isArray(kernel) ? kernel : [kernel]
  const count = samples.length
  const width = weights.length
  if (count === 0 || width === 0) {
    throw new RangeError('signal and kernel cannot be empty')
  }
  if (method !== 'full' && method !== 'same' && method !== 'valid') {
    throw new RangeError("mode must be one of 'valid', 'same', or 'full'")
  }
  const extent = count + width - 1
  const smaller = Math.min(count, width)
  const larger = Math.max(count, width)
  const length = method === 'valid' ? larger - smaller + 1 : method === 'same' ? larger : extent
  const origin = method === 'valid' ? smaller - 1 : method === 'same' ? (extent - length) >> 1 : 0
  if (
    Internal.classify(samples, true, true) !== true &&
    Internal.classify(weights, true, true) !== true
  ) {
    return Array.from({ length }, (_outer, index) => {
      const position = origin + index
      let total = 0
      for (
        let offset = Math.min(position, width - 1);
        offset >= Math.max(0, position - count + 1);
        offset--
      ) {
        total += ((samples as number[])[position - offset] ?? 0) *
          ((weights as number[])[offset] ?? 0)
      }
      return total
    })
  }
  return Array.from({ length }, (_outer, index) => {
    const position = origin + index
    let reals = 0
    let imags = 0
    for (
      let offset = Math.min(position, width - 1);
      offset >= Math.max(0, position - count + 1);
      offset--
    ) {
      const first = samples[position - offset]
      const right = weights[offset]
      const alpha = Internal.shape(first) ? first.re : Number(first ?? 0)
      const gamma = Internal.shape(first) ? first.im : 0
      const omega = Internal.shape(right) ? right.re : Number(right ?? 0)
      const extra = Internal.shape(right) ? right.im : 0
      reals += alpha * omega - gamma * extra
      imags += alpha * extra + gamma * omega
    }
    return { re: reals, im: imags }
  })
}
