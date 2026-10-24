# floor

Round every element down toward negative infinity.

## API

```ts
Numeric.math.floor(value)
```

Applies the floor across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Floored values matching the input nesting shape
- NumPy: Equivalent to `np.floor`.

## Examples

### Floor of a scalar

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.floor(1.9)

console.log(value)
// 1
```

### Floors of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.floor([1.9, -1.1])

console.log(values)
// [1,-2]
```

### Floors of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.floor([[1.9, 2.1], [3.7, -0.2]])

console.log(values)
// [[1,2],[3,-1]]
```

### Floor of a whole number

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.floor(5)

console.log(value)
// 5
```
