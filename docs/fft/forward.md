# forward

Compute the discrete Fourier transform of a signal.

## API

```ts
Numeric.fft.forward(values, axis)
```

Applies the radix two transform to the signal samples.

- Parameters:
  - `values`: Signal samples to transform
  - `axis`: Axes along which the transform runs, or `all` for every axis
- Returns: Complex spectrum of the transformed signal
- NumPy: Covers `np.fft.fft`, `np.fft.fft2`, `np.fft.fftn` through a single Numerix method.

## Examples

### Transform a signal

```ts
import Numeric from '@neabyte/numerix'

const spectrum = Numeric.fft.forward([1, 2, 3, 4])

console.log(spectrum)
// [{"re":10,"im":0},{"re":-2,"im":2},{"re":-2,"im":0},{"re":-1.9999999999999998,"im":-2}]
```

### Transform an impulse signal

```ts
import Numeric from '@neabyte/numerix'

const spectrum = Numeric.fft.forward([1, 0, 0, 0])

console.log(spectrum)
// [{"re":1,"im":0},{"re":1,"im":0},{"re":1,"im":0},{"re":1,"im":0}]
```

### Transform a matrix of signals

```ts
import Numeric from '@neabyte/numerix'

const spectrum = Numeric.fft.forward([[1, 2], [3, 4]])

console.log(spectrum)
// [[{"re":3,"im":0},{"re":-1,"im":0}],[{"re":7,"im":0},{"re":-1,"im":0}]]
```

### Transform a constant signal

```ts
import Numeric from '@neabyte/numerix'

const spectrum = Numeric.fft.forward([1, 1, 1, 1])

console.log(spectrum)
// [{"re":4,"im":0},{"re":0,"im":0},{"re":0,"im":0},{"re":0,"im":0}]
```
