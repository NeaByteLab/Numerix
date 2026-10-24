# grid

Evaluate a polynomial across a grid of points.

## API

```ts
Numeric.poly.grid(rows, columns, coefficients, basis = 'poly')
```

Computes polynomial values at grid intersections.

- Parameters:
  - `rows`: Row positions of the evaluation grid
  - `columns`: Column positions of the evaluation grid
  - `coefficients`: Coefficients of the source polynomial
  - `basis`: Polynomial basis of the coefficients
- Returns: Evaluated values for each grid row
- NumPy: Covers `np.polynomial.polynomial.polygrid2d`, `np.polynomial.polynomial.polygrid3d`, `np.polynomial.chebyshev.chebgrid2d`, `np.polynomial.legendre.leggrid2d`, `np.polynomial.hermite.hermgrid2d`, `np.polynomial.hermite_e.hermegrid2d`, `np.polynomial.laguerre.laggrid2d` through a single Numerix method.

## Examples

### Evaluate a grid of points

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.poly.grid([1, 2], [3, 4], [[1, 2], [3, 4]])

console.log(values)
// [[22,28],[37,47]]
```

### Evaluate a single grid point

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.poly.grid([1], [2], [[1, 2], [3, 4]])

console.log(values)
// [[16]]
```

### Evaluate a row of grid points

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.poly.grid([1, 2], [1], [[1, 2], [3, 4]])

console.log(values)
// [[10],[17]]
```

### Evaluate a constant polynomial

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.poly.grid([1, 2], [3, 4], [[5], [0]])

console.log(values)
// [[5,5],[5,5]]
```
