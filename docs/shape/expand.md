# expand

Insert a new axis into a nested array at the requested position.

## API

```ts
Numeric.shape.expand(input, axis = 0)
```

Adds a single entry axis to the array.

- Parameters:
  - `input`: Nested array to expand
  - `axis`: Position where the new axis is inserted
- Returns: Array with the additional dimension
- NumPy: Covers `np.expand_dims`, `np.atleast_1d`, `np.atleast_2d`, `np.atleast_3d` through a single Numerix method.

## Examples

### Add a leading axis

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.expand([1, 2], 0)

console.log(values)
// [[1,2]]
```

### Add a trailing axis

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.expand([1, 2], 1)

console.log(values)
// [[1],[2]]
```

### Add an axis to a matrix

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.expand([[1, 2]], 0)

console.log(values)
// [[[1,2]]]
```

### Add a middle axis

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.expand([[1, 2]], 1)

console.log(values)
// [[[1,2]]]
```
