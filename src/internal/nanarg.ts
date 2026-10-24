/**
 * Resolve the overloaded nanarg argument.
 * @description Reads a boolean as skip, a number as axis.
 * @param nanarg - Boolean skip flag or numeric axis, absent when a peer list is supplied
 * @param axis - Axis used when the nanarg argument carries no axis
 * @param fallback - Skip flag or axis used when the nanarg argument carries neither
 * @returns Skip flag and resolved axis
 */
export default function nanarg(
  nanarg: boolean | number | undefined,
  axis?: number,
  fallback?: boolean | number
): { skip: boolean; target: number | undefined } {
  const spare = typeof fallback === 'boolean' ? fallback : false
  const fallbackAxis = typeof fallback === 'number' ? fallback : axis
  return {
    skip: typeof nanarg === 'boolean' ? nanarg : spare,
    target: typeof nanarg === 'number' ? nanarg : fallbackAxis
  }
}
