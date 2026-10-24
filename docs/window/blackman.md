# blackman

Build a symmetric Blackman cosine window.

## API

```ts
Numeric.window.blackman(length)
```

Generates a cosine window of the given length.

- Parameters:
  - `length`: Number of window samples to produce
- Returns: Blackman window values
- NumPy: Equivalent to `np.blackman`.

## Examples

### Build a window of four samples

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.blackman(4)

console.log(window)
// [-1.3877787807814457e-17,0.6299999999999999,0.6299999999999999,-1.3877787807814457e-17]
```

### Build a window of five samples

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.blackman(5)

console.log(window)
// [-1.3877787807814457e-17,0.3399999999999999,0.9999999999999999,0.3399999999999999,-1.3877787807814457e-17]
```

### Build a window of two samples

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.blackman(2)

console.log(window)
// [-1.3877787807814457e-17,-1.3877787807814457e-17]
```

### Build a single sample window

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.blackman(1)

console.log(window)
// [1]
```
