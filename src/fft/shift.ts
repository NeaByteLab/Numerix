import * as Dtype from '@app/dtype/index.ts'
import * as Shape from '@app/shape/index.ts'

/**
 * Shift the order of spectral bins.
 * @description Moves the zero-frequency bin to the array edge.
 * @template T - Type of the spectral values
 * @param values - Spectral values to reorder
 * @param inverse - When true, reverses the shift direction, or specifies the axis when a number or array is passed
 * @param level - Optional axis or axes along which to shift a two-dimensional spectrum
 * @returns Reordered spectral values
 */
export default function shift<T>(
  values: T[],
  inverse?: boolean | number | number[],
  level?: number | number[] | boolean
): T[] {
  const target = typeof inverse !== 'boolean' && inverse !== undefined
    ? inverse
    : typeof level !== 'boolean'
    ? level
    : undefined
  const dimensions = Dtype.info(values).shape
  const planes = target === undefined
    ? dimensions.map((_unused, index) => index)
    : Array.isArray(target)
    ? target
    : [target]
  return Shape.roll(
    values,
    planes.map((plane) => {
      const resolved = plane < 0 ? dimensions.length + plane : plane
      if (resolved < 0 || resolved >= dimensions.length) {
        throw new RangeError(
          `axis is out of bounds for array of dimension ${dimensions.length}`
        )
      }
      const extent = dimensions[resolved] ?? 0
      return (
          typeof inverse === 'boolean' ? inverse : typeof level === 'boolean' ? level : false
        )
        ? -(extent >> 1)
        : (extent >> 1)
    }),
    planes
  )
}
