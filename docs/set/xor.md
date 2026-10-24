# xor

Find the values present in exactly one of two arrays.

## API

```ts
Numeric.set.xor(left, right)
```

Collects the values appearing in only one array.

- Parameters:
  - `left`: First vector of values
  - `right`: Second vector of values
- Returns: Distinct values found in exactly one array
- NumPy: Equivalent to `np.setxor1d`.

## Examples

### Values in exactly one array

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.xor([1, 2], [2, 3])

console.log(values)
// [1,3]
```

### Exclusive values of overlapping arrays

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.xor([1, 2, 3], [2, 3, 4])

console.log(values)
// [1,4]
```

### Exclusive values of disjoint arrays

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.xor([1, 2], [3, 4])

console.log(values)
// [1,2,3,4]
```

### Exclusive values of identical arrays

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.set.xor([1, 2], [1, 2])

console.log(values)
// []
```
