# div

Divide one polynomial by another.

## API

```ts
Numeric.poly.div(dividend, divisor, basis = 'poly')
```

Performs polynomial long division.

- Parameters:
  - `dividend`: Coefficients of the dividend polynomial
  - `divisor`: Coefficients of the divisor polynomial
  - `basis`: Polynomial basis of the coefficients
- Returns: Quotient and remainder coefficients
- NumPy: Covers `np.polynomial.polynomial.polydiv`, `np.polynomial.chebyshev.chebdiv`, `np.polynomial.legendre.legdiv`, `np.polynomial.hermite.hermdiv`, `np.polynomial.hermite_e.hermediv`, `np.polynomial.laguerre.lagdiv`, `np.polydiv` through a single Numerix method.

## Examples

### Divide one polynomial by another

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.poly.div([1, 2, 1], [1, 1])

console.log(result)
// [[1,1],[0]]
```

### Divide a polynomial by a constant

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.poly.div([2, 4], [2])

console.log(result)
// [[1,2],[0]]
```

### Divide with a remainder

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.poly.div([1, 2, 3], [1, 1])

console.log(result)
// [[-1,3],[2]]
```

### Divide identical polynomials

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.poly.div([1, 2, 1], [1, 2, 1])

console.log(result)
// [[1],[0,0]]
```
