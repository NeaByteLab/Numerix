/**
 * Extract sliding windows from an array.
 * @description Collects overlapping windows of the given length.
 * @param input - Array the windows are taken from
 * @param window - Number of entries in each window
 * @param step - Distance between consecutive windows
 * @returns Array of extracted windows
 * @template T - Type of the array values
 */
export default function slide<T = number>(
  input: T[],
  window: number,
  step = 1
): T[][] {
  const length = input.length
  if (window <= 0 || window > length || step <= 0) {
    return []
  }
  const count = Math.floor((length - window) / step) + 1
  const windows = new Array<T[]>(count)
  for (let index = 0; index < count; index++) {
    const start = index * step
    windows[index] = input.slice(start, start + window)
  }
  return windows
}
