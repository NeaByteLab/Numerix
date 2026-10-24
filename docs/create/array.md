# array

Build an array from numeric, textual, or binary source data.

## API

```ts
Numeric.create.array(source, dims = 0, offset = 0)
```

Reshapes binary, textual, or numeric sources.

- Parameters:
  - `source`: Data used to populate the array
  - `dims`: Target dimensions or binary buffer
  - `offset`: Starting position within the source buffer
- Returns: Array holding the source values
- NumPy: Covers `np.array`, `np.asarray`, `np.asanyarray`, `np.asarray_chkfinite`, `np.ascontiguousarray`, `np.asfortranarray`, `np.require`, `np.astype` through a single Numerix method.

## Examples

### Array from a plain vector

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.array([1, 2, 3])

console.log(values)
// [1,2,3]
```

### Array nested to a given depth

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.array([1, 2], 2)

console.log(values)
// [[1,2]]
```

### Array from a binary buffer

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.array(new Uint8Array([1, 2, 3]), 1)

console.log(values)
// [1,2,3]
```

### Array keeping the source text intact

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.create.array('1 2 3')

console.log(values)
// 1 2 3
```
