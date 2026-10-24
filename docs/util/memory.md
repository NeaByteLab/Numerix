# memory

Inspect array memory layout or test whether two buffers overlap.

## API

```ts
Numeric.util.memory(left, right)
```

Reports strides and ordering for an array.

- Parameters:
  - `left`: Array whose layout is inspected
  - `right`: Array compared against the first one
- Returns: Layout descriptor or a shared memory flag
- NumPy: Covers `np.shares_memory`, `np.may_share_memory`, `ndarray.data`, `ndarray.base`, `ndarray.strides`, `ndarray.flags`, `ndarray.setflags` through a single Numerix method.

## Examples

### Inspect the layout of a matrix

```ts
import Numeric from '@neabyte/numerix'

const layout = Numeric.util.memory([
  [1, 2],
  [3, 4]
])

console.log(layout)
// {"strides":[16,8],"cContiguous":true,"fContiguous":false,"writable":true,"aligned":true}
```

### Inspect the layout of a vector

```ts
import Numeric from '@neabyte/numerix'

const layout = Numeric.util.memory([1, 2, 3])

console.log(layout)
// {"strides":[8],"cContiguous":true,"fContiguous":true,"writable":true,"aligned":true}
```

### Test two views of the same buffer

```ts
import Numeric from '@neabyte/numerix'

const buffer = new ArrayBuffer(64)
const first = new Float64Array(buffer, 0, 4)
const second = new Float64Array(buffer, 16, 4)

console.log(Numeric.util.memory(first, second))
// true
```

### Test two views of separate buffers

```ts
import Numeric from '@neabyte/numerix'

const buffer = new ArrayBuffer(64)
const first = new Float64Array(buffer, 0, 4)
const second = new Float64Array(buffer, 32, 4)

console.log(Numeric.util.memory(first, second))
// false
```
