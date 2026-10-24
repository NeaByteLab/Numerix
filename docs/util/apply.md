# apply

Apply an operation to each slice of a matrix along one axis.

## API

```ts
Numeric.util.apply(operation, array, axis = 0)
```

Runs an operation on each row of a matrix.

- Parameters:
  - `operation`: Operation applied to each slice
  - `array`: Vector or matrix the operation runs on
  - `axis`: Axis along which the slices are taken
- Returns: Results of the operation for each slice
- NumPy: Covers `np.apply_along_axis`, `np.apply_over_axes`, `np.vectorize`, `np.frompyfunc` through a single Numerix method.

## Examples

### Sum every row of a matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = [[1, 2, 3], [4, 5, 6]]
const totals = Numeric.util.apply(
  (row: number[]) => row.reduce((sum, value) => sum + value, 0),
  matrix
)

console.log(totals)
// [5,7,9]
```

### Sum every column of a matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = [[1, 2, 3], [4, 5, 6]]
const totals = Numeric.util.apply(
  (row: number[]) => row.reduce((sum, value) => sum + value, 0),
  matrix,
  1
)

console.log(totals)
// [6,15]
```

### Apply an operation to a plain vector

```ts
import Numeric from '@neabyte/numerix'

const lengths = Numeric.util.apply((values: number[]) => values.length, [1, 2, 3])

console.log(lengths)
// [3]
```

### Build column vectors from each row

```ts
import Numeric from '@neabyte/numerix'

const matrix = [[1, 2], [3, 4]]
const columns = Numeric.util.apply((row: number[]) => row.map((value) => [value]), matrix)

console.log(columns)
// [[[1],[3]],[[2],[4]]]
```
