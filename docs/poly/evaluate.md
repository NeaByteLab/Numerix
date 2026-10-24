# evaluate

Evaluate a polynomial at sample points.

## API

```ts
Numeric.poly.evaluate(sample, coefficients, basis = 'poly')
```

Computes polynomial values using Horner iteration.

- Parameters:
  - `sample`: Point or points where the polynomial is evaluated
  - `coefficients`: Coefficients of the source polynomial
  - `basis`: Polynomial basis of the coefficients
- Returns: Polynomial values at the sample points
- NumPy: Covers `np.polynomial.polynomial.polyval`, `np.polynomial.polynomial.polyval2d`, `np.polynomial.polynomial.polyval3d`, `np.polynomial.polynomial.polyvalnd`, `np.polynomial.polynomial.polyvalfromroots`, `np.polynomial.chebyshev.chebval`, `np.polynomial.legendre.legval`, `np.polynomial.hermite.hermval`, `np.polynomial.hermite_e.hermeval`, `np.polynomial.laguerre.lagval`, `np.polyval` through a single Numerix method.

## Examples

### Evaluate at a single point

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.poly.evaluate(2, [1, 2, 3])

console.log(value)
// 17
```

### Evaluate at several points

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.poly.evaluate([1, 2], [1, 2, 3])

console.log(values)
// [6,17]
```

### Evaluate at the origin

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.poly.evaluate(0, [1, 2, 3])

console.log(value)
// 1
```

### Evaluate a constant polynomial

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.poly.evaluate(5, [7])

console.log(value)
// 7
```
