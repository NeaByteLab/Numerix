# real

Extract the real component from real and complex values.

## API

```ts
Numeric.complex.real(value)
```

Reads the real component of each nested entry.

- Parameters:
  - `value`: Complex or real values to inspect
- Returns: Real parts matching the input nesting shape
- NumPy: Covers `np.real`, `np.real_if_close`, `ndarray.real` through a single Numerix method.

## Examples

### Real part of a real value

```ts
import Numeric from '@neabyte/numerix'

const part = Numeric.complex.real(5)

console.log(part)
// 5
```

### Real part of a complex value

```ts
import Numeric from '@neabyte/numerix'

const part = Numeric.complex.real({ re: 3, im: 4 })

console.log(part)
// 3
```

### Real parts of a vector

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.complex.real([1, 2])

console.log(parts)
// [1,2]
```

### Real parts of complex values

```ts
import Numeric from '@neabyte/numerix'

const parts = Numeric.complex.real([
  { re: 1, im: 2 },
  { re: 3, im: 4 }
])

console.log(parts)
// [1,3]
```
