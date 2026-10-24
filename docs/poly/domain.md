# domain

Inspect or transform the domain of a polynomial.

## API

```ts
Numeric.poly.domain(values, source, target, mode = 'bounds', tolerance = 0)
```

Reports bounds, maps values, or trims trailing zeros.

- Parameters:
  - `values`: Coefficients describing the domain
  - `source`: Source interval used for mapping
  - `target`: Target interval used for mapping
  - `mode`: Domain operation applied to the values
  - `tolerance`: Threshold used when trimming
- Returns: Domain bounds or mapped values
- NumPy: Covers `np.polynomial.polyutils.getdomain`, `np.polynomial.polyutils.mapdomain`, `np.polynomial.polyutils.mapparms`, `np.polynomial.polyutils.trimcoef`, `np.polynomial.polyutils.trimseq`, `np.polynomial.polynomial.polytrim`, `np.polynomial.chebyshev.chebtrim`, `np.polynomial.legendre.legtrim`, `np.polynomial.hermite.hermtrim`, `np.polynomial.hermite_e.hermetrim`, `np.polynomial.laguerre.lagtrim` through a single Numerix method.

## Examples

### Bounds of the domain

```ts
import Numeric from '@neabyte/numerix'

const bounds = Numeric.poly.domain([1, 2, 3])

console.log(bounds)
// [1,3]
```

### Map values onto a new interval

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.poly.domain([1, 2, 3], [0, 1], [0, 10], 'map')

console.log(values)
// [10,20,30]
```

### Report the domain parameters

```ts
import Numeric from '@neabyte/numerix'

const bounds = Numeric.poly.domain([1, 2, 3], undefined, undefined, 'parms')

console.log(bounds)
// [1,3]
```

### Trim trailing zero coefficients

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.poly.domain([1, 2, 0], undefined, undefined, 'trim')

console.log(values)
// [1,2]
```
