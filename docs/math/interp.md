# interp

Interpolate values at query points using piecewise linear segments.

## API

```ts
Numeric.math.interp(query, points, values, left, right)
```

Performs piecewise linear interpolation between known points.

- Parameters:
  - `query`: Positions where values are requested
  - `points`: Sorted sample positions of the known values
  - `values`: Sample values paired with the positions
  - `left`: Value returned for queries below the range
  - `right`: Value returned for queries above the range
- Returns: Interpolated values at the query positions
- NumPy: Equivalent to `np.interp`.

## Examples

### Interpolate one query point

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.interp(2.5, [0, 1, 2, 3], [0, 10, 20, 30])

console.log(value)
// 25
```

### Interpolate several query points

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.interp([0.5, 1.5], [0, 1, 2], [0, 10, 20])

console.log(values)
// [5,15]
```

### Query on a sample point returns the sample

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.interp(1, [0, 1, 2], [0, 10, 20])

console.log(value)
// 10
```

### Bound values apply outside the sample range

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.interp(-1, [0, 1, 2], [0, 10, 20], -99, 99)

console.log(value)
// -99
```
