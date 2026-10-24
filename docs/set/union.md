# union

Combine the distinct values of two arrays.

## API

```ts
Numeric.set.union(left, right)
```

Collects the values present in either array.

- Parameters:
  - `left`: First vector of values
  - `right`: Second vector of values
- Returns: Distinct values found in either array
- NumPy: Equivalent to `np.union1d`.

## Examples

### Union of two vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.union([1, 2], [2, 3])

console.log(values)
// [1,2,3]
```

### Union of overlapping vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.union([1, 2, 3], [2, 3, 4])

console.log(values)
// [1,2,3,4]
```

### Union of disjoint vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.union([1, 2], [3, 4])

console.log(values)
// [1,2,3,4]
```

### Union of identical vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.union([1, 2], [1, 2])

console.log(values)
// [1,2]
```
