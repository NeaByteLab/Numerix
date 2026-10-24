import type * as Types from '@app/types.ts'
import beats from '@app/internal/beats.ts'

/**
 * Find the extreme in a structure.
 * @description Scans nested entries and records the winning position.
 * @param values - Nested entries to search
 * @param skip - Whether invalid entries are skipped
 * @param direction - Whether the smallest or largest entry wins
 * @param state - Running search state
 */
export default function allindex(
  values: unknown[],
  skip: boolean,
  direction: Types.NumerixDirection,
  state: Types.NumerixExtreme
): void {
  for (let index = 0; index < values.length; index++) {
    if (state.hitNan) {
      return
    }
    const entry = values[index]
    if (Array.isArray(entry)) {
      allindex(entry, skip, direction, state)
    } else {
      const value = Number(entry ?? 0)
      const position = state.position++
      if (Number.isNaN(value)) {
        if (!skip) {
          state.bestIndex = position
          state.hitNan = true
          return
        }
        continue
      }
      if (beats(value, state.best, direction)) {
        state.best = value
        state.bestIndex = position
      }
    }
  }
}
