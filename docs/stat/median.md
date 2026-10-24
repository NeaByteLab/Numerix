# median

Compute the median value of an array along an axis.

## API

```ts
Numeric.stat.median(values, nan = false, axis)
```

Finds the middle value of the sorted entries.

- Parameters:
  - `values`: Vector or matrix of input values
  - `nan`: When true skips not a number entries
  - `axis`: Axis along which the median is sought
- Returns: Median matching the requested axis
- NumPy: Covers `np.median`, `np.nanmedian` through a single Numerix method.

## Examples

### Median of an odd length vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.median([3, 1, 2])

console.log(value)
// 2
```

### Median of an even length vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.median([1, 2, 3, 4])

console.log(value)
// 2.5
```

### Median while skipping not a number values

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.median([1, NaN, 3], true)

console.log(value)
// 2
```

### Median of each matrix column

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.stat.median([[1, 2], [3, 4]], false, 0)

console.log(values)
// [2,3]
```
