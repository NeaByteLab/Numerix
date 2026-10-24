# equal

Test whether matching entries of two operands are equal.

## API

```ts
Numeric.logic.equal(left, right, reduce = false)
```

Compares matching entries of both operands.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
  - `reduce`: When true combines results into one boolean
- Returns: Match results matching the broadcast shape
- NumPy: Covers `np.equal`, `np.array_equal`, `np.array_equiv` through a single Numerix method.

## Examples

### Compare two vectors

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.equal([1, 2], [1, 3])

console.log(flags)
// [true,false]
```

### Compare a vector against a scalar

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.equal([1, 2], 2)

console.log(flags)
// [false,true]
```

### Reduce the comparison to one boolean

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.logic.equal([1, 2], [1, 3], true)

console.log(flag)
// false
```

### Compare two matrices

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.equal([[1, 2]], [[1, 3]])

console.log(flags)
// [[true,false]]
```
