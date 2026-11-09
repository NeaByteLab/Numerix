# mod

Compute the remainder of a division with selectable remainder convention.

## API

```ts
Numeric.math.mod(first, right = 1, method)
```

Combines operands with NumPy style broadcast.

- Parameters:
  - `first`: Dividend as a scalar, vector, or matrix
  - `right`: Divisor as a scalar, vector, or matrix
  - `method`: Remainder convention applied to each quotient
- Returns: Remainders matching the broadcast shape of the operands
- NumPy: Covers `np.mod`, `np.remainder`, `np.fmod`, `np.divmod` through a single Numerix method.

## Examples

### Remainder of two scalars

```ts
import Numeric from '@neabyte/numerix'

const remainder = Numeric.math.mod(10, 3)

console.log(remainder)
// 1
```

### Remainders of a vector

```ts
import Numeric from '@neabyte/numerix'

const remainders = Numeric.math.mod([10, 20], 3)

console.log(remainders)
// [1,2]
```

### Remainders of two vectors element-wise

```ts
import Numeric from '@neabyte/numerix'

const remainders = Numeric.math.mod([10, 20], [3, 4])

console.log(remainders)
// [1,0]
```

### Default mode keeps the sign of the divisor

```ts
import Numeric from '@neabyte/numerix'

const remainder = Numeric.math.mod(-10, 3)

console.log(remainder)
// 2
```

### Fmod mode keeps the sign of the dividend

```ts
import Numeric from '@neabyte/numerix'

const remainder = Numeric.math.mod(-10, 3, 'fmod')

console.log(remainder)
// -1
```
