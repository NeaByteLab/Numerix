# sample

Sample a polynomial or a callback over a point range.

## API

```ts
Numeric.poly.sample(count, degree, fn, kind = 'first')
```

Evaluates a polynomial or callback over sample points.

- Parameters:
  - `count`: Number of sample points to generate
  - `degree`: Degree used when sampling a polynomial
  - `fn`: Callback evaluated when sampling a function
  - `kind`: Sample point distribution to use
- Returns: Sampled values for the generated points
- NumPy: Covers `np.polynomial.chebyshev.chebpts1`, `np.polynomial.chebyshev.chebpts2`, `np.polynomial.chebyshev.chebinterpolate` through a single Numerix method.

## Examples

### Sample three points

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.poly.sample(3)

console.log(values)
// [-0.8660254037844386,0,0.8660254037844386]
```

### Sample with a degree

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.poly.sample(2, 1)

console.log(values)
// [-0.7071067811865475,0.7071067811865475]
```

### Sample a callback

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.poly.sample(3, undefined, (point) => point * point)

console.log(values)
// [-0.8660254037844386,0,0.8660254037844386]
```

### Sample using the second distribution

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.poly.sample(2, undefined, undefined, 'second')

console.log(values)
// [-1,1]
```
