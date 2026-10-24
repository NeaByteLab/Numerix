# pow

Raise each element to a power using NumPy style broadcasting rules.

## API

```ts
Numeric.math.pow(left, right = 2)
```

Combines operands with NumPy style broadcast.

- Parameters:
  - `left`: Base operand as scalar, vector, or matrix
  - `right`: Exponent operand as scalar, vector, or matrix
- Returns: Powers matching the broadcast shape of the operands
- NumPy: Covers `np.pow`, `np.power`, `np.float_power`, `np.emath.power` through a single Numerix method.

## Examples

### Power of two scalars

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.pow(2, 10)

console.log(value)
// 1024
```

### Powers of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.pow([2, 3], 3)

console.log(values)
// [8,27]
```

### Squared values of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.pow([2, 3])

console.log(values)
// [4,9]
```

### Negative base with an odd exponent

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.pow(-2, 3)

console.log(value)
// -8
```
