# add

Add two polynomials coefficient by coefficient.

## API

```ts
Numeric.poly.add(left, right)
```

Aligns coefficients and sums them entry by entry.

- Parameters:
  - `left`: Coefficients of the first polynomial
  - `right`: Coefficients of the second polynomial
- Returns: Coefficients of the summed polynomial
- NumPy: Covers `np.polynomial.polynomial.polyadd`, `np.polynomial.chebyshev.chebadd`, `np.polynomial.legendre.legadd`, `np.polynomial.hermite.hermadd`, `np.polynomial.hermite_e.hermeadd`, `np.polynomial.laguerre.lagadd`, `np.polyadd` through a single Numerix method.

## Examples

### Add two polynomials

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.add([1, 2], [3, 4])

console.log(coefficients)
// [4,6]
```

### Add polynomials of different lengths

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.add([1, 2, 3], [1])

console.log(coefficients)
// [2,2,3]
```

### Add a constant to a polynomial

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.add([1, 2], [5])

console.log(coefficients)
// [6,2]
```

### Add two constant polynomials

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.add([2], [3])

console.log(coefficients)
// [5]
```
