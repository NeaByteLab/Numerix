# kaiser

Build a window shaped by a modified Bessel function.

## API

```ts
Numeric.window.kaiser(length, shape = 14)
```

Generates a window shaped by a Bessel function.

- Parameters:
  - `length`: Window length or lengths to produce
  - `shape`: Shape parameter of the Bessel function
- Returns: Kaiser window values matching the input shape
- NumPy: Covers `np.kaiser`, `np.i0` through a single Numerix method.

## Examples

### Build a window of four samples

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.kaiser(4)

console.log(window)
// [0.000007726866835270368,0.46271649780079116,0.46271649780079116,0.000007726866835270368]
```

### Build a window with a smaller shape

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.kaiser(5, 5)

console.log(window)
// [0.036710892271286676,0.5528517696991324,1,0.5528517696991324,0.036710892271286676]
```

### Evaluate the modified Bessel function

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.window.kaiser(2, 'i0')

console.log(value)
// 2.279585302336067
```

### Evaluate the Bessel function for several values

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.window.kaiser([0, 1, 2])

console.log(values)
// [1,1.2660658777520082,2.279585302336067]
```
