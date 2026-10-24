# atan

Compute the inverse tangent, using atan2 when two operands are given.

## API

```ts
Numeric.trig.atan(opposite, adjacent)
```

Uses atan2 when both operands are supplied.

- Parameters:
  - `opposite`: Numerator of the tangent ratio
  - `adjacent`: Denominator of the tangent ratio when given
- Returns: Arctangent values matching the input nesting shape
- NumPy: Covers `np.atan`, `np.arctan`, `np.atan2`, `np.arctan2` through a single Numerix method.

## Examples

### Arctangent of a single value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.atan(1)

console.log(value)
// 0.7853981633974483
```

### Arctangent of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.trig.atan([0, 1])

console.log(values)
// [0,0.7853981633974483]
```

### Two argument form uses atan2

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.atan(1, 1)

console.log(value)
// 0.7853981633974483
```

### Two argument form resolves the quadrant

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.trig.atan(-1, -1)

console.log(value)
// -2.356194490192345
```
