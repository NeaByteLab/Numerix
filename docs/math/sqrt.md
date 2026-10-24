# sqrt

Compute the square root of every element in nested numeric inputs.

## API

```ts
Numeric.math.sqrt(value)
```

Applies the square root across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Square roots matching the input nesting shape
- NumPy: Covers `np.sqrt`, `np.emath.sqrt` through a single Numerix method.

## Examples

### Square root of a scalar

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.sqrt(9)

console.log(value)
// 3
```

### Square roots of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.sqrt([4, 9])

console.log(values)
// [2,3]
```

### Square roots of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.sqrt([[4, 9], [16, 25]])

console.log(values)
// [[2,3],[4,5]]
```

### Square root of a fractional value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.sqrt(0.25)

console.log(value)
// 0.5
```
