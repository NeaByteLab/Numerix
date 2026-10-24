import type * as Types from '@app/types.ts'

/** Accumulator that multiplies entries. */
export default {
  combine: (running: number, value: number) => running * value,
  identity: 1,
  neutral: 1
} satisfies Types.NumerixReduce
