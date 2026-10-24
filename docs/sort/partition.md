# partition

Partially sort an array so a rank holds the smaller values.

## API

```ts
Numeric.sort.partition(values, rank)
```

Partially sorts the values around the given rank.

- Parameters:
  - `values`: Vector of input values
  - `rank`: Position holding the partition boundary
- Returns: Partially sorted values
- NumPy: Covers `np.partition`, `ndarray.partition` through a single Numerix method.

## Examples

### Partition at the first rank

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.sort.partition([3, 1, 2, 5], 1)

console.log(values)
// [1,2,3,5]
```

### Partition at a middle rank

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.sort.partition([3, 1, 2, 5], 2)

console.log(values)
// [1,2,3,5]
```

### Partition at the last rank

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.sort.partition([3, 1, 2, 5], 3)

console.log(values)
// [1,2,3,5]
```

### Partition an already sorted vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.sort.partition([1, 2, 3], 1)

console.log(values)
// [1,2,3]
```
