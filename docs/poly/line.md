# line

Create the coefficients of a straight line.

## API

```ts
Numeric.poly.line(offset, scale, basis = 'poly')
```

Creates coefficients for a straight line.

- Parameters:
  - `offset`: Constant term of the line
  - `scale`: Gradient of the line
  - `basis`: Polynomial basis of the coefficients
- Returns: Coefficients describing the line
- NumPy: Covers `np.polynomial.polynomial.polyline`, `np.polynomial.chebyshev.chebline`, `np.polynomial.legendre.legline`, `np.polynomial.hermite.hermline`, `np.polynomial.hermite_e.hermeline`, `np.polynomial.laguerre.lagline` through a single Numerix method.

## Examples

### Line with an offset and a gradient

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.line(1, 2)

console.log(coefficients)
// [1,2]
```

### Line through the origin

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.line(0, 3)

console.log(coefficients)
// [0,3]
```

### Horizontal line

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.line(5, 0)

console.log(coefficients)
// [5]
```

### Line with a negative gradient

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.line(2, -1)

console.log(coefficients)
// [2,-1]
```
