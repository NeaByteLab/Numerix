# intersect

Find the values shared by two arrays.

## API

```ts
Numeric.set.intersect(left, right)
```

Collects the values present in both arrays.

- Parameters:
  - `left`: First vector of values
  - `right`: Second vector of values
- Returns: Distinct values found in both arrays
- NumPy: Equivalent to `np.intersect1d`.

## Examples

### Shared values of two vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.intersect([1, 2], [2, 3])

console.log(values)
// [2]
```

### Shared values of overlapping vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.intersect([1, 2, 3], [2, 3, 4])

console.log(values)
// [2,3]
```

### Shared values of disjoint vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.intersect([1, 2], [3, 4])

console.log(values)
// []
```

### Shared values of identical vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.intersect([1, 2], [1, 2])

console.log(values)
// [1,2]
```
