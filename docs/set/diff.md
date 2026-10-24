# diff

Find the values of the first array missing from the second.

## API

```ts
Numeric.set.diff(left, right)
```

Collects the values absent from the second array.

- Parameters:
  - `left`: First vector of values
  - `right`: Second vector of values
- Returns: Distinct values found only in the first array
- NumPy: Equivalent to `np.setdiff1d`.

## Examples

### Values missing from the second array

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.diff([1, 2], [2, 3])

console.log(values)
// [1]
```

### Difference of overlapping vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.diff([1, 2, 3], [2, 3, 4])

console.log(values)
// [1]
```

### Difference of disjoint vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.diff([1, 2], [3, 4])

console.log(values)
// [1,2]
```

### Difference of identical vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.diff([1, 2], [1, 2])

console.log(values)
// []
```
