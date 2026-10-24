# clip

Limit every element to a minimum and maximum bound.

## API

```ts
Numeric.math.clip(value, min = -Infinity, max = Infinity)
```

Applies bounds across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
  - `min`: Lower bound applied to each element
  - `max`: Upper bound applied to each element
- Returns: Clipped values matching the input nesting shape
- NumPy: Covers `np.clip`, `ndarray.clip` through a single Numerix method.

## Examples

### Clip a scalar

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.clip(5, 0, 3)

console.log(value)
// 3
```

### Clip a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.clip([-5, 0, 5], -1, 1)

console.log(values)
// [-1,0,1]
```

### Clip a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.clip([[-5, 0], [5, 10]], 0, 3)

console.log(values)
// [[0,0],[3,3]]
```

### Clip only the lower bound

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.clip(-5, 0)

console.log(value)
// 0
```
