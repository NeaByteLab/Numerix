/**
 * Build a Vandermonde matrix.
 * @description Places powers of each sample into a matrix.
 * @param samples - Sample points used as matrix rows
 * @param degree - Highest power included in each row
 * @param increasing - When true orders powers from lowest to highest
 * @returns Vandermonde matrix of the sample points
 */
export default function vander(
  samples: number[],
  degree = samples.length,
  increasing = false
): number[][] {
  const count = samples.length
  const result = new Array<number[]>(count)
  if (increasing) {
    for (let index = 0; index < count; index++) {
      const sample = samples[index] ?? 0
      const row = new Array<number>(degree)
      let factor = 1
      for (let power = 0; power < degree; power++) {
        row[power] = factor
        factor *= sample
      }
      result[index] = row
    }
    return result
  }
  for (let index = 0; index < count; index++) {
    const sample = samples[index] ?? 0
    const row = new Array<number>(degree)
    let factor = 1
    for (let power = degree - 1; power >= 0; power--) {
      row[power] = factor
      factor *= sample
    }
    result[index] = row
  }
  return result
}
