# hamming

Build a symmetric cosine window.

## API

```ts
Numeric.window.hamming(length)
```

Generates a symmetric cosine window.

- Parameters:
  - `length`: Number of window samples to produce
- Returns: Hamming window values
- NumPy: Equivalent to `np.hamming`.

## Examples

### Build a window of four samples

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.hamming(4)

console.log(window)
// [0.08000000000000002,0.7699999999999999,0.7699999999999999,0.08000000000000002]
```

### Build a window of five samples

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.hamming(5)

console.log(window)
// [0.08000000000000002,0.54,1,0.54,0.08000000000000002]
```

### Build a window of two samples

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.hamming(2)

console.log(window)
// [0.08000000000000002,0.08000000000000002]
```

### Build a single sample window

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.hamming(1)

console.log(window)
// [1]
```
