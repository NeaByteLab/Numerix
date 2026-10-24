/**
 * Draw a fixed count of samples.
 * @description Calls a draw callback once for every requested index.
 * @param size - Number of samples to produce
 * @param draw - Callback invoked with each draw index
 * @returns Array of sampled values
 */
export default function draw(
  size: number,
  draw: (index: number) => number
): number[] {
  const result = new Array<number>(size)
  for (let index = 0; index < size; index++) {
    result[index] = draw(index)
  }
  return result
}
