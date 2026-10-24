# der

Differentiate a polynomial.

## API

```ts
Numeric.poly.der(coefficients, order = 1, scale = 1, basis = 'poly')
```

Applies differentiation repeatedly to reach the order.

- Parameters:
  - `coefficients`: Coefficients of the source polynomial
  - `order`: Number of derivatives to apply
  - `scale`: Scaling factor applied to each derivative
  - `basis`: Polynomial basis of the coefficients
- Returns: Coefficients of the differentiated polynomial
- NumPy: Covers `np.polynomial.polynomial.polyder`, `np.polynomial.chebyshev.chebder`, `np.polynomial.legendre.legder`, `np.polynomial.hermite.hermder`, `np.polynomial.hermite_e.hermeder`, `np.polynomial.laguerre.lagder`, `np.polyder` through a single Numerix method.

## Examples

### Differentiate a polynomial

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.der([1, 2, 3])

console.log(coefficients)
// [2,6]
```

### Take the second derivative

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.der([1, 2, 3], 2)

console.log(coefficients)
// [6]
```

### Scale the derivative

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.der([1, 2, 3], 1, 2)

console.log(coefficients)
// [4,12]
```

### Differentiate a constant polynomial

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.der([5])

console.log(coefficients)
// [0]
```
