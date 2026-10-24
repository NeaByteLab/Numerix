# isscalar

Test whether a value is a scalar.

## API

```ts
Numeric.logic.isscalar(value)
```

Checks the runtime type of the given value.

- Parameters:
  - `value`: Value whose type is inspected
- Returns: True when the value is a scalar
- NumPy: Equivalent to `np.isscalar`.

## Examples

### Check a numeric scalar

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.logic.isscalar(5)

console.log(flag)
// true
```

### Check a string scalar

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.logic.isscalar('text')

console.log(flag)
// true
```

### Check a vector

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.logic.isscalar([1, 2])

console.log(flag)
// false
```

### Check a matrix

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.logic.isscalar([[1, 2]])

console.log(flag)
// false
```
