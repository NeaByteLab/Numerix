# asinh

Compute the inverse hyperbolic sine of every element in nested numeric inputs.

## API

```ts
Numeric.trig.asinh(value)
```

Applies the inverse hyperbolic sine across nested inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Inverse hyperbolic sines matching the input nesting shape
- NumPy: Covers `np.asinh`, `np.arcsinh` through a single Numerix method.

## Examples

### Inverse hyperbolic sine of a single value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.asinh(0)

console.log(value)
// 0
```

### Inverse hyperbolic sine of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.asinh([0, 1])

console.log(values)
// [0,0.881373587019543]
```

### Inverse hyperbolic sine of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.asinh([[0, 1], [1, 0]])

console.log(values)
// [[0,0.881373587019543],[0.881373587019543,0]]
```

### Inverse hyperbolic sine of a negative value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.asinh(-1)

console.log(value)
// -0.881373587019543
```
