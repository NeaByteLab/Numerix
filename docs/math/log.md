# log

Compute the logarithm of every element using a selectable base.

## API

```ts
Numeric.math.log(value, base = 'e')
```

Applies a logarithm variant across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
  - `base`: Logarithm base or natural logarithm variant
- Returns: Logarithms matching the input nesting shape
- NumPy: Covers `np.log`, `np.log2`, `np.log10`, `np.log1p`, `np.emath.log`, `np.emath.log2`, `np.emath.log10`, `np.emath.logn` through a single Numerix method.

## Examples

### Natural logarithm of a scalar

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.log(Math.E)

console.log(value)
// 1
```

### Natural logarithms of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.log([1, 10])

console.log(values)
// [0,2.302585092994046]
```

### Base ten logarithms of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.log([1, 100], 10)

console.log(values)
// [0,2]
```

### Logarithm of one plus variant

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.log(1, '1p')

console.log(value)
// 0.6931471805599453
```
