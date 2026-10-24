# and

Combine two operands with logical conjunction.

## API

```ts
Numeric.logic.and(left, right)
```

Combines operands with NumPy style broadcast.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
- Returns: Conjunction results matching the broadcast shape
- NumPy: Equivalent to `np.logical_and`.

## Examples

### Combine a vector with a boolean

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.and([true, false], true)

console.log(flags)
// [true,false]
```

### Combine two vectors

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.and([true, true], [true, false])

console.log(flags)
// [true,false]
```

### Combine numeric truthiness

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.and([1, 0], 1)

console.log(flags)
// [true,false]
```

### Combine two matrices

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.and([[true, false]], [[true, true]])

console.log(flags)
// [[true,false]]
```
