# flatten

Flatten nested values into a single vector.

## API

```ts
Numeric.shape.flatten(input)
```

Flattens nested values into one vector.

- Parameters:
  - `input`: Nested array to flatten
- Returns: Vector holding every nested value
- NumPy: Covers `np.ravel`, `ndarray.flatten`, `ndarray.ravel`, `ndarray.flat` through a single Numerix method.

## Examples

### Flatten a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.flatten([[1, 2], [3, 4]])

console.log(values)
// [1,2,3,4]
```

### Flatten a three dimensional array

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.flatten([[[1, 2]], [[3, 4]]])

console.log(values)
// [1,2,3,4]
```

### Flatten a plain vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.flatten([1, 2, 3])

console.log(values)
// [1,2,3]
```

### Flatten an empty matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.flatten([[], []])

console.log(values)
// []
```
