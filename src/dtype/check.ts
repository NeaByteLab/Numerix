/** Data type members keyed by category name */
const groups: Record<string, ReadonlySet<string>> = {
  bool: new Set(['bool']),
  signed: new Set(['int8', 'int16', 'int32', 'int64']),
  unsigned: new Set(['uint8', 'uint16', 'uint32', 'uint64']),
  integer: new Set(['int8', 'int16', 'int32', 'int64', 'uint8', 'uint16', 'uint32', 'uint64']),
  floating: new Set(['float16', 'float32', 'float64']),
  complex: new Set(['complex64', 'complex128']),
  numeric: new Set([
    'int8',
    'int16',
    'int32',
    'int64',
    'uint8',
    'uint16',
    'uint32',
    'uint64',
    'float16',
    'float32',
    'float64',
    'complex64',
    'complex128'
  ]),
  string: new Set(['string'])
}

/**
 * Test a type against a category.
 * @description Matches the type against the category members.
 * @param dtype - Data type name to test
 * @param category - Category the type is tested against
 * @returns True when the type belongs to the category
 */
export default function check(dtype: string, category: string = 'numeric'): boolean {
  if (dtype === category) {
    return true
  }
  return groups[category]?.has(dtype) ?? false
}
