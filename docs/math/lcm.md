# lcm

Compute the least common multiple of two integers.

## API

```ts
Numeric.math.lcm(left, right)
```

Combines operands with NumPy style broadcast.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
- Returns: Multiples matching the broadcast shape of the operands
- NumPy: Equivalent to `np.lcm`.

## Examples

### Least common multiple of two scalars

```ts
import Numeric from '@neabyte/numerix'

const multiple = Numeric.math.lcm(4, 6)

console.log(multiple)
// 12
```

### Multiples of two vectors element-wise

```ts
import Numeric from '@neabyte/numerix'

const multiples = Numeric.math.lcm([4, 3], [6, 5])

console.log(multiples)
// [12,15]
```

### Multiple of coprime values

```ts
import Numeric from '@neabyte/numerix'

const multiple = Numeric.math.lcm(7, 13)

console.log(multiple)
// 91
```

### Multiple of identical values

```ts
import Numeric from '@neabyte/numerix'

const multiple = Numeric.math.lcm(9, 9)

console.log(multiple)
// 9
```
