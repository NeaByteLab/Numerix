/**
 * Test whether a value is scalar.
 * @description Checks the runtime type of the given value.
 * @param value - Value whose type is inspected
 * @returns True when the value is a scalar
 */
export default function isscalar(value: unknown): boolean {
  return typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string' ||
    typeof value === 'bigint'
}
