# mul

Multiply two operands together using NumPy style broadcasting rules.

## API

```ts
Numeric.math.mul(left, right = 1)
```

Combines operands with NumPy style broadcast.

- Parameters:
  - `left`: First operand as scalar, vector, or matrix
  - `right`: Second operand as scalar, vector, or matrix
- Returns: Products matching the broadcast shape of the operands
- NumPy: Covers `np.multiply`, `np.matvec`, `np.vecmat` through a single Numerix method.

## Examples

### Multiply two scalars

```ts
import Numeric from '@neabyte/numerix'

const product = Numeric.math.mul(3, 4)

console.log(product)
// 12
```

### Multiply a vector by a scalar

```ts
import Numeric from '@neabyte/numerix'

const products = Numeric.math.mul([1, 2, 3], 3)

console.log(products)
// [3,6,9]
```

### Multiply two vectors element-wise

```ts
import Numeric from '@neabyte/numerix'

const products = Numeric.math.mul([2, 3], [4, 5])

console.log(products)
// [8,15]
```

### Multiply each matrix row by a vector

```ts
import Numeric from '@neabyte/numerix'

const products = Numeric.math.mul([[1, 2], [3, 4]], [1, 1])

console.log(products)
// [[1,2],[3,4]]
```
