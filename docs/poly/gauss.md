# gauss

Compute the nodes and weights of a quadrature family.

## API

```ts
Numeric.poly.gauss(degree, family = 'chebyshev')
```

Computes nodes and weights for a quadrature family.

- Parameters:
  - `degree`: Number of quadrature points to generate
  - `family`: Quadrature weight family
- Returns: Quadrature nodes and their weights
- NumPy: Covers `np.polynomial.chebyshev.chebgauss`, `np.polynomial.legendre.leggauss`, `np.polynomial.hermite.hermgauss`, `np.polynomial.hermite_e.hermegauss`, `np.polynomial.laguerre.laggauss` through a single Numerix method.

## Examples

### Chebyshev nodes and weights

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.poly.gauss(3)

console.log(result)
// [[0.8660254037844387,6.123233995736766e-17,-0.8660254037844385],[1.0471975511965976,1.0471975511965976,1.0471975511965976]]
```

### Legendre nodes and weights

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.poly.gauss(3, 'legendre')

console.log(result)
// [[-0.7745966692414832,0,0.7745966692414832],[0.5555555555555556,0.888888888888888,0.5555555555555556]]
```

### Hermite nodes and weights

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.poly.gauss(3, 'hermite')

console.log(result)
// [[-1.224744871391589,0,1.224744871391589],[0.29540897515091924,1.1816359006036772,0.29540897515091924]]
```

### Laguerre nodes and weights

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.poly.gauss(3, 'laguerre')

console.log(result)
// [[0.4157745567834788,2.2942803602790405,6.2899450829374794],[0.7110930099291732,0.2785177335692406,0.010389256501586123]]
```
