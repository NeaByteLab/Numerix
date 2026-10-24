# bartlett

Build a symmetric triangular window.

## API

```ts
Numeric.window.bartlett(length)
```

Generates a triangular window of the given length.

- Parameters:
  - `length`: Number of window samples to produce
- Returns: Bartlett window values
- NumPy: Equivalent to `np.bartlett`.

## Examples

### Build a window of four samples

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.bartlett(4)

console.log(window)
// [0,0.6666666666666666,0.6666666666666666,0]
```

### Build a window of five samples

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.bartlett(5)

console.log(window)
// [0,0.5,1,0.5,0]
```

### Build a window of two samples

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.bartlett(2)

console.log(window)
// [0,0]
```

### Build a single sample window

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.bartlett(1)

console.log(window)
// [1]
```
