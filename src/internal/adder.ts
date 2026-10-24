import type * as Types from '@app/types.ts'

/** Accumulator that adds entries. */
export default {
  combine: (running: number, value: number) => running + value,
  identity: 0,
  neutral: 0
} satisfies Types.NumerixReduce
