# logaddexp

Compute the logarithm of a sum of exponentials.

## API

```ts
Numeric.math.logaddexp(left, right, binary = false)
```

Combines operands with NumPy style broadcast.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
  - `binary`: When true computes the base two logarithm
- Returns: Logarithms matching the broadcast shape of the operands
- NumPy: Covers `np.logaddexp`, `np.logaddexp2` through a single Numerix method.

## Examples

### Logarithm of summed exponentials

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.logaddexp(1, 2)

console.log(value)
// 2.313261687518223
```

### Base two variant

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.logaddexp(1, 2, true)

console.log(value)
// 2.584962500721156
```

### Logarithms of matching operand pairs

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.logaddexp([0, 1], [0, 1])

console.log(values)
// [0.6931471805599453,1.6931471805599454]
```

### Large operands stay stable

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.logaddexp(1000, 1000)

console.log(value)
// 1000.6931471805599
```
