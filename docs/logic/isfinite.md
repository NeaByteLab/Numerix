# isfinite

Test whether values are finite numbers.

## API

```ts
Numeric.logic.isfinite(value)
```

Checks each element against infinity and not a number.

- Parameters:
  - `value`: Scalar, vector, or matrix values to inspect
- Returns: Match results matching the input nesting shape
- NumPy: Equivalent to `np.isfinite`.

## Examples

### Check a vector with invalid values

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.isfinite([1, Infinity, NaN])

console.log(flags)
// [true,false,false]
```

### Check a single finite value

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.logic.isfinite(1.5)

console.log(flag)
// true
```

### Check a single infinite value

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.logic.isfinite(Infinity)

console.log(flag)
// false
```

### Check a matrix

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.logic.isfinite([[1, NaN]])

console.log(flags)
// [[true,false]]
```
