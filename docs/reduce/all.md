# all

Check whether every entry along an axis is truthy.

## API

```ts
Numeric.reduce.all(values, axis)
```

Tests whether all entries of the array hold a truthy value.

- Parameters:
  - `values`: Vector or matrix of input values
  - `axis`: Axis along which the test is applied
- Returns: True when every entry holds a truthy value
- NumPy: Covers `np.all`, `ndarray.all` through a single Numerix method.

## Examples

### Check a vector of truthy values

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.reduce.all([1, 1])

console.log(result)
// true
```

### Check a vector with a falsy value

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.reduce.all([1, 0])

console.log(result)
// false
```

### Check each matrix column

```ts
import Numeric from '@neabyte/numerix'

const results = Numeric.reduce.all([[1, 1], [1, 0]], 0)

console.log(results)
// [true,false]
```

### Check an empty vector

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.reduce.all([])

console.log(result)
// true
```
