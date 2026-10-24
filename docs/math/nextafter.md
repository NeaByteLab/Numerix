# nextafter

Step each value to the next representable neighbour.

## API

```ts
Numeric.math.nextafter(start, direction)
```

Steps each element toward positive or negative infinity.

- Parameters:
  - `start`: Starting operand as scalar, vector, or matrix
  - `direction`: Direction operand as scalar, vector, or matrix
- Returns: Adjacent values matching the broadcast shape of the operands
- NumPy: Equivalent to `np.nextafter`.

## Examples

### Step one value upward

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.nextafter(1, 2)

console.log(value)
// 1.0000000000000002
```

### Step one value downward

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.nextafter(1, 0)

console.log(value)
// 0.9999999999999999
```

### Step a vector of values

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.nextafter([1, 2], 10)

console.log(values)
// [1.0000000000000002,2.0000000000000004]
```

### Identical values stay unchanged

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.nextafter(1, 1)

console.log(value)
// 1
```
