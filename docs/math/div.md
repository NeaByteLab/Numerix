# div

Divide two operands together with optional floor division.

## API

```ts
Numeric.math.div(left, right = 1, floor = false)
```

Combines operands with NumPy style broadcast.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
  - `floor`: When true truncates the quotient toward negative infinity
- Returns: Quotients matching the broadcast shape of the operands
- NumPy: Covers `np.divide`, `np.true_divide`, `np.floor_divide` through a single Numerix method.

## Examples

### Divide two scalars

```ts
import Numeric from '@neabyte/numerix'

const quotient = Numeric.math.div(10, 4)

console.log(quotient)
// 2.5
```

### Divide a vector by a scalar

```ts
import Numeric from '@neabyte/numerix'

const quotients = Numeric.math.div([10, 20], 2)

console.log(quotients)
// [5,10]
```

### Divide two vectors element-wise

```ts
import Numeric from '@neabyte/numerix'

const quotients = Numeric.math.div([10, 20], [2, 4])

console.log(quotients)
// [5,5]
```

### Floor division truncates toward negative infinity

```ts
import Numeric from '@neabyte/numerix'

const quotients = Numeric.math.div([10, 20], 3, true)

console.log(quotients)
// [3,6]
```
