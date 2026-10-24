# sub

Subtract two polynomials coefficient by coefficient.

## API

```ts
Numeric.poly.sub(left, right)
```

Aligns coefficients and subtracts them entry by entry.

- Parameters:
  - `left`: Coefficients of the minuend polynomial
  - `right`: Coefficients of the subtrahend polynomial
- Returns: Coefficients of the difference polynomial
- NumPy: Covers `np.polynomial.polynomial.polysub`, `np.polynomial.chebyshev.chebsub`, `np.polynomial.legendre.legsub`, `np.polynomial.hermite.hermsub`, `np.polynomial.hermite_e.hermesub`, `np.polynomial.laguerre.lagsub`, `np.polysub` through a single Numerix method.

## Examples

### Subtract two polynomials

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.sub([1, 2, 3], [1, 1, 1])

console.log(coefficients)
// [0,1,2]
```

### Subtract a constant polynomial

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.sub([1, 2], [1])

console.log(coefficients)
// [0,2]
```

### Subtract identical polynomials

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.sub([2, 3], [2, 3])

console.log(coefficients)
// [0]
```

### Subtract polynomials of different lengths

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.sub([1, 2, 3], [1, 1])

console.log(coefficients)
// [0,1,3]
```
