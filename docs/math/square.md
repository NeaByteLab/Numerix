# square

Square every element in nested numeric inputs.

## API

```ts
Numeric.math.square(value)
```

Applies the square across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Squares matching the input nesting shape
- NumPy: Equivalent to `np.square`.

## Examples

### Square of a scalar

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.square(5)

console.log(value)
// 25
```

### Squares of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.square([2, 3])

console.log(values)
// [4,9]
```

### Squares of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.square([[1, 2], [3, 4]])

console.log(values)
// [[1,4],[9,16]]
```

### Square of a negative value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.square(-5)

console.log(value)
// 25
```
