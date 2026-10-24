# hypot

Compute the square root of the sum of squares without overflow.

## API

```ts
Numeric.trig.hypot(left, right = 0)
```

Combines operands element-wise with stable square roots.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
- Returns: Hypotenuses matching the broadcast shape of the operands
- NumPy: Equivalent to `np.hypot`.

## Examples

### Hypotenuse of two scalars

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.hypot(3, 4)

console.log(value)
// 5
```

### Hypotenuse of a vector and a scalar

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.hypot([3, 6], 4)

console.log(values)
// [5,7.211102550927979]
```

### Hypotenuse of two vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.hypot([3, 5], [4, 12])

console.log(values)
// [5,13]
```

### Hypotenuse avoids intermediate overflow

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.hypot(1e200, 1e200)

console.log(value)
// 1.414213562373095e+200
```
