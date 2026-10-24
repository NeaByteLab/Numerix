# count

Count the set bits of every element.

## API

```ts
Numeric.bit.count(value)
```

Counts the active bits in each nested entry.

- Parameters:
  - `value`: Scalar, vector, or matrix values to inspect
- Returns: Bit counts matching the input nesting shape
- NumPy: Equivalent to `np.bitwise_count`.

## Examples

### Count the bits of a vector

```ts
import Numeric from '@neabyte/numerix'

const counts = Numeric.bit.count([7, 8])

console.log(counts)
// [3,1]
```

### Count the bits of a single value

```ts
import Numeric from '@neabyte/numerix'

const count = Numeric.bit.count(7)

console.log(count)
// 3
```

### Count the bits of a matrix

```ts
import Numeric from '@neabyte/numerix'

const counts = Numeric.bit.count([[7, 8]])

console.log(counts)
// [[3,1]]
```

### Count the bits of a zero value

```ts
import Numeric from '@neabyte/numerix'

const count = Numeric.bit.count(0)

console.log(count)
// 0
```
