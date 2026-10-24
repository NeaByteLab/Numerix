# bincount

Count the occurrences of each non-negative integer value.

## API

```ts
Numeric.stat.bincount(values, weights, minimum = 0)
```

Counts how often each integer value appears.

- Parameters:
  - `values`: Non-negative integer values to count
  - `weights`: Weights added instead of plain counts
  - `minimum`: Smallest counted index in the result
- Returns: Count for each counted index
- NumPy: Equivalent to `np.bincount`.

## Examples

### Count integer occurrences

```ts
import Numeric from '@neabyte/numerix'

const counts = Numeric.stat.bincount([0, 1, 1, 3])

console.log(counts)
// [1,2,0,1]
```

### Count with weights

```ts
import Numeric from '@neabyte/numerix'

const counts = Numeric.stat.bincount([0, 1, 1], [1, 2, 3])

console.log(counts)
// [1,5]
```

### Count with a larger minimum index

```ts
import Numeric from '@neabyte/numerix'

const counts = Numeric.stat.bincount([0, 1], undefined, 3)

console.log(counts)
// [1,1,0]
```

### Count a single repeated value

```ts
import Numeric from '@neabyte/numerix'

const counts = Numeric.stat.bincount([2, 2, 2])

console.log(counts)
// [0,0,3]
```
