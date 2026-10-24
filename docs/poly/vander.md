# vander

Build a Vandermonde matrix from sample points.

## API

```ts
Numeric.poly.vander(samples, degree, basis = 'poly')
```

Places powers of each sample into a matrix.

- Parameters:
  - `samples`: Sample points used as matrix rows
  - `degree`: Highest power included in each row
  - `basis`: Polynomial basis of the generated rows
- Returns: Vandermonde matrix of the sample points
- NumPy: Covers `np.polynomial.polynomial.polyvander`, `np.polynomial.polynomial.polyvander2d`, `np.polynomial.polynomial.polyvander3d`, `np.polynomial.chebyshev.chebvander`, `np.polynomial.legendre.legvander`, `np.polynomial.hermite.hermvander`, `np.polynomial.hermite_e.hermevander`, `np.polynomial.laguerre.lagvander` through a single Numerix method.

## Examples

### Vandermonde matrix of two samples

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.poly.vander([1, 2], 2)

console.log(matrix)
// [[1,1,1],[1,2,4]]
```

### Vandermonde matrix of three samples

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.poly.vander([1, 2, 3], 3)

console.log(matrix)
// [[1,1,1,1],[1,2,4,8],[1,3,9,27]]
```

### Vandermonde matrix with a single column

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.poly.vander([1, 2], 0)

console.log(matrix)
// [[1],[1]]
```

### Vandermonde matrix in the Chebyshev basis

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.poly.vander([1, 2], 2, 'cheb')

console.log(matrix)
// [[1,1,1],[1,2,7]]
```
