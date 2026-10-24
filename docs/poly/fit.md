# fit

Fit a polynomial through observed samples.

## API

```ts
Numeric.poly.fit(samples, targets, degree, basis = 'poly')
```

Solves a least squares system for the coefficients.

- Parameters:
  - `samples`: Sample points where the function is evaluated
  - `targets`: Observed values at the sample points
  - `degree`: Degree of the fitted polynomial
  - `basis`: Polynomial basis of the fitted coefficients
- Returns: Coefficients of the fitted polynomial
- NumPy: Covers `np.polynomial.polynomial.polyfit`, `np.polynomial.chebyshev.chebfit`, `np.polynomial.legendre.legfit`, `np.polynomial.hermite.hermfit`, `np.polynomial.hermite_e.hermefit`, `np.polynomial.laguerre.lagfit`, `np.polyfit` through a single Numerix method.

## Examples

### Fit a straight line

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.fit([0, 1, 2], [1, 3, 5], 1)

console.log(coefficients)
// [1,2]
```

### Fit a quadratic

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.fit([0, 1, 2], [1, 3, 5], 2)

console.log(coefficients)
// [1.0000000000000004,2,0]
```

### Fit a constant

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.fit([0, 1, 2], [1, 3, 5], 0)

console.log(coefficients)
// [3]
```

### Fit a line through the origin

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.fit([1, 2, 3], [2, 4, 6], 1)

console.log(coefficients)
// [0,2]
```
