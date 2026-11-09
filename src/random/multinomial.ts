import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Draw samples from a multinomial distribution.
 * @description Produces counts across several outcome categories.
 * @param trials - Number of independent trials to distribute
 * @param probabilities - Outcome probability for each category
 * @param amount - Sample count or generator supplying uniform samples
 * @param generator - Generator supplying uniform samples
 * @returns Count of outcomes in each category
 */
export default function multinomial(
  trials: number,
  probabilities: number[],
  amount?: number | Types.NumerixGenerator,
  generator?: Types.NumerixGenerator
): number[] | number[][] {
  if (trials < 0 || !Number.isFinite(trials)) {
    throw new RangeError('n < 0')
  }
  const steps = Math.trunc(trials)
  let running = 0
  const cumulative = probabilities.map((entry) => {
    const chance = entry ?? 0
    if (chance < 0 || chance > 1 || Number.isNaN(chance)) {
      throw new RangeError('pvals < 0, pvals > 1 or pvals contains NaNs')
    }
    running += chance
    return running
  })
  if (probabilities.length > 1 && (cumulative[probabilities.length - 2] ?? 0) > 1 + 1e-12) {
    throw new RangeError('sum of probabilities excluding the last entry exceeds 1.0')
  }
  const source = typeof amount === 'object' ? amount : generator
  return Internal.draw(typeof amount === 'number' ? amount : undefined, () => {
    const counts = new Array<number>(probabilities.length).fill(0)
    if (probabilities.length === 0 || steps === 0) {
      return counts
    }
    for (let trial = 0; trial < steps; trial++) {
      const sample = Internal.source(source)
      let lower = 0
      let upper = probabilities.length - 1
      while (lower < upper) {
        const middle = (lower + upper) >> 1
        if ((cumulative[middle] ?? 0) <= sample) {
          lower = middle + 1
        } else {
          upper = middle
        }
      }
      counts[lower] = (counts[lower] ?? 0) + 1
    }
    return counts
  })
}
