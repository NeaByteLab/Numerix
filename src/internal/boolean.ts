import broadcast from '@app/internal/broadcast.ts'
import classify from '@app/internal/classify.ts'
import mapper from '@app/internal/mapper.ts'
import settle from '@app/internal/settle.ts'

/**
 * Combine operands with a logical operator.
 * @description Applies a logical operator element-wise with broadcast.
 * @param first - First operand as a scalar, vector, or matrix
 * @param second - Second operand as a scalar, vector, or matrix
 * @param combine - Logical operator applied to each element pair
 * @returns Logical results matching the broadcast shape
 */
export default function boolean(
  first: unknown,
  second: unknown,
  combine: (leading: boolean, trailing: boolean) => boolean
): boolean | boolean[] | boolean[][] {
  if (
    (typeof second === 'boolean' || typeof second === 'number') &&
    classify(first, true, true) === false
  ) {
    const trailing = typeof second === 'boolean' ? second : second !== 0
    return mapper(
      first as (boolean | number) | (boolean | number)[] | (boolean | number)[][],
      (entry) => combine(typeof entry === 'boolean' ? entry : entry !== 0, trailing)
    )
  }
  if (
    (typeof first === 'boolean' || typeof first === 'number') &&
    classify(second, true, true) === false
  ) {
    const leading = typeof first === 'boolean' ? first : first !== 0
    return mapper(
      second as (boolean | number) | (boolean | number)[] | (boolean | number)[][],
      (entry) => combine(leading, typeof entry === 'boolean' ? entry : entry !== 0)
    )
  }
  return broadcast(
    first,
    second,
    (leading, trailing) => combine(settle('any', leading), settle('any', trailing))
  )
}
