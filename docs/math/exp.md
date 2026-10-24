# exp

Compute the exponential of every element using a selectable variant.

## API

```ts
Numeric.math.exp(value, mode = 'e')
```

Applies an exponential variant across nested inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
  - `mode`: Exponential variant to apply to each element
- Returns: Exponentials matching the input nesting shape
- NumPy: Covers `np.exp`, `np.exp2`, `np.expm1` through a single Numerix method.

## Examples

### Exponential of a scalar

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.exp(1)

console.log(value)
// 2.718281828459045
```

### Exponentials of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.exp([0, 1])

console.log(values)
// [1,2.718281828459045]
```

### Base two exponential variant

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.exp([0, 1, 2], '2')

console.log(values)
// [1,2,4]
```

### Exponent minus one variant

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.exp(1, 'm1')

console.log(value)
// 1.7182818284590453
```
