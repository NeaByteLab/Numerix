import * as Dtype from '@app/dtype/index.ts'
import * as Internal from '@app/internal/index.ts'

/**
 * Broadcast a value to a shape.
 * @description Expands nested inputs to the requested dimensions.
 * @param input - Value or nested array to broadcast
 * @param shape - Target shape of the broadcast result
 * @param method - Broadcast mode or shape inference variant
 * @returns Broadcast value or inferred shape
 */
export default function broadcast(
  input: unknown,
  shape: number[] | unknown[],
  method: 'to' | 'shape' | 'arrays' = 'to'
): unknown {
  if (method !== 'to' && method !== 'shape' && method !== 'arrays') {
    throw new RangeError("mode must be one of 'to', 'shape', or 'arrays'")
  }
  if (method === 'arrays' || (method === 'shape' && Array.isArray(input))) {
    const first = method === 'arrays' || Array.isArray((input as unknown[])[0])
      ? Dtype.info(input).shape
      : (input as unknown[]).map((value) => Number(value ?? 1))
    const second = method === 'arrays' || Array.isArray((shape as unknown[])[0])
      ? Dtype.info(shape).shape
      : (shape as unknown[]).map((value) => Number(value ?? 1))
    const count = Math.max(first.length, second.length)
    const common = Array.from({ length: count }, (_outer, index) => {
      const primary = index >= count - first.length
        ? (first[index - (count - first.length)] ?? 1)
        : 1
      const scaled = index >= count - second.length
        ? (second[index - (count - second.length)] ?? 1)
        : 1
      if (primary < 0 || scaled < 0) {
        throw new RangeError('negative dimensions are not allowed')
      }
      if (primary !== scaled && primary !== 1 && scaled !== 1) {
        throw new RangeError('operands could not be broadcast together')
      }
      return primary === 1 ? scaled : primary
    })
    return method === 'shape' ? common : [
      broadcast(input, common, 'to'),
      broadcast(shape, common, 'to')
    ]
  }
  const target = shape as number[]
  const depth = Internal.depth(input)
  if (depth > target.length) {
    throw new RangeError('input operand has more dimensions than allowed by the axis remapping')
  }
  if (target.length === 0) {
    return Internal.classify(input, true, true) === true ? Internal.nested(input) : input
  }
  const length = target[0] ?? 0
  if (length < 0) {
    throw new RangeError('negative dimensions are not allowed')
  }
  const remaining = target.slice(1)
  if (depth < target.length || ((input as unknown[]).length === 1 && length !== 1)) {
    const template = broadcast(
      depth < target.length ? input : (input as unknown[])[0],
      remaining,
      'to'
    )
    return Internal.classify(input, true, true) === true
      ? Internal.nested(Array.from({ length }, () => template))
      : Array.from(
        { length },
        (_outer, index) => index === 0 ? template : Internal.nested(template, (entry) => entry)
      )
  }
  if ((input as unknown[]).length !== length) {
    throw new RangeError('operands could not be broadcast together')
  }
  const mapped = (input as unknown[]).map((entry) => broadcast(entry, remaining, 'to'))
  return Internal.classify(input, true, true) === true ? Internal.nested(mapped) : mapped
}
