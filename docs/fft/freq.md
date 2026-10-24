# freq

Compute the frequency of each spectral bin.

## API

```ts
Numeric.fft.freq(count, spacing = 1, real = false)
```

Reports the frequency of each spectral bin.

- Parameters:
  - `count`: Number of bins in the transform
  - `spacing`: Sample spacing of the original signal
  - `real`: When true returns only the positive bins
- Returns: Frequency of each spectral bin
- NumPy: Covers `np.fft.fftfreq`, `np.fft.rfftfreq` through a single Numerix method.

## Examples

### Frequencies of four bins

```ts
import Numeric from '@neabyte/numerix'

const frequencies = Numeric.fft.freq(4)

console.log(frequencies)
// [0,0.25,-0.5,-0.25]
```

### Frequencies with a sample spacing

```ts
import Numeric from '@neabyte/numerix'

const frequencies = Numeric.fft.freq(4, 0.5)

console.log(frequencies)
// [0,0.5,-1,-0.5]
```

### Frequencies of the positive bins

```ts
import Numeric from '@neabyte/numerix'

const frequencies = Numeric.fft.freq(4, 1, true)

console.log(frequencies)
// [0,0.25,0.5]
```

### Frequencies of a single bin

```ts
import Numeric from '@neabyte/numerix'

const frequencies = Numeric.fft.freq(1)

console.log(frequencies)
// [0]
```
