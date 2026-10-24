# abs

Compute the absolute value of every element in nested numeric inputs.

## API

```ts
Numeric.math.abs(value)
```

Applies the absolute value across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Absolute values matching the input nesting shape
- NumPy: Covers `np.abs`, `np.absolute`, `np.fabs` through a single Numerix method.

## Examples

### Absolute value of a scalar

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.abs(-5)

console.log(value)
// 5
```

### Absolute values of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.abs([-1, 2, -3])

console.log(values)
// [1,2,3]
```

### Absolute values of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.abs([[-1, 2], [-3, 4]])

console.log(values)
// [[1,2],[3,4]]
```

### Absolute value of a positive scalar

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.abs(5)

console.log(value)
// 5
```
