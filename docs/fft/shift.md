# shift

Move the zero frequency bin to the edge of the spectrum.

## API

```ts
Numeric.fft.shift(values, inverse = false)
```

Moves the zero frequency bin to the array edge.

- Parameters:
  - `values`: Spectral values to reorder
  - `inverse`: When true reverses the shift direction
- Returns: Reordered spectral values
- NumPy: Covers `np.fft.fftshift`, `np.fft.ifftshift` through a single Numerix method.

## Examples

### Shift the bins forward

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.fft.shift([0, 1, 2, 3])

console.log(values)
// [2,3,0,1]
```

### Shift the bins backward

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.fft.shift([0, 1, 2, 3], true)

console.log(values)
// [2,3,0,1]
```

### Shift a longer spectrum

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.fft.shift([0, 1, 2, 3, 4, 5])

console.log(values)
// [3,4,5,0,1,2]
```

### Shift a single bin

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.fft.shift([7])

console.log(values)
// [7]
```
