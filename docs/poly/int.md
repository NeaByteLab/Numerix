# int

Integrate a polynomial.

## API

```ts
Numeric.poly.int(coefficients, order = 1, constant = 0, lower = 0, basis = 'poly')
```

Applies integration repeatedly to reach the order.

- Parameters:
  - `coefficients`: Coefficients of the source polynomial
  - `order`: Number of integrations to apply
  - `constant`: Constant term added to the result
  - `lower`: Lower bound used for the integration
  - `basis`: Polynomial basis of the coefficients
- Returns: Coefficients of the integrated polynomial
- NumPy: Covers `np.polynomial.polynomial.polyint`, `np.polynomial.chebyshev.chebint`, `np.polynomial.legendre.legint`, `np.polynomial.hermite.hermint`, `np.polynomial.hermite_e.hermeint`, `np.polynomial.laguerre.lagint`, `np.polyint` through a single Numerix method.

## Examples

### Integrate a polynomial

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.int([1, 2, 3])

console.log(coefficients)
// [0,1,1,1]
```

### Add a constant term

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.int([1, 2, 3], 1, 1)

console.log(coefficients)
// [1,1,1,1]
```

### Integrate twice

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.int([1, 2, 3], 2)

console.log(coefficients)
// [0,0,0.5,0.3333333333333333,0.25]
```

### Integrate from a lower bound

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.int([1, 2, 3], 1, 0, 1)

console.log(coefficients)
// [-3,1,1,1]
```
