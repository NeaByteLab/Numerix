import type * as Types from '@app/types.ts'

/**
 * Report whether an entry has components.
 * @description Checks for the real and imaginary parts.
 * @param value - Entry to inspect
 * @returns True when the entry carries both components
 */
export default function shape(value: unknown): value is Types.NumerixComplex {
  return typeof value === 'object' && value !== null &&
    're' in value && 'im' in value
}
