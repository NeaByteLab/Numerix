# range

Generate evenly spaced values between two numeric bounds.

## API

```ts
Numeric.create.range(start, stop, step = 1)
```

Generates evenly spaced values between two bounds.

- Parameters:
  - `start`: First value or lower bound
  - `stop`: Upper bound when separate from the start
  - `step`: Spacing between generated values
- Returns: Array of generated values
- NumPy: Equivalent to `np.arange`.

## Examples

### Range between two bounds

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.range(0, 5)

console.log(values)
// [0,1,2,3,4]
```

### Range with a single bound

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.range(3)

console.log(values)
// [0,1,2]
```

### Range with a custom step

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.range(0, 10, 2)

console.log(values)
// [0,2,4,6,8]
```

### Descending range with a negative step

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.range(5, 0, -1)

console.log(values)
// [5,4,3,2,1]
```
