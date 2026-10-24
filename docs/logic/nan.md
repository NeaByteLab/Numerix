# nan

Replace not a number values with safe fallbacks.

## API

```ts
Numeric.logic.nan(value, fallback = 0, positive = Number.MAX_VALUE, negative = -Number.MAX_VALUE)
```

Substitutes replacement values for each invalid element.

- Parameters:
  - `value`: Scalar, vector, or matrix values to sanitize
  - `fallback`: Value used for general invalid entries
  - `positive`: Value used for positive invalid entries
  - `negative`: Value used for negative invalid entries
- Returns: Sanitized values matching the input nesting shape
- NumPy: Equivalent to `np.nan_to_num`.

## Examples

### Sanitize a vector with invalid values

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.logic.nan([1, NaN, Infinity])

console.log(values)
// [1,0,1.7976931348623157e+308]
```

### Sanitize a single not a number value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.logic.nan(NaN)

console.log(value)
// 0
```

### Sanitize negative infinity

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.logic.nan(-Infinity)

console.log(value)
// -1.7976931348623157e+308
```

### Sanitize with a custom fallback

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.logic.nan([1, NaN], -1)

console.log(values)
// [1,-1]
```
