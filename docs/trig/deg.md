# deg

Convert angles from radians into degrees for every nested element.

## API

```ts
Numeric.trig.deg(value)
```

Scales each element by the radian to degree factor.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
- Returns: Degrees matching the input nesting shape
- NumPy: Covers `np.degrees`, `np.rad2deg` through a single Numerix method.

## Examples

### Convert a single angle

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.deg(Math.PI)

console.log(value)
// 180
```

### Convert a vector of angles

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.deg([0, Math.PI / 2, Math.PI])

console.log(values)
// [0,90,180]
```

### Convert a matrix of angles

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.deg([[0, Math.PI], [Math.PI, 0]])

console.log(values)
// [[0,180],[180,0]]
```

### Convert a negative angle

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.deg(-Math.PI)

console.log(value)
// -180
```
