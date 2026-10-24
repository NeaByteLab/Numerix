/**
 * Assign values to bin indices.
 * @description Reports which bin each value falls into.
 * @param values - Values assigned to bin indices
 * @param bins - Bin boundary positions
 * @param right - When true treats bins as right closed
 * @returns Bin index for each value
 */
export default function digitize(
  values: number[],
  bins: number[],
  right: boolean = false
): number[] {
  const length = values.length
  const count = bins.length
  const result = new Array<number>(length)
  if (count === 0) {
    return result.fill(0)
  }
  const increasing = count < 2 || (bins[count - 1] ?? 0) >= (bins[0] ?? 0)
  if (increasing) {
    if (right) {
      for (let index = 0; index < length; index++) {
        const value = values[index] ?? 0
        let low = 0
        let high = count
        while (low < high) {
          const middle = (low + high) >> 1
          if ((bins[middle] ?? 0) < value) {
            low = middle + 1
          } else {
            high = middle
          }
        }
        result[index] = low
      }
      return result
    }
    for (let index = 0; index < length; index++) {
      const value = values[index] ?? 0
      let low = 0
      let high = count
      while (low < high) {
        const middle = (low + high) >> 1
        if ((bins[middle] ?? 0) <= value) {
          low = middle + 1
        } else {
          high = middle
        }
      }
      result[index] = low
    }
    return result
  }
  if (right) {
    for (let index = 0; index < length; index++) {
      const value = values[index] ?? 0
      let low = 0
      let high = count
      while (low < high) {
        const middle = (low + high) >> 1
        if (value <= (bins[middle] ?? 0)) {
          low = middle + 1
        } else {
          high = middle
        }
      }
      result[index] = low
    }
    return result
  }
  for (let index = 0; index < length; index++) {
    const value = values[index] ?? 0
    let low = 0
    let high = count
    while (low < high) {
      const middle = (low + high) >> 1
      if (value < (bins[middle] ?? 0)) {
        low = middle + 1
      } else {
        high = middle
      }
    }
    result[index] = low
  }
  return result
}
