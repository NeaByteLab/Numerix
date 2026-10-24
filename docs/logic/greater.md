# greater

Test whether left values exceed right values.

## API

```ts
Numeric.logic.greater(left, right, inclusive = false)
```

Compares operands with NumPy style broadcast.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
  - `inclusive`: When true treats equal values as matching
- Returns: Match results matching the broadcast shape
- NumPy: Covers `np.greater`, `np.greater_equal` through a single Numerix method.

## Examples

### Compare a vector against a scalar

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.greater([1, 5], 3)

console.log(flags)
// [false,true]
```

### Compare two vectors

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.greater([1, 5], [3, 3])

console.log(flags)
// [false,true]
```

### Include equal values in the match

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.greater([1, 5], 3, true)

console.log(flags)
// [false,true]
```

### Compare two matrices

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.greater([[1, 5]], [[3, 3]])

console.log(flags)
// [[false,true]]
```
