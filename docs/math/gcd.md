# gcd

Compute the greatest common divisor of two integers.

## API

```ts
Numeric.math.gcd(left, right)
```

Combines operands with NumPy style broadcast.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
- Returns: Divisors matching the broadcast shape of the operands
- NumPy: Equivalent to `np.gcd`.

## Examples

### Greatest common divisor of two scalars

```ts
import Numeric from '@neabyte/numerix'

const divisor = Numeric.math.gcd(12, 18)

console.log(divisor)
// 6
```

### Divisors of two vectors element-wise

```ts
import Numeric from '@neabyte/numerix'

const divisors = Numeric.math.gcd([12, 8], [18, 12])

console.log(divisors)
// [6,4]
```

### Divisor of coprime values

```ts
import Numeric from '@neabyte/numerix'

const divisor = Numeric.math.gcd(7, 13)

console.log(divisor)
// 1
```

### Divisor of identical values

```ts
import Numeric from '@neabyte/numerix'

const divisor = Numeric.math.gcd(9, 9)

console.log(divisor)
// 9
```
