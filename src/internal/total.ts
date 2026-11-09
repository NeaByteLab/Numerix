import type * as Types from '@app/types.ts'
import shape from '@app/internal/shape.ts'

/**
 * Accumulate the sum and count.
 * @description Collects the total and entry count of nested values.
 * @param values - Values whose entries are accumulated
 * @param ignore - Whether invalid entries are skipped
 * @returns Running sum and count of the accumulated entries
 */
export default function total(
  values: unknown[],
  ignore: boolean
): Types.NumerixSum {
  const accumulator: Types.NumerixSum = { sum: 0, imags: 0, count: 0 }
  const queue: unknown[][] = [values]
  while (queue.length > 0) {
    const current = queue.pop()!
    for (let index = 0; index < current.length; index++) {
      const entry = current[index]
      if (Array.isArray(entry)) {
        queue.push(entry)
      } else if (typeof entry === 'number') {
        if (!ignore || !Number.isNaN(entry)) {
          accumulator.sum += entry
          accumulator.count++
        }
      } else {
        const reals = shape(entry) ? entry.re : Number(entry ?? 0)
        const imags = shape(entry) ? entry.im : 0
        if (ignore && (Number.isNaN(reals) || Number.isNaN(imags))) {
          continue
        }
        accumulator.sum += reals
        accumulator.imags += imags
        accumulator.count++
      }
    }
  }
  return accumulator
}
