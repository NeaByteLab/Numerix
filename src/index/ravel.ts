/** Out-of-bounds coordinate handling mode */
type RavelMode = 'raise' | 'wrap' | 'clip'

/**
 * Convert coordinates to a flat index.
 * @description Computes flat offsets for one or more coordinates.
 * @param coordinates - Position along each axis
 * @param dimensions - Length of each axis
 * @param policy - Out-of-bounds handling mode or memory layout order
 * @param order - Memory layout order or out-of-bounds handling mode
 * @returns Flat index of the given coordinates
 */
export default function ravel(
  coordinates: number[],
  dimensions: number[],
  policy?: RavelMode | RavelMode[] | 'C' | 'F',
  order?: 'C' | 'F' | RavelMode | RavelMode[]
): number
/**
 * Convert coordinates to flat indices.
 * @description Computes row-major or column-major offsets for per-axis coordinate arrays.
 * @param coordinates - Per-axis positions along each axis
 * @param dimensions - Length of each axis
 * @param policy - Out-of-bounds handling mode or memory layout order
 * @param order - Memory layout order or out-of-bounds handling mode
 * @returns Array of flat indices
 */
export default function ravel(
  coordinates: number[][],
  dimensions: number[],
  policy?: RavelMode | RavelMode[] | 'C' | 'F',
  order?: 'C' | 'F' | RavelMode | RavelMode[]
): number[]
/**
 * Convert two-dimensional coordinates to flat indices.
 * @description Computes flat offsets for two-dimensional per-axis coordinate grids.
 * @param coordinates - Two-dimensional per-axis positions along each axis
 * @param dimensions - Length of each axis
 * @param policy - Out-of-bounds handling mode or memory layout order
 * @param order - Memory layout order or out-of-bounds handling mode
 * @returns Two-dimensional matrix of flat indices
 */
export default function ravel(
  coordinates: number[][][],
  dimensions: number[],
  policy?: RavelMode | RavelMode[] | 'C' | 'F',
  order?: 'C' | 'F' | RavelMode | RavelMode[]
): number[][]
/**
 * Convert coordinates to a flat index.
 * @description Computes flat offsets for one or more coordinates.
 * @param coordinates - Position or per-axis positions along each axis
 * @param dimensions - Length of each axis
 * @param policy - Out-of-bounds handling mode or memory layout order
 * @param order - Memory layout order or out-of-bounds handling mode
 * @returns Flat index or array of flat indices
 */
export default function ravel(
  coordinates: number[] | number[][] | number[][][],
  dimensions: number[],
  policy: RavelMode | RavelMode[] | 'C' | 'F' = 'raise',
  order: 'C' | 'F' | RavelMode | RavelMode[] = 'C'
): number | number[] | number[][] {
  const clipping = Array.isArray(policy) || policy === 'raise' || policy === 'wrap' ||
    policy === 'clip'
  const swapped = Array.isArray(order) || order === 'raise' || order === 'wrap' || order === 'clip'
  const layout = policy === 'C' || policy === 'F'
  const ordered = order === 'C' || order === 'F'
  if (!clipping && !layout) {
    throw new RangeError("clipmode must be one of 'clip', 'raise', or 'wrap'")
  }
  if (!ordered && !swapped) {
    throw new RangeError("order must be one of 'C' or 'F'")
  }
  const bounds: RavelMode | RavelMode[] = clipping ? policy : swapped ? order : 'raise'
  if (Array.isArray(bounds)) {
    if (bounds.length !== dimensions.length) {
      throw new RangeError(
        `list of clipmodes has wrong length (${bounds.length} instead of ${dimensions.length})`
      )
    }
    for (let index = 0; index < bounds.length; index++) {
      const current = bounds[index]
      if (current !== 'raise' && current !== 'wrap' && current !== 'clip') {
        throw new RangeError("clipmode must be one of 'clip', 'raise', or 'wrap'")
      }
    }
  }
  if (coordinates.length !== dimensions.length) {
    throw new RangeError('coordinates and dimensions must have the same length')
  }
  const memory: 'C' | 'F' = layout ? policy : ordered ? order : 'C'
  if (!Array.isArray(coordinates[0])) {
    let index = 0
    let stride = 1
    for (
      let level = memory === 'F' ? 0 : dimensions.length - 1;
      memory === 'F' ? level < dimensions.length : level >= 0;
      level += memory === 'F' ? 1 : -1
    ) {
      const coord = (coordinates as number[])[level] ?? 0
      const extent = dimensions[level] ?? 1
      const chosen: RavelMode = Array.isArray(bounds) ? (bounds[level] ?? 'raise') : bounds
      if (
        !Number.isInteger(coord) ||
        extent <= 0 ||
        (chosen === 'raise' && (coord < 0 || coord >= extent))
      ) {
        throw new RangeError('invalid entry in coordinates array')
      }
      index += (chosen === 'wrap'
        ? ((coord % extent) + extent) % extent
        : chosen === 'clip'
        ? (coord < 0 ? 0 : coord >= extent ? extent - 1 : coord)
        : coord) * stride
      stride *= extent
    }
    return index
  }
  const vector = !Array.isArray((coordinates[0] as unknown[])[0])
  const grids: number[][][] = vector
    ? (coordinates as number[][]).map((stack) => [stack])
    : (coordinates as number[][][])
  let height = 1
  let width = 1
  for (let level = 0; level < dimensions.length; level++) {
    const table = grids[level] ?? []
    if (height !== 1 && table.length !== 1 && table.length !== height) {
      throw new RangeError('operands could not be broadcast together')
    }
    if (height === 1) {
      height = table.length
    }
    for (let outer = 0; outer < table.length; outer++) {
      const extent = table[outer]?.length ?? 0
      if (width !== 1 && extent !== 1 && extent !== width) {
        throw new RangeError('operands could not be broadcast together')
      }
      if (width === 1) {
        width = extent
      }
    }
  }
  const matrix = Array.from(
    { length: height },
    (_outer, outer) =>
      Array.from({ length: width }, (_inner, column) => {
        let index = 0
        let stride = 1
        for (
          let level = memory === 'F' ? 0 : dimensions.length - 1;
          memory === 'F' ? level < dimensions.length : level >= 0;
          level += memory === 'F' ? 1 : -1
        ) {
          const table = grids[level] ?? []
          const entry = table[table.length === 1 ? 0 : outer] ?? []
          const coord = entry[entry.length === 1 ? 0 : column] ?? 0
          const extent = dimensions[level] ?? 1
          const chosen: RavelMode = Array.isArray(bounds) ? (bounds[level] ?? 'raise') : bounds
          if (
            !Number.isInteger(coord) ||
            extent <= 0 ||
            (chosen === 'raise' && (coord < 0 || coord >= extent))
          ) {
            throw new RangeError('invalid entry in coordinates array')
          }
          index += (chosen === 'wrap'
            ? ((coord % extent) + extent) % extent
            : chosen === 'clip'
            ? (coord < 0 ? 0 : coord >= extent ? extent - 1 : coord)
            : coord) * stride
          stride *= extent
        }
        return index
      })
  )
  return vector ? (matrix[0] ?? []) : matrix
}
