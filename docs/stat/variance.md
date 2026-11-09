# variance

Compute the variance of an array along an axis.

## API

```ts
Numeric.stat.variance(values, freedom = 0, invalid = false, level)
```

Measures the spread of the values around their mean.

- Parameters:
  - `values`: Vector or matrix of input values
  - `freedom`: Degrees of freedom correction applied
  - `invalid`: When true skips NaN entries
  - `level`: Axis along which the variance is computed
- Returns: Variance matching the requested axis
- NumPy: Covers `np.var`, `np.nanvar`, `ndarray.var` through a single Numerix method.

## Examples

### Variance of a vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.variance([1, 2, 3])

console.log(value)
// 0.6666666666666666
```

### Variance with a degrees of freedom correction

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.variance([1, 2, 3], 1)

console.log(value)
// 1
```

### Variance of equal values

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.variance([4, 4, 4])

console.log(value)
// 0
```

### Variance of each matrix column

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.stat.variance([[1, 2], [3, 4]], 0, false, 0)

console.log(values)
// [1,1]
```
