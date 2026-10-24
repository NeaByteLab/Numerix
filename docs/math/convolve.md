# convolve

Convolve a signal with a kernel using discrete convolution.

## API

```ts
Numeric.math.convolve(signal, kernel, mode = 'full')
```

Computes discrete convolution over the signal entries.

- Parameters:
  - `signal`: Input signal samples to convolve
  - `kernel`: Kernel weights applied across the signal
  - `mode`: Output length mode for the convolution
- Returns: Convolved signal values
- NumPy: Equivalent to `np.convolve`.

## Examples

### Convolve a signal with a kernel

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.convolve([1, 2, 3], [0, 1, 0.5])

console.log(values)
// [0,1,2.5,4,1.5]
```

### Same mode matches the signal length

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.convolve([1, 2, 3], [0, 1, 0.5], 'same')

console.log(values)
// [1,2.5,4]
```

### Valid mode drops the overlapping edges

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.convolve([1, 2, 3], [0, 1, 0.5], 'valid')

console.log(values)
// [2.5]
```

### Convolve with a moving average kernel

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.math.convolve([1, 2, 3, 4], [0.25, 0.5, 0.25], 'same')

console.log(values)
// [1,2,3,2.75]
```
