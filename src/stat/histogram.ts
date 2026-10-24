import type * as Types from '@app/types.ts'

/**
 * Compute histogram bin edges.
 * @description Derives evenly spaced edges from the sample range.
 * @param samples - Values covered by the histogram
 * @param bins - Number of bins to create
 * @param range - Explicit value range covered by the bins
 * @returns Bin boundary positions
 */
function computeEdges(samples: number[], bins: number, range?: [number, number]): number[] {
  let low: number
  let high: number
  if (range) {
    low = range[0]
    high = range[1]
  } else {
    low = Infinity
    high = -Infinity
    for (let index = 0; index < samples.length; index++) {
      const sample = samples[index] ?? 0
      if (sample < low) {
        low = sample
      }
      if (sample > high) {
        high = sample
      }
    }
    if (!Number.isFinite(low)) {
      low = 0
      high = 1
    }
  }
  const step = (high - low) / bins || 1
  const edges = new Array<number>(bins + 1)
  for (let index = 0; index <= bins; index++) {
    edges[index] = low + index * step
  }
  return edges
}

/**
 * Compute a histogram of values.
 * @description Counts values falling into each bin.
 * @param left - Values to distribute across the bins
 * @param bins - Number of bins or explicit bin edges
 * @param range - Value range covered by the bins
 * @returns Bin counts with edges or a two dimensional grid
 */
export default function histogram(
  left: number[],
  bins: number | number[] = 10,
  range?: [number, number] | number
): Types.NumerixHistogram | Types.NumerixGrid {
  if (Array.isArray(bins)) {
    const right = bins
    const count = typeof range === 'number' ? range : 10
    const xEdges = computeEdges(left, count)
    const yEdges = computeEdges(right, count)
    const xLow = xEdges[0] ?? 0
    const xHigh = xEdges[count] ?? 1
    const yLow = yEdges[0] ?? 0
    const yHigh = yEdges[count] ?? 1
    const xStep = (xHigh - xLow) / count || 1
    const yStep = (yHigh - yLow) / count || 1
    const counts = new Array<number[]>(count)
    for (let bin = 0; bin < count; bin++) {
      counts[bin] = new Array<number>(count).fill(0)
    }
    const length = Math.min(left.length, right.length)
    for (let index = 0; index < length; index++) {
      const xValue = left[index] ?? 0
      const yValue = right[index] ?? 0
      if (xValue < xLow || xValue > xHigh || yValue < yLow || yValue > yHigh) {
        continue
      }
      const xBin = xValue === xHigh
        ? count - 1
        : Math.min(count - 1, Math.floor((xValue - xLow) / xStep))
      const yBin = yValue === yHigh
        ? count - 1
        : Math.min(count - 1, Math.floor((yValue - yLow) / yStep))
      const row = counts[xBin]
      if (row) {
        row[yBin] = (row[yBin] ?? 0) + 1
      }
    }
    return { counts, xEdges, yEdges }
  }
  const count = bins
  const bounds = Array.isArray(range) ? range : undefined
  const edges = computeEdges(left, count, bounds)
  const low = edges[0] ?? 0
  const high = edges[count] ?? 1
  const step = (high - low) / count || 1
  const counts = new Array<number>(count).fill(0)
  for (let index = 0; index < left.length; index++) {
    const value = left[index] ?? 0
    if (value < low || value > high) {
      continue
    }
    const bin = value === high ? count - 1 : Math.min(count - 1, Math.floor((value - low) / step))
    counts[bin] = (counts[bin] ?? 0) + 1
  }
  return { counts, edges }
}
