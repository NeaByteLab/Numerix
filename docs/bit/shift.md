# shift

Shift the bits of each element left or right.

## API

```ts
Numeric.bit.shift(value, bits, right = false)
```

Moves bits left or right by the given count.

- Parameters:
  - `value`: Scalar, vector, or matrix values to shift
  - `bits`: Number of bit positions to shift
  - `right`: When true shifts bits toward the low end
- Returns: Shifted values matching the input nesting shape
- NumPy: Covers `np.bitwise_left_shift`, `np.left_shift`, `np.bitwise_right_shift`, `np.right_shift` through a single Numerix method.

## Examples

### Shift a vector to the left

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.bit.shift([1, 2], 1)

console.log(values)
// [2,4]
```

### Shift a vector to the right

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.bit.shift([4, 2], 1, true)

console.log(values)
// [2,1]
```

### Shift a single value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.bit.shift(1, 3)

console.log(value)
// 8
```

### Shift a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.bit.shift([[1, 2]], [1, 2])

console.log(values)
// [[2,8]]
```
