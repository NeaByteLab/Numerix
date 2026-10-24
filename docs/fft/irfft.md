# irfft

Rebuild a real signal from its frequency spectrum.

## API

```ts
Numeric.fft.irfft(spectrum, count, axis)
```

Rebuilds a real signal from its frequency spectrum.

- Parameters:
  - `spectrum`: Frequency spectrum to transform
  - `count`: Length of the produced signal
  - `axis`: Axes along which the transform runs, or `all` for every axis
- Returns: Real signal of the transformed spectrum
- NumPy: Covers `np.fft.irfft`, `np.fft.irfft2`, `np.fft.irfftn` through a single Numerix method.

## Examples

### Rebuild a signal from a flat spectrum

```ts
import Numeric from '@neabyte/numerix'

const signal = Numeric.fft.irfft([1, 1, 1, 1], 4)

console.log(signal)
// [1,0,0,0]
```

### Recover the original real signal

```ts
import Numeric from '@neabyte/numerix'

const signal = Numeric.fft.irfft(Numeric.fft.rfft([1, 2, 3, 4]), 4)

console.log(signal)
// [1,2,3,4]
```

### Rebuild a signal from one bin

```ts
import Numeric from '@neabyte/numerix'

const signal = Numeric.fft.irfft([4, 0, 0], 4)

console.log(signal)
// [1,1,1,1]
```

### Rebuild a signal with an explicit length

```ts
import Numeric from '@neabyte/numerix'

const signal = Numeric.fft.irfft([1, 1, 1], 6)

console.log(signal)
// [0.8333333333333333,0.16666666666666652,-0.16666666666666666,0.16666666666666666,-0.16666666666666652,0.16666666666666732]
```
