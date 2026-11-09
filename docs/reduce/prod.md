# prod

Multiply the values of an array along an axis.

## API

```ts
Numeric.reduce.prod(values, invalid = false, level)
```

Multiplies the values of the array.

- Parameters:
  - `values`: Vector or matrix of input values
  - `invalid`: When true skips NaN entries
  - `level`: Axis along which the values are multiplied
- Returns: Product matching the requested axis
- NumPy: Covers `np.prod`, `np.nanprod`, `ndarray.prod` through a single Numerix method.

## Examples

### Product of a vector

```ts
import Numeric from '@neabyte/numerix'

const total = Numeric.reduce.prod([2, 3, 4])

console.log(total)
// 24
```

### Product of each matrix column

```ts
import Numeric from '@neabyte/numerix'

const totals = Numeric.reduce.prod([[1, 2], [3, 4]], false, 0)

console.log(totals)
// [3,8]
```

### Product of each matrix row

```ts
import Numeric from '@neabyte/numerix'

const totals = Numeric.reduce.prod([[1, 2], [3, 4]], false, 1)

console.log(totals)
// [2,12]
```

### Product while skipping NaN values

```ts
import Numeric from '@neabyte/numerix'

const total = Numeric.reduce.prod([2, NaN, 4], true)

console.log(total)
// 8
```
