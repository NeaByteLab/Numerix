# and

Combine two operands with a bitwise conjunction.

## API

```ts
Numeric.bit.and(left, right = 0)
```

Combines operands with NumPy style broadcast.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
- Returns: Conjunction results matching the broadcast shape
- NumPy: Equivalent to `np.bitwise_and`.

## Examples

### Combine two vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.bit.and([1, 2], [3, 2])

console.log(values)
// [1,2]
```

### Combine a vector with a scalar

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.bit.and([6, 3], 1)

console.log(values)
// [0,1]
```

### Combine two scalars

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.bit.and(12, 10)

console.log(value)
// 8
```

### Combine two matrices

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.bit.and([[1, 2]], [[3, 2]])

console.log(values)
// [[1,2]]
```
