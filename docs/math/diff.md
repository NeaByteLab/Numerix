# diff

Compute differences between adjacent elements for a given order.

## API

```ts
Numeric.math.diff(values, order = 1, level = -1, prepend, append)
```

Repeats finite differencing to reach the requested order.

- Parameters:
  - `values`: Vector or matrix of input values
  - `order`: Number of differencing passes to apply
  - `level`: Axis along which differences are computed
  - `prepend`: Optional values prepended before differencing
  - `append`: Optional values appended before differencing
- Returns: Differences matching the shape of the input
- NumPy: Covers `np.diff`, `np.ediff1d` through a single Numerix method.

## Examples

### First order differences of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.diff([1, 4, 9, 16])

console.log(values)
// [3,5,7]
```

### Second order differences of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.diff([1, 4, 9, 16], 2)

console.log(values)
// [2,2]
```

### Differences along each matrix row

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.diff([[1, 4, 9], [2, 5, 10]])

console.log(values)
// [[3,5],[3,5]]
```

### Differences along the first matrix axis

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.diff([[1, 4, 9], [2, 5, 10]], 1, 0)

console.log(values)
// [[1,1,1]]
```
