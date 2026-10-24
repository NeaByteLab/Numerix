# conj

Compute the complex conjugate by negating each imaginary component.

## API

```ts
Numeric.complex.conj(value)
```

Negates the imaginary part of each entry.

- Parameters:
  - `value`: Complex or real values to conjugate
- Returns: Conjugated values matching the input nesting shape
- NumPy: Covers `np.conj`, `np.conjugate`, `ndarray.conj`, `ndarray.conjugate` through a single Numerix method.

## Examples

### Conjugate of a real value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.complex.conj(5)

console.log(value)
// 5
```

### Conjugate of a complex value

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.complex.conj({ re: 3, im: 4 })

console.log(value)
// {"re":3,"im":-4}
```

### Conjugates of a vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.complex.conj([1, 2])

console.log(values)
// [1,2]
```

### Conjugates of complex values

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.complex.conj([
  { re: 1, im: 2 },
  { re: 3, im: -4 }
])

console.log(values)
// [{"re":1,"im":-2},{"re":3,"im":4}]
```
