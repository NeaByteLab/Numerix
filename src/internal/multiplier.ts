import type * as Types from '@app/types.ts'

/**
 * Accumulator that multiplies entries.
 * @description Multiplies running and next values starting from one.
 */
export default {
  /** Multiplies the running and next values */
  combine: (running: number, value: number) => running * value,
  /** Starting identity value */
  identity: 1,
  /** Neutral fallback value */
  neutral: 1
} satisfies Types.NumerixReduce
