/**
 * Convolve a signal with a kernel.
 * @description Computes discrete convolution over the signal entries.
 * @param signal - Input signal samples to convolve
 * @param kernel - Kernel weights applied across the signal
 * @param mode - Output length mode for the convolution
 * @returns Convolved signal values
 */
export default function convolve(
  signal: number[],
  kernel: number[],
  mode: 'full' | 'same' | 'valid' = 'full'
): number[] {
  const signalLength = signal.length
  const kernelLength = kernel.length
  if (signalLength === 0 || kernelLength === 0) {
    return []
  }
  const total = signalLength + kernelLength - 1
  let start = 0
  let length = total
  if (mode === 'valid') {
    start = (signalLength < kernelLength ? signalLength : kernelLength) - 1
    length = (signalLength > kernelLength ? signalLength : kernelLength) - start
  } else if (mode === 'same') {
    length = signalLength > kernelLength ? signalLength : kernelLength
    start = (total - length) >> 1
  }
  const source = Float64Array.from(signal)
  const weights = Float64Array.from(kernel)
  const result = new Array<number>(length)
  for (let index = 0; index < length; index++) {
    const position = start + index
    const begin = position >= signalLength ? position - signalLength + 1 : 0
    const end = position < kernelLength - 1 ? position : kernelLength - 1
    let sum = 0
    for (let offset = end; offset >= begin; offset--) {
      sum += (source[position - offset] ?? 0) * (weights[offset] ?? 0)
    }
    result[index] = sum
  }
  return result
}
