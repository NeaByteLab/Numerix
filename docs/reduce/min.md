# min

Find the smallest value along an axis.

## API

```ts
Numeric.reduce.min(values, nan, skip = false, axis)
```

Searches for the minimum entry along an axis.

- Parameters:
  - `values`: Values to search for the minimum
  - `nan`: Invalid entries or a flag to skip them
  - `skip`: Whether invalid entries are skipped
  - `axis`: Axis along which the minimum is sought
- Returns: Minimum value for the requested axis
- NumPy: Covers `np.min`, `np.amin`, `np.nanmin`, `np.minimum`, `np.fmin`, `ndarray.min` through a single Numerix method.

## Examples

### Smallest value of a vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.reduce.min([3, 1, 2])

console.log(value)
// 1
```

### Smallest value of each matrix column

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.reduce.min([[3, 1], [2, 4]], undefined, false, 0)

console.log(values)
// [2,1]
```

### Smallest value while skipping not a number entries

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.reduce.min([3, NaN, 1], true)

console.log(value)
// 1
```

### Smallest value of a single element vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.reduce.min([7])

console.log(value)
// 7
```
