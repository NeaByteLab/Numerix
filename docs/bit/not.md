# not

Invert the bits of every element.

## API

```ts
Numeric.bit.not(value)
```

Inverts each element of the nested input.

- Parameters:
  - `value`: Scalar, vector, or matrix values to invert
- Returns: Inverted values matching the input nesting shape
- NumPy: Covers `np.bitwise_invert`, `np.bitwise_not`, `np.invert` through a single Numerix method.

## Examples

### Invert a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.bit.not([1, 2])

console.log(values)
// [-2,-3]
```

### Invert a single value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.bit.not(0)

console.log(value)
// -1
```

### Invert a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.bit.not([[1, 2]])

console.log(values)
// [[-2,-3]]
```

### Invert values with high bits set

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.bit.not([255])

console.log(values)
// [-256]
```
