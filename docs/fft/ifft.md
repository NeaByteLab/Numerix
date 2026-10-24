# ifft

Compute the inverse discrete Fourier transform of a spectrum.

## API

```ts
Numeric.fft.ifft(spectrum, axis)
```

Transforms a spectrum back into signal samples.

- Parameters:
  - `spectrum`: Frequency spectrum to transform
  - `axis`: Axes along which the transform runs, or `all` for every axis
- Returns: Complex signal of the transformed spectrum
- NumPy: Covers `np.fft.ifft`, `np.fft.ifft2`, `np.fft.ifftn` through a single Numerix method.

## Examples

### Transform a flat spectrum

```ts
import Numeric from '@neabyte/numerix'

const signal = Numeric.fft.ifft([4, 0, 0, 0])

console.log(signal)
// [{"re":1,"im":0},{"re":1,"im":0},{"re":1,"im":0},{"re":1,"im":0}]
```

### Recover the original signal

```ts
import Numeric from '@neabyte/numerix'

const signal = Numeric.fft.ifft(Numeric.fft.forward([1, 2, 3, 4]))

console.log(signal)
// [{"re":1,"im":0},{"re":2,"im":5.721188726109833e-18},{"re":3,"im":0},{"re":4,"im":-5.721188726109833e-18}]
```

### Transform a single spectrum bin

```ts
import Numeric from '@neabyte/numerix'

const signal = Numeric.fft.ifft([1, 0, 0, 0])

console.log(signal)
// [{"re":0.25,"im":0},{"re":0.25,"im":0},{"re":0.25,"im":0},{"re":0.25,"im":0}]
```

### Transform a matrix of spectra

```ts
import Numeric from '@neabyte/numerix'

const signal = Numeric.fft.ifft([[4, 0], [0, 0]])

console.log(signal)
// [[{"re":2,"im":0},{"re":2,"im":0}],[{"re":0,"im":0},{"re":0,"im":0}]]
```
