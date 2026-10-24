# cast

Cast values to a target data type.

## API

```ts
Numeric.dtype.cast(input, target = 'float64')
```

Converts values or checks cast compatibility.

- Parameters:
  - `input`: Values to cast or type name to check
  - `target`: Target data type name
- Returns: Cast values or a cast compatibility flag
- NumPy: Covers `np.can_cast`, `np.promote_types`, `np.result_type`, `np.common_type`, `np.min_scalar_type`, `np.mintypecode`, `ndarray.astype`, `ndarray.view`, `ndarray.getfield`, `ndarray.setfield` through a single Numerix method.

## Examples

### Cast values to an integer type

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.dtype.cast([1.7, 2.2], 'int32')

console.log(values)
// [1,2]
```

### Cast values to a boolean type

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.dtype.cast([1, 0, 2], 'bool')

console.log(values)
// [1,0,1]
```

### Check whether a cast is allowed

```ts
import Numeric from '@neabyte/numerix'

const allowed = Numeric.dtype.cast('int32', 'float64')

console.log(allowed)
// true
```

### Infer the type of a number

```ts
import Numeric from '@neabyte/numerix'

const dtype = Numeric.dtype.cast(5)

console.log(dtype)
// uint8
```
