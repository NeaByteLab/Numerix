/** Width of a register tile */
const tileWidth = 4

/**
 * Pair lanes into a normal matrix.
 * @description Computes the outer products of the lanes.
 * @param lanes - Columns of the source matrix
 * @param count - Number of lanes to pair
 * @param samples - Number of rows of every lane
 * @returns Normal matrix of the given lanes
 */
export default function kernel(
  lanes: Float64Array[],
  count: number,
  samples: number
): number[][] {
  const normal = new Array<number[]>(count)
  for (let index = 0; index < count; index++) {
    normal[index] = new Array<number>(count)
  }
  if (count === 0 || samples === 0) {
    return normal
  }
  const padded = lanes.slice()
  while (padded.length % tileWidth !== 0) {
    padded.push(new Float64Array(samples))
  }
  for (let column = 0; column < count; column += tileWidth) {
    const columns = Math.min(tileWidth, count - column)
    const peers: Float64Array[] = [
      padded[column] as Float64Array,
      padded[column + 1] as Float64Array,
      padded[column + 2] as Float64Array,
      padded[column + 3] as Float64Array
    ]
    for (let row = column; row < count; row += tileWidth) {
      const rows = Math.min(tileWidth, count - row)
      const block: Float64Array[] = [
        padded[row] as Float64Array,
        padded[row + 1] as Float64Array,
        padded[row + 2] as Float64Array,
        padded[row + 3] as Float64Array
      ]
      const entries: number[][] = []
      for (let lane = 0; lane < tileWidth; lane++) {
        entries.push(new Array<number>(tileWidth).fill(0))
      }
      for (let sample = 0; sample < samples; sample++) {
        for (let lane = 0; lane < tileWidth; lane++) {
          const point = block[lane]?.[sample] ?? 0
          for (let peer = 0; peer < tileWidth; peer++) {
            const partner = peers[peer]?.[sample] ?? 0
            const line = entries[lane]
            if (line) {
              line[peer] = (line[peer] ?? 0) + point * partner
            }
          }
        }
      }
      for (let lane = 0; lane < rows; lane++) {
        const target = normal[row + lane] as number[]
        for (let peer = 0; peer < columns; peer++) {
          const value = entries[lane]?.[peer] ?? 0
          target[column + peer] = value
          const mirrored = normal[column + peer] as number[]
          mirrored[row + lane] = value
        }
      }
    }
  }
  return normal
}
