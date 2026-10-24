# ihfft

Rebuild a real signal from its half spectrum.

## API

```ts
Numeric.fft.ihfft(values, count)
```

Rebuilds a real signal from its half spectrum.

- Parameters:
  - `values`: Half spectrum of the signal
  - `count`: Length of the produced signal
- Returns: Complex signal of the transformed spectrum
- NumPy: Equivalent to `np.fft.ihfft`.

## Examples

### Rebuild a signal from a half spectrum

```ts
import Numeric from '@neabyte/numerix'

const signal = Numeric.fft.ihfft([1, 1, 1, 1], 4)

console.log(signal)
// [{"re":1,"im":0},{"re":0,"im":0},{"re":0,"im":0}]
```

### Rebuild a signal from one bin

```ts
import Numeric from '@neabyte/numerix'

const signal = Numeric.fft.ihfft([4, 0, 0], 4)

console.log(signal)
// [{"re":1,"im":0},{"re":1,"im":0},{"re":1,"im":0}]
```

### Recover the original signal

```ts
import Numeric from '@neabyte/numerix'

const signal = Numeric.fft.ihfft([1, 1, 1, 1], 4)

console.log(signal.length)
// 3
```

### Rebuild with an explicit signal length

```ts
import Numeric from '@neabyte/numerix'

const signal = Numeric.fft.ihfft([1, 1], 2)

console.log(signal)
// [{"re":1,"im":0},{"re":0,"im":0}]
```
