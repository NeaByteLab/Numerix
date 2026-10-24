# frexp

Split values into a normalized mantissa and a power of two exponent.

## API

```ts
Numeric.math.frexp(value)
```

Decomposes each value into fraction and power.

- Parameters:
  - `value`: Scalar or vector of input values
- Returns: Mantissa and exponent for each input value
- NumPy: Equivalent to `np.frexp`.

## Examples

### Split one value into parts

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.math.frexp(12)

console.log(parts)
// [0.75,4]
```

### Split a vector into parts

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.math.frexp([12, 8])

console.log(parts)
// [[0.75,0.5],[4,4]]
```

### Split a negative value

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.math.frexp(-12)

console.log(parts)
// [-0.75,4]
```

### Split zero into parts

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.math.frexp(0)

console.log(parts)
// [0,0]
```
