# pow

Raise a polynomial to an integer power.

## API

```ts
Numeric.poly.pow(coefficients, exponent, basis = 'poly')
```

Uses repeated squaring for the polynomial power.

- Parameters:
  - `coefficients`: Coefficients of the source polynomial
  - `exponent`: Integer exponent applied to the polynomial
  - `basis`: Polynomial basis of the coefficients
- Returns: Coefficients of the powered polynomial
- NumPy: Covers `np.polynomial.polynomial.polypow`, `np.polynomial.chebyshev.chebpow`, `np.polynomial.legendre.legpow`, `np.polynomial.hermite.hermpow`, `np.polynomial.hermite_e.hermepow`, `np.polynomial.laguerre.lagpow` through a single Numerix method.

## Examples

### Square a polynomial

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.pow([1, 1], 2)

console.log(coefficients)
// [1,2,1]
```

### Cube a polynomial

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.pow([1, 1], 3)

console.log(coefficients)
// [1,3,3,1]
```

### Zero power returns a constant

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.pow([1, 1], 0)

console.log(coefficients)
// [1]
```

### First power returns the polynomial

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.pow([1, 2, 3], 1)

console.log(coefficients)
// [1,2,3]
```
