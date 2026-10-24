/**
 * Test set membership for each element.
 * @description Reports whether each value belongs to the set.
 * @param element - Values tested for membership
 * @param members - Values forming the set
 * @param invert - When true reports non-members instead
 * @returns Membership flags for each tested value
 */
export default function member(
  element: number[],
  members: number[],
  invert: boolean = false
): boolean[] {
  const set = new Set(members)
  const length = element.length
  const result = new Array<boolean>(length)
  if (invert) {
    for (let index = 0; index < length; index++) {
      result[index] = !set.has(element[index] as number)
    }
    return result
  }
  for (let index = 0; index < length; index++) {
    result[index] = set.has(element[index] as number)
  }
  return result
}
