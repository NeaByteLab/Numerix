# or

Combine two operands with logical disjunction.

## API

```ts
Numeric.logic.or(left, right)
```

Combines operands with NumPy style broadcast.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
- Returns: Disjunction results matching the broadcast shape
- NumPy: Equivalent to `np.logical_or`.

## Examples

### Combine a vector with a boolean

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.or([true, false], false)

console.log(flags)
// [true,false]
```

### Combine two vectors

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.or([false, false], [true, false])

console.log(flags)
// [true,false]
```

### Combine numeric truthiness

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.or([1, 0], 0)

console.log(flags)
// [true,false]
```

### Combine two matrices

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.or([[true, false]], [[false, true]])

console.log(flags)
// [[true,true]]
```
