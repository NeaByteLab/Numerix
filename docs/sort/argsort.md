# argsort

Return the positions that would sort an array.

## API

```ts
Numeric.sort.argsort(values, descending = false, lexical = false)
```

Reports the positions of the sorted entries.

- Parameters:
  - `values`: Vector of input values
  - `descending`: When true sorts from largest to smallest
  - `lexical`: When true compares values as text
- Returns: Positions of the values in sorted order
- NumPy: Covers `np.argsort`, `np.lexsort`, `ndarray.argsort` through a single Numerix method.

## Examples

### Positions of the sorted values

```ts
import Numeric from '@neabyte/numerix'

const indices = Numeric.sort.argsort([3, 1, 2])

console.log(indices)
// [1,2,0]
```

### Positions in descending order

```ts
import Numeric from '@neabyte/numerix'

const indices = Numeric.sort.argsort([3, 1, 2], true)

console.log(indices)
// [0,2,1]
```

### Positions using a lexical comparison

```ts
import Numeric from '@neabyte/numerix'

const indices = Numeric.sort.argsort([10, 9, 2], false, true)

console.log(indices)
// [2,1,0]
```

### Positions of an already sorted vector

```ts
import Numeric from '@neabyte/numerix'

const indices = Numeric.sort.argsort([1, 2, 3])

console.log(indices)
// [0,1,2]
```
