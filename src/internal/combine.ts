/**
 * Combine two coefficient arrays.
 * @description Aligns the coefficients, then applies the operation.
 * @param left - Coefficients of the first polynomial
 * @param right - Coefficients of the second polynomial
 * @param sign - One to add the coefficients, minus one to subtract them
 * @returns Coefficients of the combined polynomial
 */
export default function combine(
  left: number[],
  right: number[] | number,
  sign: 1 | -1
): number[] {
  const operand = typeof right === 'number' ? [right] : right
  const length = Math.max(left.length, operand.length)
  const result = new Array<number>(length)
  for (let index = 0; index < length; index++) {
    const first = left[index] ?? 0
    const second = operand[index] ?? 0
    result[index] = sign === 1 ? first + second : first - second
  }
  while (result.length > 1 && result[result.length - 1] === 0) {
    result.pop()
  }
  return result.length === 0 ? [0] : result
}
