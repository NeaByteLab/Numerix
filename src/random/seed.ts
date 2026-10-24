import type * as Types from '@app/types.ts'

/**
 * Create a seeded random generator.
 * @description Builds a deterministic generator from an integer seed.
 * @param value - Seed value controlling the generated sequence
 * @returns Generator producing a repeatable sample sequence
 */
export default function seed(value: number = Date.now()): Types.NumerixGenerator {
  let state = (value >>> 0) || 1
  const next = (): number => {
    state ^= state << 13
    state ^= state >>> 17
    state ^= state << 5
    return (state >>> 0) / 4294967296
  }
  return {
    next,
    spawn: (): Types.NumerixGenerator => seed(Math.floor(next() * 0xffffffff))
  }
}
