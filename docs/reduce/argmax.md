# argmax

Find the position of the largest value along an axis.

## API

```ts
Numeric.reduce.argmax(values, nan = false, axis)
```

Locates the position of the maximum entry.

- Parameters:
  - `values`: Vector or matrix of input values
  - `nan`: When true skips not a number entries
  - `axis`: Axis along which the position is sought
- Returns: Position of the largest entry
- NumPy: Covers `np.argmax`, `np.nanargmax`, `ndarray.argmax` through a single Numerix method.

## Examples

### Position of the largest value

```ts
import Numeric from '@neabyte/numerix'

const index = Numeric.reduce.argmax([3, 1, 2])

console.log(index)
// 0
```

### Position of the largest matrix column

```ts
import Numeric from '@neabyte/numerix'

const indices = Numeric.reduce.argmax([[3, 1], [2, 4]], false, 0)

console.log(indices)
// [0,1]
```

### Position while skipping not a number values

```ts
import Numeric from '@neabyte/numerix'

const index = Numeric.reduce.argmax([3, NaN, 1], true)

console.log(index)
// 0
```

### Position of the largest value in a matrix row

```ts
import Numeric from '@neabyte/numerix'

const indices = Numeric.reduce.argmax([[3, 1, 2], [4, 5, 6]], false, 1)

console.log(indices)
// [0,2]
```
