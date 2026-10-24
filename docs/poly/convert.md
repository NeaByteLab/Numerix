# convert

Rewrite polynomial coefficients in another basis.

## API

```ts
Numeric.poly.convert(coefficients, source = 'cheb', target = 'poly')
```

Rewrites coefficients in the requested basis.

- Parameters:
  - `coefficients`: Coefficients of the source polynomial
  - `source`: Basis of the given coefficients
  - `target`: Basis of the returned coefficients
- Returns: Coefficients expressed in the target basis
- NumPy: Covers `np.polynomial.chebyshev.cheb2poly`, `np.polynomial.chebyshev.poly2cheb`, `np.polynomial.legendre.leg2poly`, `np.polynomial.legendre.poly2leg`, `np.polynomial.hermite.herm2poly`, `np.polynomial.hermite.poly2herm`, `np.polynomial.hermite_e.herme2poly`, `np.polynomial.hermite_e.poly2herme`, `np.polynomial.laguerre.lag2poly`, `np.polynomial.laguerre.poly2lag` through a single Numerix method.

## Examples

### Convert from the power basis

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.convert([1, 2, 3], 'poly', 'cheb')

console.log(coefficients)
// [2.5,2,1.5]
```

### Convert back to the power basis

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.convert([1, 2, 3], 'cheb', 'poly')

console.log(coefficients)
// [-2,2,6]
```

### Convert from the Laguerre basis

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.convert([1, 2, 3], 'lag', 'poly')

console.log(coefficients)
// [6,-8,1.5]
```

### Convert from the Legendre basis

```ts
import Numeric from '@neabyte/numerix'

const coefficients = Numeric.poly.convert([1, 2, 3], 'leg', 'poly')

console.log(coefficients)
// [-0.5,2,4.5]
```
