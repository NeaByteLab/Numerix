# asin

Compute the inverse sine of every element in nested numeric inputs.

## API

```ts
Numeric.trig.asin(value)
```

Applies the arcsine function across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Arcsines matching the input nesting shape
- NumPy: Covers `np.asin`, `np.arcsin`, `np.emath.arcsin` through a single Numerix method.

## Examples

### Arcsine of a single value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.asin(0)

console.log(value)
// 0
```

### Arcsine of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.asin([0, 1])

console.log(values)
// [0,1.5707963267948966]
```

### Arcsine of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.asin([[0, 1], [1, 0]])

console.log(values)
// [[0,1.5707963267948966],[1.5707963267948966,0]]
```

### Arcsine of a fractional value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.asin(0.5)

console.log(value)
// 0.5235987755982989
```
