/**
 * Run a mixed-radix transform.
 * @description Transforms a signal whose length factors into small radices.
 * @param values - Real components of the signal, overwritten with the spectrum
 * @param imaginary - Imaginary components of the signal, overwritten with the spectrum
 * @returns True when the length is supported
 */
export default function radix(
  values: Float64Array,
  imaginary: Float64Array
): boolean {
  const length = values.length
  if (length <= 1) {
    return true
  }
  if ((length & (length - 1)) === 0) {
    let cursor = 0
    for (let index = 0; index < length; index++) {
      if (index < cursor) {
        ;[values[index], values[cursor]] = [values[cursor] ?? 0, values[index] ?? 0]
        ;[imaginary[index], imaginary[cursor]] = [imaginary[cursor] ?? 0, imaginary[index] ?? 0]
      }
      let place = length >> 1
      while (place > 0 && (cursor & place) !== 0) {
        cursor ^= place
        place >>= 1
      }
      cursor |= place
    }
    for (let width = 2; width <= length; width <<= 1) {
      const middle = width >> 1
      for (let offset = 0; offset < middle; offset++) {
        const angle = ((-2 * Math.PI) / width) * offset
        const rotator = Math.cos(angle)
        const twister = Math.sin(angle)
        for (let start = offset; start < length; start += width) {
          const paired = start + middle
          const alpha = values[paired] ?? 0
          const omega = imaginary[paired] ?? 0
          const shifted = rotator * alpha - twister * omega
          const turned = rotator * omega + twister * alpha
          const prior = values[start] ?? 0
          const former = imaginary[start] ?? 0
          values[start] = prior + shifted
          imaginary[start] = former + turned
          values[paired] = prior - shifted
          imaginary[paired] = former - turned
        }
      }
    }
    return true
  }
  const factors: number[] = []
  let remainder = length
  for (const factor of [4, 2, 3, 5, 7, 11, 13]) {
    while (remainder % factor === 0) {
      factors.push(factor)
      remainder /= factor
    }
  }
  if (remainder > 1) {
    return false
  }
  let reals = Float64Array.from(values)
  let imags = Float64Array.from(imaginary)
  let outputs = new Float64Array(length)
  let phases = new Float64Array(length)
  const cosines = new Float64Array(13)
  const sines = new Float64Array(13)
  let stride = 1
  for (let stage = 0; stage < factors.length; stage++) {
    const factor = factors[stage] ?? 1
    const extent = stride * factor
    const groups = length / extent
    const pitch = groups * stride
    for (let index = 0; index < stride; index++) {
      for (let branch = 0; branch < factor; branch++) {
        const offset = branch * stride + index
        for (let outer = 0; outer < factor; outer++) {
          const angle = (-2 * Math.PI * outer * offset) / extent
          cosines[outer] = Math.cos(angle)
          sines[outer] = Math.sin(angle)
        }
        for (let group = 0; group < groups; group++) {
          let total = 0
          let tally = 0
          for (let outer = 0; outer < factor; outer++) {
            const alpha = cosines[outer] ?? 0
            const omega = sines[outer] ?? 0
            const source = group * stride + outer * pitch + index
            const point = reals[source] ?? 0
            const phase = imags[source] ?? 0
            total += point * alpha - phase * omega
            tally += point * omega + phase * alpha
          }
          const target = group * extent + offset
          outputs[target] = total
          phases[target] = tally
        }
      }
    }
    ;[reals, outputs] = [outputs, reals]
    ;[imags, phases] = [phases, imags]
    stride = extent
  }
  values.set(reals)
  imaginary.set(imags)
  return true
}
