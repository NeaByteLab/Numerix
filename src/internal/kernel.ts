/** Width of a register tile */
const stride = 4

/**
 * Pair lanes into a normal matrix.
 * @description Computes the outer products of the lanes.
 * @param lanes - Columns of the source matrix
 * @param count - Number of lanes to pair
 * @param samples - Number of rows of every lane
 * @returns Normal matrix of the given lanes
 */
export default function kernel(
  lanes: Float64Array[],
  count: number,
  samples: number
): number[][] {
  const normal = Array.from({ length: count }, () => new Array<number>(count).fill(0))
  if (count === 0 || samples === 0) {
    return normal
  }
  const entries = new Float64Array(stride * stride)
  for (let column = 0; column < count; column += stride) {
    const horizontal = Math.min(stride, count - column)
    for (let outer = column; outer < count; outer += stride) {
      const vertical = Math.min(stride, count - outer)
      entries.fill(0)
      for (let sample = 0; sample < samples; sample++) {
        for (let offset = 0; offset < vertical; offset++) {
          const origin = offset * stride
          const leading = lanes[outer + offset]?.[sample] ?? 0
          for (let other = 0; other < horizontal; other++) {
            entries[origin + other] = (entries[origin + other] ?? 0) +
              leading * (lanes[column + other]?.[sample] ?? 0)
          }
        }
      }
      for (let offset = 0; offset < vertical; offset++) {
        const origin = offset * stride
        for (let other = 0; other < horizontal; other++) {
          const value = entries[origin + other] ?? 0
          normal[outer + offset]![column + other] = value
          normal[column + other]![outer + offset] = value
        }
      }
    }
  }
  return normal
}
