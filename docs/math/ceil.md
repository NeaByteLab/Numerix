# ceil

Round every element up toward positive infinity.

## API

```ts
Numeric.math.ceil(value)
```

Applies the ceiling across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Ceiled values matching the input nesting shape
- NumPy: Equivalent to `np.ceil`.

## Examples

### Ceiling of a scalar

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.ceil(1.1)

console.log(value)
// 2
```

### Ceilings of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.ceil([1.1, -1.9])

console.log(values)
// [2,-1]
```

### Ceilings of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.ceil([[1.1, 2.9], [3.2, -0.2]])

console.log(values)
// [[2,3],[4,0]]
```

### Ceiling of a whole number

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.ceil(5)

console.log(value)
// 5
```
