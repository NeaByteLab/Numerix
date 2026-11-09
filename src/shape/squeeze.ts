import * as Dtype from '@app/dtype/index.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Remove unit dimensions from an array.
 * @description Drops array levels that hold a single entry.
 * @param input - Value or nested array to squeeze
 * @param chosen - Optional axis or list of axes to squeeze
 * @returns Value without its unit dimensions
 */
export default function squeeze(input: unknown, chosen?: number | number[] | null): unknown {
  if (!Array.isArray(input)) {
    return Internal.shape(input) ? Internal.nested(input) : input
  }
  if (chosen !== undefined && chosen !== null) {
    const shape = Dtype.info(input).shape
    const items = Array.isArray(chosen) ? chosen : [chosen]
    const targets = new Set<number>()
    const remaining: number[] = []
    for (let index = 0; index < items.length; index++) {
      const entry = items[index] ?? 0
      const resolved = entry < 0 ? shape.length + entry : entry
      if (resolved < 0 || resolved >= shape.length) {
        throw new RangeError('axis out of bounds')
      }
      if (targets.has(resolved)) {
        throw new RangeError("duplicate value in 'axis'")
      }
      if (shape[resolved] !== 1) {
        throw new RangeError('cannot select an axis to squeeze out which has size not equal to one')
      }
      targets.add(resolved)
      if (resolved > 0) {
        remaining.push(resolved - 1)
      }
    }
    const collapsed = targets.has(0)
      ? squeeze(input[0], remaining)
      : remaining.length > 0
      ? input.map((entry) => squeeze(entry, remaining))
      : input.map((entry) => (Array.isArray(entry) ? entry.slice() : entry))
    return Internal.classify(input, true, true) === true ? Internal.nested(collapsed) : collapsed
  }
  const result = input.length === 1 ? squeeze(input[0]) : input.map((entry) => squeeze(entry))
  return Internal.classify(input, true, true) === true ? Internal.nested(result) : result
}
