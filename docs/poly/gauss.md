# gauss

Compute the nodes and weights of a quadrature family.

## API

```ts
Numeric.poly.gauss(degree, kind = 'chebyshev')
```

Computes nodes and weights for a quadrature family.

- Parameters:
  - `degree`: Number of quadrature points to generate
  - `kind`: Quadrature weight family
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
// [[-0.7745966692414834,6.221595626364341e-18,0.774596669241483],[0.5555555555555558,0.888888888888888,0.5555555555555554]]
```

### Hermite nodes and weights

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.poly.gauss(3, 'hermite')

console.log(result)
// [[-1.2247448713915885,2.211718544611456e-17,1.2247448713915892],[0.29540897515091913,1.1816359006036774,0.2954089751509194]]
```

### Laguerre nodes and weights

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.poly.gauss(3, 'laguerre')

console.log(result)
// [[0.4157745567834788,2.2942803602790405,6.2899450829374794],[0.7110930099291732,0.2785177335692406,0.010389256501586123]]
```
