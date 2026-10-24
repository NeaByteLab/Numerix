import type * as Types from '@app/types.ts'
import * as Internal from '@app/internal/index.ts'
import forward from '@app/fft/forward.ts'

/**
 * Transform a real signal.
 * @description Produces the positive bins of a real signal.
 * @param values - Real signal samples to transform
 * @param axis - Axes along which the transform runs, or 'all' for every axis
 * @returns Complex spectrum of the transformed signal
 */
export default function rfft(
  values: number[] | number[][],
  axis?: Types.NumerixAxis
): Types.NumerixComplex[] | Types.NumerixComplex[][] {
  if (Array.isArray(values[0])) {
    const grid = values as number[][]
    const width = grid[0]?.length ?? 0
    const half = (width >> 1) + 1
    const transform = (row: (Types.NumerixComplex | number)[]) =>
      (forward(row) as Types.NumerixComplex[]).slice(0, half)
    const direction = Internal.axes(axis)
    if (direction === 'all') {
      return Internal.matrix(
        grid,
        transform,
        (column) => forward(column) as Types.NumerixComplex[],
        half
      )
    }
    if (direction === 'columns') {
      const height = grid.length
      const bins = (height >> 1) + 1
      const result = new Array<Types.NumerixComplex[]>(bins)
      for (let index = 0; index < bins; index++) {
        result[index] = new Array<Types.NumerixComplex>(width)
      }
      const buffer = new Array<number>(height)
      for (let column = 0; column < width; column++) {
        for (let row = 0; row < height; row++) {
          buffer[row] = grid[row]?.[column] ?? 0
        }
        const line = forward(buffer) as Types.NumerixComplex[]
        for (let index = 0; index < bins; index++) {
          const target = result[index]
          if (target) {
            target[column] = line[index] ?? { re: 0, im: 0 }
          }
        }
      }
      return result
    }
    return Internal.rows(grid, transform)
  }
  const flattened = values as number[]
  const count = flattened.length
  if (count === 0) {
    return []
  }
  const complete = forward(flattened) as Types.NumerixComplex[]
  return complete.slice(0, (count >> 1) + 1)
}
