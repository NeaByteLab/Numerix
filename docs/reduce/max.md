# max

Find the largest value along an axis.

## API

```ts
Numeric.reduce.max(values, invalid, ignore = false, level)
```

Searches for the maximum entry along an axis.

- Parameters:
  - `values`: Values to search for the maximum
  - `invalid`: Invalid entries or a flag to skip them
  - `ignore`: Whether invalid entries are skipped
  - `level`: Axis along which the maximum is sought
- Returns: Maximum value for the requested axis
- NumPy: Covers `np.max`, `np.amax`, `np.nanmax`, `np.maximum`, `np.fmax`, `ndarray.max` through a single Numerix method.

## Examples

### Largest value of a vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.reduce.max([3, 1, 2])

console.log(value)
// 3
```

### Largest value of each matrix column

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.reduce.max([[3, 1], [2, 4]], undefined, false, 0)

console.log(values)
// [3,4]
```

### Largest value while skipping NaN entries

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.reduce.max([3, NaN, 1], true)

console.log(value)
// 3
```

### Largest value of a single element vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.reduce.max([7])

console.log(value)
// 7
```
