# cbrt

Compute the cube root of every element in nested numeric inputs.

## API

```ts
Numeric.math.cbrt(value)
```

Applies the cube root across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Cube roots matching the input nesting shape
- NumPy: Equivalent to `np.cbrt`.

## Examples

### Cube root of a scalar

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.cbrt(27)

console.log(value)
// 3
```

### Cube roots of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.cbrt([8, 27])

console.log(values)
// [2,3]
```

### Cube roots of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.cbrt([[8, 27], [64, 125]])

console.log(values)
// [[2,3],[4,5]]
```

### Cube root of a negative value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.cbrt(-8)

console.log(value)
// -2
```
