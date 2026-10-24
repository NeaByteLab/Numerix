# unequal

Test whether matching entries of two operands differ.

## API

```ts
Numeric.logic.unequal(left, right, reduce = false)
```

Compares matching entries of both operands.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
  - `reduce`: When true combines results into one boolean
- Returns: Match results matching the broadcast shape
- NumPy: Equivalent to `np.not_equal`.

## Examples

### Compare two vectors

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.unequal([1, 2], [1, 3])

console.log(flags)
// [false,true]
```

### Compare a vector against a scalar

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.unequal([1, 2], 2)

console.log(flags)
// [true,false]
```

### Reduce the comparison to one boolean

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.logic.unequal([1, 2], [1, 3], true)

console.log(flag)
// true
```

### Compare two matrices

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.unequal([[1, 2]], [[1, 3]])

console.log(flags)
// [[false,true]]
```
