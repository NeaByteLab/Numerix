# squeeze

Remove length one dimensions from a nested array.

## API

```ts
Numeric.shape.squeeze(input)
```

Removes single entry dimensions from the array.

- Parameters:
  - `input`: Nested array to squeeze
- Returns: Array without the single entry dimensions
- NumPy: Covers `np.squeeze`, `ndarray.squeeze` through a single Numerix method.

## Examples

### Squeeze a column vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.squeeze([[1], [2]])

console.log(values)
// [1,2]
```

### Squeeze a single row matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.squeeze([[1, 2]])

console.log(values)
// [1,2]
```

### Squeeze a nested single entry dimension

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.squeeze([[[1, 2]]])

console.log(values)
// [1,2]
```

### Squeeze a plain vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.squeeze([1, 2, 3])

console.log(values)
// [1,2,3]
```
