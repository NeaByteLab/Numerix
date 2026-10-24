# cumprod

Compute the running product of an array along an axis.

## API

```ts
Numeric.reduce.cumprod(values, nan = false, axis)
```

Accumulates the running product of the array.

- Parameters:
  - `values`: Vector or matrix of input values
  - `nan`: When true skips not a number entries
  - `axis`: Axis along which the values are accumulated
- Returns: Running products matching the input shape
- NumPy: Covers `np.cumprod`, `np.nancumprod`, `np.cumulative_prod`, `ndarray.cumprod` through a single Numerix method.

## Examples

### Running product of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.reduce.cumprod([1, 2, 3])

console.log(values)
// [1,2,6]
```

### Running product along the first axis

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.reduce.cumprod([[1, 2], [3, 4]], false, 0)

console.log(values)
// [[1,2],[3,8]]
```

### Running product while skipping not a number values

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.reduce.cumprod([2, NaN, 3], true)

console.log(values)
// [2,2,6]
```

### Running product of a single value

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.reduce.cumprod([5])

console.log(values)
// [5]
```
