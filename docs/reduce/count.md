# count

Count the non-zero entries along an axis.

## API

```ts
Numeric.reduce.count(values, axis)
```

Counts the entries holding a non-zero value.

- Parameters:
  - `values`: Vector or matrix of input values
  - `axis`: Axis along which the entries are counted
- Returns: Count matching the requested axis
- NumPy: Equivalent to `np.count_nonzero`.

## Examples

### Count non-zero values

```ts
import Numeric from '@neabyte/numerix'

const count = Numeric.reduce.count([0, 1, 2])

console.log(count)
// 2
```

### Count non-zero values in each column

```ts
import Numeric from '@neabyte/numerix'

const counts = Numeric.reduce.count([[0, 1], [2, 0]], 0)

console.log(counts)
// [1,1]
```

### Count non-zero values in each row

```ts
import Numeric from '@neabyte/numerix'

const counts = Numeric.reduce.count([[0, 1], [2, 0]], 1)

console.log(counts)
// [1,1]
```

### Count an empty vector

```ts
import Numeric from '@neabyte/numerix'

const count = Numeric.reduce.count([])

console.log(count)
// 0
```
