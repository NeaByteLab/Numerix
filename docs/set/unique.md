# unique

Find the distinct values of an array.

## API

```ts
Numeric.set.unique(left, counted = false)
```

Collects the distinct values of the array.

- Parameters:
  - `left`: Vector of input values
  - `counted`: When true also reports counts and inverse positions
- Returns: Distinct values or the full uniqueness report
- NumPy: Covers `np.unique`, `np.unique_all`, `np.unique_counts`, `np.unique_inverse`, `np.unique_values` through a single Numerix method.

## Examples

### Distinct values of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.unique([3, 1, 3, 2])

console.log(values)
// [1,2,3]
```

### Distinct values with counts

```ts
import Numeric from '@neabyte/numerix'

const report = Numeric.set.unique([3, 1, 3, 2], true)

console.log(report)
// {"values":[1,2,3],"counts":[1,1,2],"indices":[1,3,0],"inverse":[2,0,2,1]}
```

### Distinct values of an unsorted vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.unique([5, 5, 1])

console.log(values)
// [1,5]
```

### Distinct values of a single entry

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.unique([7])

console.log(values)
// [7]
```
