# mul

Multiply two polynomials together.

## API

```ts
Numeric.poly.mul(left, right, basis = 'poly')
```

Convolves the coefficient arrays together.

- Parameters:
  - `left`: Coefficients of the first polynomial
  - `right`: Coefficients of the second polynomial
  - `basis`: Polynomial basis of the coefficients
- Returns: Coefficients of the multiplied polynomial
- NumPy: Covers `np.polynomial.polynomial.polymul`, `np.polynomial.polynomial.polymulx`, `np.polynomial.chebyshev.chebmul`, `np.polynomial.legendre.legmul`, `np.polynomial.hermite.hermmul`, `np.polynomial.hermite_e.hermemul`, `np.polynomial.laguerre.lagmul`, `np.polymul` through a single Numerix method.

## Examples

### Multiply two polynomials

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.mul([1, 2], [3, 4])

console.log(coefficients)
// [3,10,8]
```

### Multiply a polynomial by a constant

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.mul([1, 2], 2)

console.log(coefficients)
// [2,4]
```

### Multiply a polynomial by itself

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.mul([1, 1], [1, 1])

console.log(coefficients)
// [1,2,1]
```

### Multiply two constant polynomials

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.mul([2], [3])

console.log(coefficients)
// [6]
```
