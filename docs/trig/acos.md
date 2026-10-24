# acos

Compute the inverse cosine of every element in nested numeric inputs.

## API

```ts
Numeric.trig.acos(value)
```

Applies the arccosine function across nested numeric inputs.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Arccosines matching the input nesting shape
- NumPy: Covers `np.acos`, `np.arccos`, `np.emath.arccos` through a single Numerix method.

## Examples

### Arccosine of a single value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.acos(1)

console.log(value)
// 0
```

### Arccosine of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.acos([1, 0])

console.log(values)
// [0,1.5707963267948966]
```

### Arccosine of a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.acos([[1, 0], [0, 1]])

console.log(values)
// [[0,1.5707963267948966],[1.5707963267948966,0]]
```

### Arccosine of a fractional value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.acos(0.5)

console.log(value)
// 1.0471975511965979
```
