# sign

Report the sign of every element using magnitude, boolean, or bit mode.

## API

```ts
Numeric.math.sign(value, mode)
```

Reports sign as magnitude, boolean, or bit pattern.

- Parameters:
  - `value`: Scalar, vector, or matrix input values
  - `mode`: Sign reporting variant applied to each element
- Returns: Sign values matching the input nesting shape
- NumPy: Covers `np.sign`, `np.signbit`, `np.copysign`, `np.positive`, `np.negative` through a single Numerix method.

## Examples

### Sign of a scalar

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.sign(-5)

console.log(value)
// -1
```

### Signs of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.sign([-2, 0, 5])

console.log(values)
// [-1,0,1]
```

### Bit mode reports the sign bit

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.sign(-2, 'bit')

console.log(value)
// true
```

### Positive mode keeps the magnitude unchanged

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.sign(-2, 'pos')

console.log(value)
// -2
```

### Negative mode flips the magnitude sign

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.math.sign(2, 'neg')

console.log(value)
// -2
```
