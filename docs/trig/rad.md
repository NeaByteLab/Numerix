# rad

Convert angles from degrees into radians for every nested element.

## API

```ts
Numeric.trig.rad(value)
```

Scales each element by the degree to radian factor.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Radians matching the input nesting shape
- NumPy: Covers `np.radians`, `np.deg2rad` through a single Numerix method.

## Examples

### Convert a single angle

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.rad(180)

console.log(value)
// 3.141592653589793
```

### Convert a vector of angles

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.rad([0, 90, 180])

console.log(values)
// [0,1.5707963267948966,3.141592653589793]
```

### Convert a matrix of angles

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.rad([[0, 180], [180, 0]])

console.log(values)
// [[0,3.141592653589793],[3.141592653589793,0]]
```

### Convert a negative angle

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.rad(-90)

console.log(value)
// -1.5707963267948966
```
