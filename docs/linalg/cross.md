# cross

Compute the cross product of two vectors.

## API

```ts
Numeric.linalg.cross(left, right)
```

Computes the cross product of the two operands.

- Parameters:
  - `left`: First vector of values
  - `right`: Second vector of values
- Returns: Cross product matching the input shape
- NumPy: Covers `np.cross`, `np.linalg.cross` through a single Numerix method.

## Examples

### Cross product of two unit vectors

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.cross([1, 0, 0], [0, 1, 0])

console.log(value)
// [0,0,1]
```

### Cross product of a vector with itself

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.cross([1, 2, 3], [1, 2, 3])

console.log(value)
// [0,0,0]
```

### Cross product of two dimensional vectors

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.cross([1, 0], [0, 1])

console.log(value)
// 1
```

### Cross product of perpendicular vectors

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.linalg.cross([0, 1, 0], [0, 0, 1])

console.log(value)
// [1,0,0]
```
