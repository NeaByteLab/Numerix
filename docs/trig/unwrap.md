# unwrap

Unwrap phase angles so consecutive jumps stay below a threshold.

## API

```ts
Numeric.trig.unwrap(phases, discontinuity = Math.PI, period = 2 * Math.PI)
```

Removes jumps larger than the discontinuity threshold.

- Parameters:
  - `phases`: Phase angles to unwrap
  - `discontinuity`: Largest jump treated as a wrap
  - `period`: Length of one full angle cycle
- Returns: Unwrapped phases matching the input nesting shape
- NumPy: Equivalent to `np.unwrap`.

## Examples

### Unwrap a phase sequence

```ts
import Numeric from '@neabyte/numerix'

const phases = Numeric.trig.unwrap([0, 1, 3.5, 4])

console.log(phases)
// [0,1,3.5,4]
```

### Unwrap a jump across the boundary

```ts
import Numeric from '@neabyte/numerix'

const phases = Numeric.trig.unwrap([3, 4, -3])

console.log(phases)
// [3,4,3.2831853071795862]
```

### Unwrap with a custom threshold

```ts
import Numeric from '@neabyte/numerix'

const phases = Numeric.trig.unwrap([0, 2, 4], Math.PI / 2)

console.log(phases)
// [0,2,4]
```

### Unwrap a single phase

```ts
import Numeric from '@neabyte/numerix'

const phases = Numeric.trig.unwrap([1.5])

console.log(phases)
// [1.5]
```
