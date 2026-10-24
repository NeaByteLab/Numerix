# close

Test whether two operands are numerically close.

## API

```ts
Numeric.logic.close(left, right, relative = 1e-5, absolute = 1e-8, reduce = false, equal = false)
```

Compares operands within relative and absolute tolerances.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
  - `relative`: Relative tolerance applied to the comparison
  - `absolute`: Absolute tolerance applied to the comparison
  - `reduce`: When true combines results into one boolean
  - `equal`: When true treats equal values as close
- Returns: Match results matching the broadcast shape
- NumPy: Covers `np.isclose`, `np.allclose` through a single Numerix method.

## Examples

### Compare nearly equal values

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.close([1], [1.0000001])

console.log(flags)
// [true]
```

### Compare clearly different values

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.close([1], [2])

console.log(flags)
// [false]
```

### Reduce the comparison to one boolean

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.logic.close([1], [1.0000001], 1e-5, 1e-8, true)

console.log(flag)
// true
```

### Compare with a tight tolerance

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.close([1], [1.1], 1e-8, 1e-8)

console.log(flags)
// [false]
```
