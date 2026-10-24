# reciprocal

Divide one by every element in nested numeric inputs.

## API

```ts
Numeric.math.reciprocal(value)
```

Divides one by every element in nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Reciprocals matching the input nesting shape
- NumPy: Equivalent to `np.reciprocal`.

## Examples

### Reciprocal of a scalar

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.reciprocal(4)

console.log(value)
// 0.25
```

### Reciprocals of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.reciprocal([1, 2, 4])

console.log(values)
// [1,0.5,0.25]
```

### Reciprocals of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.reciprocal([[1, 2], [4, 8]])

console.log(values)
// [[1,0.5],[0.25,0.125]]
```

### Reciprocal of a negative value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.reciprocal(-4)

console.log(value)
// -0.25
```
