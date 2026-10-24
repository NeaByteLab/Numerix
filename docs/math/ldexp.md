# ldexp

Multiply values by powers of two using a separate exponent operand.

## API

```ts
Numeric.math.ldexp(left, right = 0)
```

Combines operands with NumPy style broadcast.

- Parameters:
  - `left`: Mantissa operand as scalar, vector, or matrix
  - `right`: Exponent operand as scalar, vector, or matrix
- Returns: Scaled values matching the broadcast shape of the operands
- NumPy: Equivalent to `np.ldexp`.

## Examples

### Scale one value by a power of two

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.ldexp(3, 2)

console.log(value)
// 12
```

### Scale a vector by matching exponents

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.ldexp([1, 2], [3, 4])

console.log(values)
// [8,32]
```

### Default exponent leaves the value unchanged

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.ldexp(3)

console.log(value)
// 3
```

### Rebuild a value from mantissa and exponent

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.math.frexp(12)
const value = Numeric.math.ldexp(parts[0], parts[1])

console.log(value)
// 12
```
