# sum

Sum the values of an array along an axis.

## API

```ts
Numeric.reduce.sum(values, nan = false, axis)
```

Adds up the values of the array.

- Parameters:
  - `values`: Vector or matrix of input values
  - `nan`: When true skips not a number entries
  - `axis`: Axis along which the values are summed
- Returns: Sum matching the requested axis
- NumPy: Covers `np.sum`, `np.nansum`, `ndarray.sum` through a single Numerix method.

## Examples

### Sum a vector

```ts
import Numeric from '@neabyte/numerix'

const total = Numeric.reduce.sum([1, 2, 3])

console.log(total)
// 6
```

### Sum each column of a matrix

```ts
import Numeric from '@neabyte/numerix'

const totals = Numeric.reduce.sum([[1, 2], [3, 4]], false, 0)

console.log(totals)
// [4,6]
```

### Sum each row of a matrix

```ts
import Numeric from '@neabyte/numerix'

const totals = Numeric.reduce.sum([[1, 2], [3, 4]], false, 1)

console.log(totals)
// [3,7]
```

### Sum while skipping not a number values

```ts
import Numeric from '@neabyte/numerix'

const total = Numeric.reduce.sum([1, NaN, 3], true)

console.log(total)
// 4
```
