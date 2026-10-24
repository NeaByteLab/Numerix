# root

Find the roots of a polynomial.

## API

```ts
Numeric.poly.root(input, roots = false, basis = 'poly')
```

Finds root values or the derived root polynomial.

- Parameters:
  - `input`: Coefficients of the source polynomial
  - `roots`: When true returns the derived root polynomial
  - `basis`: Polynomial basis of the coefficients
- Returns: Root values or coefficients of the root polynomial
- NumPy: Covers `np.polynomial.polynomial.polyroots`, `np.polynomial.polynomial.polyfromroots`, `np.polynomial.chebyshev.chebroots`, `np.polynomial.legendre.legroots`, `np.polynomial.hermite.hermroots`, `np.polynomial.hermite_e.hermeroots`, `np.polynomial.laguerre.lagroots`, `np.roots`, `np.poly` through a single Numerix method.

## Examples

### Roots of a quadratic polynomial

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.poly.root([1, -3, 2])

console.log(values)
// [0.5,1]
```

### Derived root polynomial

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.root([1, -3, 2], true)

console.log(coefficients)
// [6,-7,0,1]
```

### Roots of a linear polynomial

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.poly.root([1, -2])

console.log(values)
// [0.5]
```

### Roots of a constant polynomial

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.poly.root([5])

console.log(values)
// []
```
