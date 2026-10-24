# order

Sort the values of an array in ascending or descending order.

## API

```ts
Numeric.sort.order(values, descending = false, axis = -1)
```

Sorts the entries of the array.

- Parameters:
  - `values`: Vector or matrix of input values
  - `descending`: When true sorts from largest to smallest
  - `axis`: Axis along which the values are sorted
- Returns: Sorted values matching the input shape
- NumPy: Covers `np.sort`, `np.sort_complex`, `ndarray.sort` through a single Numerix method.

## Examples

### Sort a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.sort.order([3, 1, 2])

console.log(values)
// [1,2,3]
```

### Sort a vector in descending order

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.sort.order([3, 1, 2], true)

console.log(values)
// [3,2,1]
```

### Sort each row of a matrix

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.sort.order([[3, 1], [2, 4]])

console.log(matrix)
// [[1,3],[2,4]]
```

### Sort an already sorted vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.sort.order([1, 2, 3])

console.log(values)
// [1,2,3]
```
