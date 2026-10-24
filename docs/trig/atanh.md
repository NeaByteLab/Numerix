# atanh

Compute the inverse hyperbolic tangent of every element in nested numeric inputs.

## API

```ts
Numeric.trig.atanh(value)
```

Applies the inverse hyperbolic tangent across nested inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Inverse hyperbolic tangents matching the input nesting shape
- NumPy: Covers `np.atanh`, `np.arctanh`, `np.emath.arctanh` through a single Numerix method.

## Examples

### Inverse hyperbolic tangent of zero

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.atanh(0)

console.log(value)
// 0
```

### Inverse hyperbolic tangent of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.atanh([0, 0.5])

console.log(values)
// [0,0.5493061443340549]
```

### Inverse hyperbolic tangent of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.atanh([[0, 0.5], [0.5, 0]])

console.log(values)
// [[0,0.5493061443340549],[0.5493061443340549,0]]
```

### Inverse hyperbolic tangent of a negative value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.atanh(-0.5)

console.log(value)
// -0.5493061443340549
```
