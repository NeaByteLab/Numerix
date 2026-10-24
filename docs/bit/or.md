# or

Combine two operands with a bitwise disjunction.

## API

```ts
Numeric.bit.or(left, right = 0)
```

Combines operands with NumPy style broadcast.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
- Returns: Disjunction results matching the broadcast shape
- NumPy: Equivalent to `np.bitwise_or`.

## Examples

### Combine two vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.bit.or([1, 2], [3, 2])

console.log(values)
// [3,2]
```

### Combine a vector with a scalar

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.bit.or([6, 3], 1)

console.log(values)
// [7,3]
```

### Combine two scalars

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.bit.or(12, 10)

console.log(value)
// 14
```

### Combine two matrices

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.bit.or([[1, 2]], [[3, 2]])

console.log(values)
// [[3,2]]
```
