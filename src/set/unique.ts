import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Extract distinct values from an array.
 * @description Collects sorted values without duplicates.
 * @param left - Values to deduplicate
 * @param counted - When true returns counts and index details
 * @returns Distinct values or details about each distinct value
 */
export default function unique(
  left: unknown[],
  counted: boolean = false
): number[] | Types.NumerixUnique {
  const flat = Array.isArray(left[0]) ? Shape.flatten<number>(left) : (left as number[])
  if (!counted) {
    const typed = Float64Array.from(flat)
    typed.sort()
    return Internal.distinct(typed)
  }
  const order = Internal.indices(flat)
  const count = order.length
  const sorted = new Array<number>()
  const counts = new Array<number>()
  const indices = new Array<number>()
  const rank = new Int32Array(count)
  let cursor = 0
  while (cursor < count) {
    const value = flat[order[cursor] ?? 0] ?? 0
    let end = cursor
    if (Number.isNaN(value)) {
      while (end + 1 < count && Number.isNaN(flat[order[end + 1] ?? 0] ?? 0)) {
        end++
      }
    } else {
      while (end + 1 < count && (flat[order[end + 1] ?? 0] ?? 0) === value) {
        end++
      }
    }
    const position = sorted.length
    sorted.push(value)
    counts.push(end - cursor + 1)
    indices.push(order[cursor] ?? 0)
    for (let step = cursor; step <= end; step++) {
      rank[order[step] ?? 0] = position
    }
    cursor = end + 1
  }
  const inverse = new Array<number>(count)
  for (let step = 0; step < count; step++) {
    inverse[step] = rank[step] ?? 0
  }
  return { values: sorted, counts, indices, inverse }
}
