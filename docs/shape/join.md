# join

Concatenate or stack several arrays along a shared axis.

## API

```ts
Numeric.shape.join(arrays, axis = 0, stack = false)
```

Combines several arrays along the requested axis.

- Parameters:
  - `arrays`: Arrays joined together
  - `axis`: Axis along which the arrays are combined
  - `stack`: When true stacks the arrays into a new axis
- Returns: Array holding the combined values
- NumPy: Covers `np.concat`, `np.concatenate`, `np.stack`, `np.vstack`, `np.hstack`, `np.dstack`, `np.column_stack`, `np.block`, `np.unstack` through a single Numerix method.

## Examples

### Concatenate two matrices

```ts
import Numeric from '@neabyte/numerix'

const matrix = Numeric.shape.join([[[1, 2]], [[3, 4]]])

console.log(matrix)
// [[1,2],[3,4]]
```

### Stack two matrices into a new axis

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.join([[[1, 2]], [[3, 4]]], 0, true)

console.log(values)
// [[[1,2]],[[3,4]]]
```

### Concatenate two vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.join([[1, 2], [3, 4]])

console.log(values)
// [1,2,3,4]
```

### Join three vectors

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.shape.join([[1], [2], [3]])

console.log(values)
// [1,2,3]
```
