# xor

Combine two operands with a bitwise exclusive disjunction.

## API

```ts
Numeric.bit.xor(left, right = 0)
```

Combines operands with NumPy style broadcast.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
- Returns: Exclusive disjunction results matching the broadcast shape
- NumPy: Equivalent to `np.bitwise_xor`.

## Examples

### Combine two vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.bit.xor([1, 2], [3, 2])

console.log(values)
// [2,0]
```

### Combine a vector with a scalar

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.bit.xor([6, 3], 1)

console.log(values)
// [7,2]
```

### Combine two scalars

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.bit.xor(12, 10)

console.log(value)
// 6
```

### Combine two matrices

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.bit.xor([[1, 2]], [[3, 2]])

console.log(values)
// [[2,0]]
```
