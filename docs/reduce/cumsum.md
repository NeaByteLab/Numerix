# cumsum

Compute the running sum of an array along an axis.

## API

```ts
Numeric.reduce.cumsum(values, nan = false, axis)
```

Accumulates the running sum of the array.

- Parameters:
  - `values`: Vector or matrix of input values
  - `nan`: When true skips not a number entries
  - `axis`: Axis along which the values are accumulated
- Returns: Running sums matching the input shape
- NumPy: Covers `np.cumsum`, `np.nancumsum`, `np.cumulative_sum`, `ndarray.cumsum` through a single Numerix method.

## Examples

### Running sum of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.reduce.cumsum([1, 2, 3])

console.log(values)
// [1,3,6]
```

### Running sum along the first axis

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.reduce.cumsum([[1, 2], [3, 4]], false, 0)

console.log(values)
// [[1,2],[4,6]]
```

### Running sum while skipping not a number values

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.reduce.cumsum([1, NaN, 3], true)

console.log(values)
// [1,1,4]
```

### Running sum of a single value

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.reduce.cumsum([5])

console.log(values)
// [5]
```
