# companion

Build the companion matrix of a polynomial.

## API

```ts
Numeric.poly.companion(coefficients, basis = 'poly')
```

Creates the matrix whose eigenvalues are the roots.

- Parameters:
  - `coefficients`: Coefficients of the source polynomial
  - `basis`: Polynomial basis of the coefficients
- Returns: Companion matrix of the polynomial
- NumPy: Covers `np.polynomial.polynomial.polycompanion`, `np.polynomial.chebyshev.chebcompanion`, `np.polynomial.legendre.legcompanion`, `np.polynomial.hermite.hermcompanion`, `np.polynomial.hermite_e.hermecompanion`, `np.polynomial.laguerre.lagcompanion` through a single Numerix method.

## Examples

### Companion matrix of a quadratic

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.poly.companion([1, -3, 2])

console.log(matrix)
// [[0,-0.5],[1,1.5]]
```

### Companion matrix of a linear polynomial

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.poly.companion([1, -2])

console.log(matrix)
// [[0.5]]
```

### Companion matrix of a monic quadratic

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.poly.companion([1, 0, -1])

console.log(matrix)
// [[0,1],[1,0]]
```

### Companion matrix of a cubic

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.poly.companion([1, 0, 0, -1])

console.log(matrix)
// [[0,0,1],[1,0,0],[0,1,0]]
```
