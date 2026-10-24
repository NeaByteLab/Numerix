# copy

Clone nested values into fresh array containers.

## API

```ts
Numeric.create.copy(source, target)
```

Clones nested values into a fresh container.

- Parameters:
  - `source`: Value to copy
  - `target`: Array receiving the copied values
- Returns: Copied value
- NumPy: Covers `np.copy`, `np.copyto`, `ndarray.copy`, `ndarray.tolist` through a single Numerix method.

## Examples

### Copy a matrix into a new container

```ts
import Numeric from '@neabyte/numerix'

const copy = Numeric.create.copy([[1, 2]], [[9, 9]])

console.log(copy)
// [[1,2]]
```

### Copy a plain vector

```ts
import Numeric from '@neabyte/numerix'

const copy = Numeric.create.copy([1, 2, 3])

console.log(copy)
// [1,2,3]
```

### Copy deeply nested values

```ts
import Numeric from '@neabyte/numerix'

const copy = Numeric.create.copy([[1, [2]], [3, [4]]])

console.log(copy)
// [[1,[2]],[3,[4]]]
```

### Copy into a target array

```ts
import Numeric from '@neabyte/numerix'

const target = [0, 0]
const copy = Numeric.create.copy([5, 6], target)

console.log(copy)
// [5,6]
console.log(target)
// [5,6]
```
