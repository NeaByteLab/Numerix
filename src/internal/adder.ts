import type * as Types from '@app/types.ts'

/**
 * Accumulator that adds entries.
 * @description Sums running and next values starting from zero.
 */
export default {
  /** Sums the running and next values */
  combine: (running: number, value: number) => running + value,
  /** Starting identity value */
  identity: 0,
  /** Neutral fallback value */
  neutral: 0
} satisfies Types.NumerixReduce
