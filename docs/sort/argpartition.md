# argpartition

Return the positions that would partially sort an array.

## API

```ts
Numeric.sort.argpartition(values, rank)
```

Reports the positions of the partially sorted entries.

- Parameters:
  - `values`: Vector of input values
  - `rank`: Position holding the partition boundary
- Returns: Positions of the values in partitioned order
- NumPy: Covers `np.argpartition`, `ndarray.argpartition` through a single Numerix method.

## Examples

### Positions of the partitioned values

```ts
import Numeric from '@neabyte/numerix'

const indices = Numeric.sort.argpartition([3, 1, 2, 5], 1)

console.log(indices)
// [1,2,0,3]
```

### Positions at a middle rank

```ts
import Numeric from '@neabyte/numerix'

const indices = Numeric.sort.argpartition([3, 1, 2, 5], 2)

console.log(indices)
// [1,2,0,3]
```

### Positions at the last rank

```ts
import Numeric from '@neabyte/numerix'

const indices = Numeric.sort.argpartition([3, 1, 2, 5], 3)

console.log(indices)
// [1,2,0,3]
```

### Positions of an already sorted vector

```ts
import Numeric from '@neabyte/numerix'

const indices = Numeric.sort.argpartition([1, 2, 3], 1)

console.log(indices)
// [0,1,2]
```
