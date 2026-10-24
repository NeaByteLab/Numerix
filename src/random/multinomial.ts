import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a multinomial distribution.
 * @description Produces counts across several outcome categories.
 * @param trials - Number of independent trials to distribute
 * @param probabilities - Outcome probability for each category
 * @param generator - Generator supplying uniform samples
 * @returns Count of outcomes in each category
 */
export default function multinomial(
  trials: number,
  probabilities: number[],
  generator?: Types.NumerixGenerator
): number[] {
  const count = probabilities.length
  const counts = new Array<number>(count).fill(0)
  if (count === 0 || trials <= 0) {
    return counts
  }
  const cdf = new Float64Array(count)
  let running = 0
  for (let index = 0; index < count; index++) {
    running += probabilities[index] ?? 0
    cdf[index] = running
  }
  const last = count - 1
  for (let trial = 0; trial < trials; trial++) {
    const sample = Internal.source(generator)
    let low = 0
    let high = last
    while (low < high) {
      const middle = (low + high) >> 1
      if ((cdf[middle] ?? 0) < sample) {
        low = middle + 1
      } else {
        high = middle
      }
    }
    counts[low] = (counts[low] ?? 0) + 1
  }
  return counts
}
