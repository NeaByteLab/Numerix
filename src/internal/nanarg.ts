/**
 * Resolve the overloaded extreme-index arguments.
 * @description Reads a boolean as the skip flag and a number as the axis.
 * @param argument - Boolean skip flag or numeric axis, absent when a peer list is supplied
 * @param level - Axis used when the first argument carries no axis
 * @param fallback - Skip flag or axis used when the first argument carries neither
 * @returns Skip flag and resolved axis
 */
export default function nanarg(
  argument: boolean | number | undefined,
  level?: number | boolean,
  fallback?: boolean | number
): { skip: boolean; target: number | undefined } {
  return {
    skip: argument === true || fallback === true || level === true,
    target: typeof argument === 'number'
      ? argument
      : typeof fallback === 'number'
      ? fallback
      : typeof level === 'number'
      ? level
      : undefined
  }
}
