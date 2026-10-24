# any

Check whether any entry along an axis is truthy.

## API

```ts
Numeric.reduce.any(values, axis)
```

Tests whether any entry of the array holds a truthy value.

- Parameters:
  - `values`: Vector or matrix of input values
  - `axis`: Axis along which the test is applied
- Returns: True when at least one entry holds a truthy value
- NumPy: Covers `np.any`, `ndarray.any` through a single Numerix method.

## Examples

### Check a vector with a truthy value

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.reduce.any([0, 1])

console.log(result)
// true
```

### Check a vector of falsy values

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.reduce.any([0, 0])

console.log(result)
// false
```

### Check each matrix column

```ts
import Numeric from '@neabyte/numerix'

const results = Numeric.reduce.any([[1, 0], [0, 0]], 0)

console.log(results)
// [true,false]
```

### Check an empty vector

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.reduce.any([])

console.log(result)
// false
```
