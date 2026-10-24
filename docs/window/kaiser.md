# kaiser

Build a window shaped by a modified Bessel function.

## API

```ts
Numeric.window.kaiser(length, beta = 14)
```

Generates a window shaped by a Bessel function.

- Parameters:
  - `length`: Window length or lengths to produce
  - `beta`: Shape parameter of the Bessel function
- Returns: Kaiser window values matching the input shape
- NumPy: Covers `np.kaiser`, `np.i0` through a single Numerix method.

## Examples

### Build a window of four samples

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.kaiser(4)

console.log(window)
// [0.000007726866835270366,0.46271649780079094,0.46271649780079094,0.000007726866835270366]
```

### Build a window with a smaller beta

```ts
import Numeric from '@neabyte/numerix'

const window = Numeric.window.kaiser(5, 5)

console.log(window)
// [0.03671089227128667,0.5528517696991324,1,0.5528517696991324,0.03671089227128667]
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
