/**
 * Draw a fixed count of samples.
 * @description Calls a draw callback once or for every requested index.
 * @template Output - Type of each sampled value
 * @param count - Number of samples to produce when given
 * @param sample - Callback invoked with each draw index
 * @returns Single sample or array of sampled values
 */
export default function draw<Output = number>(
  count: number | undefined,
  sample: (index: number) => Output
): Output | Output[] {
  return count === undefined
    ? sample(0)
    : Array.from({ length: count }, (_outer, index) => sample(index))
}
