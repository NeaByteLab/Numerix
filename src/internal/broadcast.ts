/**
 * Apply a binary function to operands.
 * @description Combines operands element-wise with broadcast.
 * @template Output - Result element type
 * @param first - Left operand as a scalar, vector, or matrix
 * @param second - Right operand as a scalar, vector, or matrix
 * @param apply - Scalar function applied to each element pair
 * @param identity - Value substituted when an operand has no matching entry
 * @returns Result with the broadcast shape of the operands
 */
export default function broadcast<Output>(
  first: unknown,
  second: unknown,
  apply: (leading: number, trailing: number) => Output,
  identity = 0
): Output | Output[] | Output[][] {
  const lefts = Array.isArray(first)
  const rights = Array.isArray(second)
  if (!lefts && !rights) {
    return apply(
      (first === undefined
        ? identity
        : typeof first === 'boolean'
        ? Number(first)
        : first) as number,
      (
        second === undefined ? identity : typeof second === 'boolean' ? Number(second) : second
      ) as number
    )
  }
  const alpha = lefts ? (first as unknown[]).length : 0
  const omega = rights ? (second as unknown[]).length : 0
  const deepen = lefts && Array.isArray((first as unknown[])[0])
  const broaden = rights && Array.isArray((second as unknown[])[0])
  if (deepen && !broaden) {
    return (first as unknown[][]).map((entry) =>
      broadcast(entry, second, apply, identity) as Output
    )
  }
  if (!deepen && broaden) {
    return (second as unknown[][]).map((entry) =>
      broadcast(alpha === 1 ? (first as unknown[])[0] : first, entry, apply, identity) as Output
    )
  }
  if (lefts && rights && alpha !== omega && alpha !== 1 && omega !== 1) {
    throw new RangeError('operands could not be broadcast together')
  }
  return Array.from(
    {
      length: lefts && rights
        ? omega === 1 ? alpha : alpha === 1 ? omega : alpha
        : lefts
        ? alpha
        : omega
    },
    (_outer, index) =>
      broadcast(
        lefts ? (alpha === 1 ? (first as unknown[])[0] : (first as unknown[])[index]) : first,
        rights ? (omega === 1 ? (second as unknown[])[0] : (second as unknown[])[index]) : second,
        apply,
        identity
      )
  ) as Output[] | Output[][]
}
