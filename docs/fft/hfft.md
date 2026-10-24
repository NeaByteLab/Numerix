# hfft

Compute the half spectrum of a real signal.

## API

```ts
Numeric.fft.hfft(values, count)
```

Produces the half spectrum of a real signal.

- Parameters:
  - `values`: Real signal samples to transform
  - `count`: Length of the produced spectrum
- Returns: Complex spectrum of the transformed signal
- NumPy: Equivalent to `np.fft.hfft`.

## Examples

### Transform a real signal

```ts
import Numeric from '@neabyte/numerix'

const spectrum = Numeric.fft.hfft([1, 2, 3, 4])

console.log(spectrum)
// [15,-4,-2.220446049250313e-16,-1,8.881784197001252e-16,-3.9999999999999902]
```

### Transform a constant signal

```ts
import Numeric from '@neabyte/numerix'

const spectrum = Numeric.fft.hfft([1, 1, 1, 1])

console.log(spectrum)
// [6,-8.326672684688674e-16,-2.220446049250313e-16,0,8.881784197001252e-16,3.9968028886505635e-15]
```

### Transform an impulse signal

```ts
import Numeric from '@neabyte/numerix'

const spectrum = Numeric.fft.hfft([1, 0, 0, 0])

console.log(spectrum)
// [1,1,1,1,1,1]
```

### Transform with an explicit spectrum length

```ts
import Numeric from '@neabyte/numerix'

const spectrum = Numeric.fft.hfft([1, 2], 4)

console.log(spectrum)
// [5,1,-3,1]
```
