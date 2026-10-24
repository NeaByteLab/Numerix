# rfft

Compute the transform of a real signal.

## API

```ts
Numeric.fft.rfft(values, axis)
```

Produces the positive bins of a real signal.

- Parameters:
  - `values`: Real signal samples to transform
  - `axis`: Axes along which the transform runs, or `all` for every axis
- Returns: Complex spectrum of the transformed signal
- NumPy: Covers `np.fft.rfft`, `np.fft.rfft2`, `np.fft.rfftn` through a single Numerix method.

## Examples

### Transform a real signal

```ts
import Numeric from '@neabyte/numerix'

const spectrum = Numeric.fft.rfft([1, 2, 3, 4])

console.log(spectrum)
// [{"re":10,"im":0},{"re":-2,"im":2},{"re":-2,"im":0}]
```

### Transform a constant signal

```ts
import Numeric from '@neabyte/numerix'

const spectrum = Numeric.fft.rfft([1, 1, 1, 1])

console.log(spectrum)
// [{"re":4,"im":0},{"re":0,"im":0},{"re":0,"im":0}]
```

### Transform an impulse signal

```ts
import Numeric from '@neabyte/numerix'

const spectrum = Numeric.fft.rfft([1, 0, 0, 0])

console.log(spectrum)
// [{"re":1,"im":0},{"re":1,"im":0},{"re":1,"im":0}]
```

### Transform a longer signal

```ts
import Numeric from '@neabyte/numerix'

const spectrum = Numeric.fft.rfft([1, 2, 3, 4, 5, 6, 7, 8])

console.log(spectrum)
// [{"re":36,"im":0},{"re":-4,"im":9.65685424949238},{"re":-4,"im":4},{"re":-4,"im":1.6568542494923797},{"re":-4,"im":0}]
```
