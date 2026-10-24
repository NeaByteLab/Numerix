# imag

Extract the imaginary component from real and complex values.

## API

```ts
Numeric.complex.imag(value)
```

Reads the imaginary component of each nested entry.

- Parameters:
  - `value`: Complex or real values to inspect
- Returns: Imaginary parts matching the input nesting shape
- NumPy: Covers `np.imag`, `ndarray.imag` through a single Numerix method.

## Examples

### Imaginary part of a real value

```ts
import Numeric from '@neabyte/numerix'

const part = Numeric.complex.imag(5)

console.log(part)
// 0
```

### Imaginary part of a complex value

```ts
import Numeric from '@neabyte/numerix'

const part = Numeric.complex.imag({ re: 3, im: 4 })

console.log(part)
// 4
```

### Imaginary parts of a vector

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.complex.imag([1, 2])

console.log(parts)
// [0,0]
```

### Imaginary parts of complex values

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.complex.imag([
  { re: 1, im: 2 },
  { re: 3, im: 4 }
])

console.log(parts)
// [2,4]
```
