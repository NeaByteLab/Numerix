# argmin

Find the position of the smallest value along an axis.

## API

```ts
Numeric.reduce.argmin(values, nan = false, axis)
```

Locates the position of the minimum entry.

- Parameters:
  - `values`: Vector or matrix of input values
  - `nan`: When true skips not a number entries
  - `axis`: Axis along which the position is sought
- Returns: Position of the smallest entry
- NumPy: Covers `np.argmin`, `np.nanargmin`, `ndarray.argmin` through a single Numerix method.

## Examples

### Position of the smallest value

```ts
import Numeric from '@neabyte/numerix'

const index = Numeric.reduce.argmin([3, 1, 2])

console.log(index)
// 1
```

### Position of the smallest matrix column

```ts
import Numeric from '@neabyte/numerix'

const indices = Numeric.reduce.argmin([[3, 1], [2, 4]], false, 0)

console.log(indices)
// [1,0]
```

### Position while skipping not a number values

```ts
import Numeric from '@neabyte/numerix'

const index = Numeric.reduce.argmin([3, NaN, 1], true)

console.log(index)
// 2
```

### Position of the smallest value in a matrix row

```ts
import Numeric from '@neabyte/numerix'

const indices = Numeric.reduce.argmin([[3, 1, 2], [4, 5, 6]], false, 1)

console.log(indices)
// [1,0]
```
