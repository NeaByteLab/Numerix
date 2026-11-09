# weight

Evaluate the quadrature weight at given points.

## API

```ts
Numeric.poly.weight(samples, family = 'chebyshev')
```

Evaluates the weight function at each point.

- Parameters:
  - `samples`: Point or points where weights are computed
  - `family`: Quadrature weight family
- Returns: Weights matching the input shape
- NumPy: Covers `np.polynomial.chebyshev.chebweight`, `np.polynomial.legendre.legweight`, `np.polynomial.hermite.hermweight`, `np.polynomial.hermite_e.hermeweight`, `np.polynomial.laguerre.lagweight` through a single Numerix method.

## Examples

### Weight at the domain edge

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.poly.weight(1)

console.log(value)
// Infinity
```

### Weight at the origin

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.poly.weight(0)

console.log(value)
// 1
```

### Weights at several points

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.poly.weight([0, 1])

console.log(values)
// [1,Infinity]
```

### Weight in the Legendre family

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.poly.weight(0, 'legendre')

console.log(value)
// 1
```
