# mean

Compute the arithmetic mean of an array along an axis.

## API

```ts
Numeric.stat.mean(values, invalid = false, level)
```

Averages the values of the array.

- Parameters:
  - `values`: Vector or matrix of input values
  - `invalid`: When true skips NaN entries
  - `level`: Axis along which the values are averaged
- Returns: Mean matching the requested axis
- NumPy: Covers `np.mean`, `np.nanmean`, `ndarray.mean` through a single Numerix method.

## Examples

### Mean of a vector

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.mean([1, 2, 3])

console.log(value)
// 2
```

### Mean while skipping NaN values

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.mean([1, NaN, 3], true)

console.log(value)
// 2
```

### Mean of each matrix column

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.stat.mean([[1, 2], [3, 4]], false, 0)

console.log(values)
// [2,3]
```

### Mean of equal values

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.stat.mean([5, 5, 5])

console.log(value)
// 5
```
