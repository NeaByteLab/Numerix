# angle

Report the phase angle of real and complex values in nested inputs.

## API

```ts
Numeric.complex.angle(value, degrees = false)
```

Reports the argument of each nested entry.

- Parameters:
  - `value`: Complex or real values to inspect
  - `degrees`: When true returns the angle in degrees
- Returns: Phase angles matching the input nesting shape
- NumPy: Equivalent to `np.angle`.

## Examples

### Angle of a real value

```ts
import Numeric from '@neabyte/numerix'

const angle = Numeric.complex.angle(1)

console.log(angle)
// 0
```

### Angle of a complex value

```ts
import Numeric from '@neabyte/numerix'

const angle = Numeric.complex.angle({ re: 1, im: 1 })

console.log(angle)
// 0.7853981633974483
```

### Angle reported in degrees

```ts
import Numeric from '@neabyte/numerix'

const angle = Numeric.complex.angle({ re: 1, im: 1 }, true)

console.log(angle)
// 45
```

### Angles of a vector of complex values

```ts
import Numeric from '@neabyte/numerix'

const angles = Numeric.complex.angle([
  { re: 1, im: 0 },
  { re: 0, im: 1 }
])

console.log(angles)
// [0,1.5707963267948966]
```
