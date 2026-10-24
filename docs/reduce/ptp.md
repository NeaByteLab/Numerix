# ptp

Compute the peak to peak range of an array along an axis.

## API

```ts
Numeric.reduce.ptp(values, axis)
```

Measures the spread between the largest and smallest values.

- Parameters:
  - `values`: Vector or matrix of input values
  - `axis`: Axis along which the range is measured
- Returns: Range matching the requested axis
- NumPy: Equivalent to `np.ptp`.

## Examples

### Range of a vector

```ts
import Numeric from '@neabyte/numerix'

const range = Numeric.reduce.ptp([1, 5, 3])

console.log(range)
// 4
```

### Range of each matrix column

```ts
import Numeric from '@neabyte/numerix'

const ranges = Numeric.reduce.ptp([[1, 5], [3, 2]], 0)

console.log(ranges)
// [2,3]
```

### Range of each matrix row

```ts
import Numeric from '@neabyte/numerix'

const ranges = Numeric.reduce.ptp([[1, 5], [3, 2]], 1)

console.log(ranges)
// [4,1]
```

### Range of equal values

```ts
import Numeric from '@neabyte/numerix'

const range = Numeric.reduce.ptp([4, 4, 4])

console.log(range)
// 0
```
