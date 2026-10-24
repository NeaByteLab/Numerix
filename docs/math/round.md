# round

Round every element to the nearest whole number or decimal place.

## API

```ts
Numeric.math.round(value, decimals = 0)
```

Applies rounding across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
  - `decimals`: Number of decimal places to keep
- Returns: Rounded values matching the input nesting shape
- NumPy: Covers `np.round`, `np.around`, `np.rint`, `np.fix`, `ndarray.round` through a single Numerix method.

## Examples

### Round a scalar

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.round(1.6)

console.log(value)
// 2
```

### Keep two decimal places

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.round(1.2345, 2)

console.log(value)
// 1.23
```

### Round a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.round([1.4, 1.6])

console.log(values)
// [1,2]
```

### Round a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.round([[1.4, 1.6], [2.5, 2.4]])

console.log(values)
// [[1,2],[2,2]]
```
