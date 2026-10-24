# std

Compute the standard deviation of an array along an axis.

## API

```ts
Numeric.stat.std(left, freedom = 0, nan = false, axis)
```

Measures the spread of the values around their mean.

- Parameters:
  - `left`: Vector or matrix of input values
  - `freedom`: Degrees of freedom correction applied
  - `nan`: When true skips not a number entries
  - `axis`: Axis along which the deviation is computed
- Returns: Standard deviation matching the requested axis
- NumPy: Covers `np.std`, `np.nanstd`, `ndarray.std` through a single Numerix method.

## Examples

### Standard deviation of a vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.std([1, 2, 3])

console.log(value)
// 0.816496580927726
```

### Standard deviation with a degrees of freedom correction

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.std([1, 2, 3], 1)

console.log(value)
// 1
```

### Standard deviation of equal values

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.std([4, 4, 4])

console.log(value)
// 0
```

### Standard deviation of each matrix column

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.stat.std([[1, 2], [3, 4]], 0, false, 0)

console.log(values)
// [1,1]
```
