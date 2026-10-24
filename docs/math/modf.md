# modf

Split values into their fractional and integral portions.

## API

```ts
Numeric.math.modf(value)
```

Separates each value into its whole and fractional portions.

- Parameters:
  - `value`: Scalar or vector of input values
- Returns: Fractional and integral parts for each input value
- NumPy: Equivalent to `np.modf`.

## Examples

### Split one value into parts

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.math.modf(3.75)

console.log(parts)
// [0.75,3]
```

### Split a vector into parts

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.math.modf([3.75, -2.5])

console.log(parts)
// [[0.75,-0.5],[3,-2]]
```

### Split a whole value

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.math.modf(3)

console.log(parts)
// [0,3]
```

### Split a negative fractional value

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.math.modf(-0.25)

console.log(parts)
// [-0.25,0]
```
