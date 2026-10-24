# hanning

Build a symmetric raised cosine window.

## API

```ts
Numeric.window.hanning(length)
```

Generates a symmetric raised cosine window.

- Parameters:
  - `length`: Number of window samples to produce
- Returns: Hanning window values
- NumPy: Equivalent to `np.hanning`.

## Examples

### Build a window of four samples

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.hanning(4)

console.log(window)
// [0,0.7499999999999999,0.7499999999999999,0]
```

### Build a window of five samples

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.hanning(5)

console.log(window)
// [0,0.49999999999999994,1,0.49999999999999994,0]
```

### Build a window of two samples

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.hanning(2)

console.log(window)
// [0,0]
```

### Build a single sample window

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.hanning(1)

console.log(window)
// [1]
```
