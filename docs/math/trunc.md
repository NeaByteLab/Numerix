# trunc

Truncate every element toward zero without rounding.

## API

```ts
Numeric.math.trunc(value)
```

Applies the truncation across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Truncated values matching the input nesting shape
- NumPy: Equivalent to `np.trunc`.

## Examples

### Truncate a scalar

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.trunc(1.9)

console.log(value)
// 1
```

### Truncate a negative scalar

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.trunc(-1.9)

console.log(value)
// -1
```

### Truncate a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.trunc([1.9, -1.9])

console.log(values)
// [1,-1]
```

### Truncate a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.trunc([[1.9, 2.1], [-3.7, 4.2]])

console.log(values)
// [[1,2],[-3,4]]
```
