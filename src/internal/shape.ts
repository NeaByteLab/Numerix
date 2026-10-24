/**
 * Report whether an entry has components.
 * @description Checks for the real and imaginary parts.
 * @param value - Entry to inspect
 * @returns True when the entry carries both components
 */
export default function shape(value: unknown): boolean {
  return typeof value === 'object' && value !== null &&
    're' in value && 'im' in value
}
