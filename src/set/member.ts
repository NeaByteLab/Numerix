import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Test set membership for a scalar.
 * @description Reports whether the scalar belongs to the set.
 * @param element - Scalar value tested for membership
 * @param members - Values forming the set
 * @param invert - When true, reports non-membership instead
 * @param inverted - Optional fourth argument for the invert flag
 * @returns Membership flag for the tested value
 */
export default function member(
  element: number | Types.NumerixComplex,
  members:
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][],
  invert?: boolean,
  inverted?: boolean
): boolean
/**
 * Test set membership for a vector.
 * @description Reports whether each value belongs to the set.
 * @param element - Vector values tested for membership
 * @param members - Values forming the set
 * @param invert - When true, reports non-members instead
 * @param inverted - Optional fourth argument for the invert flag
 * @returns Membership flags for each tested value
 */
export default function member(
  element: number[] | Types.NumerixComplex[],
  members:
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][],
  invert?: boolean,
  inverted?: boolean
): boolean[]
/**
 * Test set membership for a matrix.
 * @description Reports whether each matrix entry belongs to the set.
 * @param element - Matrix values tested for membership
 * @param members - Values forming the set
 * @param invert - When true, reports non-members instead, or assumes unique inputs when a fourth argument is passed
 * @param inverted - Optional fourth argument for the invert flag
 * @returns Membership flags matching the matrix shape
 */
export default function member(
  element: number[][] | Types.NumerixComplex[][],
  members:
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][],
  invert?: boolean,
  inverted?: boolean
): boolean[][]
/**
 * Test set membership for each element.
 * @description Reports whether each value belongs to the set.
 * @param element - Values tested for membership
 * @param members - Values forming the set
 * @param invert - When true, reports non-members instead, or assumes unique inputs when a fourth argument is passed
 * @param inverted - Optional fourth argument for the invert flag
 * @returns Membership flags for each tested value
 */
export default function member(
  element:
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][],
  members:
    | number
    | number[]
    | number[][]
    | Types.NumerixComplex
    | Types.NumerixComplex[]
    | Types.NumerixComplex[][],
  invert: boolean = false,
  inverted?: boolean
): boolean | boolean[] | boolean[][] {
  const points = !Array.isArray(members)
    ? [members]
    : Array.isArray(members[0])
    ? Shape.flatten(members)
    : (members as unknown[])
  const negated = Boolean(inverted ?? invert)
  if (
    Internal.classify(element, true, true) !== true &&
    Internal.classify(points, true, true) !== true
  ) {
    const reals = new Set<number>()
    for (let index = 0; index < points.length; index++) {
      const value = Number(points[index] ?? 0)
      if (!Number.isNaN(value)) {
        reals.add(value === 0 ? 0 : value)
      }
    }
    return Internal.mapper<number | Types.NumerixComplex, boolean>(element, (entry) => {
      const value = Number(entry ?? 0)
      return (!Number.isNaN(value) && reals.has(value === 0 ? 0 : value)) !== negated
    })
  }
  const table = new Set<string>()
  for (let index = 0; index < points.length; index++) {
    const entry = points[index]
    const reals = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
    const imags = Internal.shape(entry) ? entry.im : 0
    if (!Number.isNaN(reals) && !Number.isNaN(imags)) {
      table.add(`${reals},${imags}`)
    }
  }
  return Internal.mapper<number | Types.NumerixComplex, boolean>(element, (entry) => {
    const reals = Internal.shape(entry) ? entry.re : Number(entry ?? 0)
    const imags = Internal.shape(entry) ? entry.im : 0
    return (
      !Number.isNaN(reals) && !Number.isNaN(imags) &&
      table.has(`${reals},${imags}`)
    ) !== negated
  })
}
