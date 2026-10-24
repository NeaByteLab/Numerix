# xor

Combine two operands with exclusive disjunction.

## API

```ts
Numeric.logic.xor(left, right)
```

Combines operands with NumPy style broadcast.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
- Returns: Exclusive disjunction results matching the broadcast shape
- NumPy: Equivalent to `np.logical_xor`.

## Examples

### Combine a vector with a boolean

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.xor([true, false], true)

console.log(flags)
// [false,true]
```

### Combine two vectors

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.xor([true, true], [true, false])

console.log(flags)
// [false,true]
```

### Combine numeric truthiness

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.xor([1, 0], 1)

console.log(flags)
// [false,true]
```

### Combine two matrices

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.xor([[true, false]], [[true, true]])

console.log(flags)
// [[false,true]]
```
