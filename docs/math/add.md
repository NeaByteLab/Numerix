# add

Add two operands together using NumPy style broadcasting rules.

## API

```ts
Numeric.math.add(left, right = 0)
```

Combines operands with NumPy style broadcast.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
- Returns: Sums matching the broadcast shape of the operands
- NumPy: Equivalent to `np.add`.

## Examples

### Add two scalars

```ts
import Numeric from '@neabyte/numerix'

const sum = Numeric.math.add(2, 3)

console.log(sum)
// 5
```

### Add a scalar to a vector

```ts
import Numeric from '@neabyte/numerix'

const sums = Numeric.math.add([1, 2], 10)

console.log(sums)
// [11,12]
```

### Add two vectors element-wise

```ts
import Numeric from '@neabyte/numerix'

const sums = Numeric.math.add([1, 2], [10, 20])

console.log(sums)
// [11,22]
```

### Add a vector to a matrix row

```ts
import Numeric from '@neabyte/numerix'

const sums = Numeric.math.add([[1, 2], [3, 4]], [10, 20])

console.log(sums)
// [[11,22],[13,24]]
```
