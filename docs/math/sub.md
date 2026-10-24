# sub

Subtract one operand from another using NumPy style broadcasting rules.

## API

```ts
Numeric.math.sub(left, right = 0)
```

Combines operands with NumPy style broadcast.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
- Returns: Differences matching the broadcast shape of the operands
- NumPy: Equivalent to `np.subtract`.

## Examples

### Subtract two scalars

```ts
import Numeric from '@neabyte/numerix'

const difference = Numeric.math.sub(5, 3)

console.log(difference)
// 2
```

### Subtract a scalar from a vector

```ts
import Numeric from '@neabyte/numerix'

const differences = Numeric.math.sub([10, 20], 1)

console.log(differences)
// [9,19]
```

### Subtract two vectors element-wise

```ts
import Numeric from '@neabyte/numerix'

const differences = Numeric.math.sub([10, 20], [1, 2])

console.log(differences)
// [9,18]
```

### Subtract a vector from a matrix row

```ts
import Numeric from '@neabyte/numerix'

const differences = Numeric.math.sub([[10, 20], [30, 40]], [1, 2])

console.log(differences)
// [[9,18],[29,38]]
```
