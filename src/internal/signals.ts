import * as Shape from '@app/shape/index.ts'

/**
 * Collect the signals of a covariance.
 * @description Normalizes the requested signals into a row list.
 * @param values - First signal used in the calculation
 * @param partner - Second signal used in the calculation
 * @param layered - When true, treats each row as a variable
 * @returns Signals used in the calculation
 */
export default function signals(
  values: number[] | number[][],
  partner?: number[] | number[][],
  layered = true
): number[][] {
  if (Array.isArray(values[0]) && !layered && values[0].length === 0) {
    return []
  }
  const primary = Array.isArray(values[0])
    ? (layered ? (values as number[][]) : Shape.transpose(values as number[][]))
    : [values as number[]]
  if (partner !== undefined && Array.isArray(partner[0]) && !layered && partner[0].length === 0) {
    if (partner.length !== (primary[0]?.length ?? 0)) {
      throw new RangeError(
        'all the input array dimensions except for the concatenation axis must match exactly'
      )
    }
    return primary
  }
  const collected = !partner
    ? primary
    : Array.isArray(partner[0])
    ? primary.concat(layered ? (partner as number[][]) : Shape.transpose(partner as number[][]))
    : primary.concat([partner as number[]])
  for (let index = 0; index < collected.length; index++) {
    if ((collected[index]?.length ?? 0) !== (collected[0]?.length ?? 0)) {
      throw new RangeError(
        'all the input array dimensions except for the concatenation axis must match exactly'
      )
    }
  }
  return collected
}
