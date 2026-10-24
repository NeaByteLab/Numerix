# check

Test whether a data type belongs to a category.

## API

```ts
Numeric.dtype.check(dtype, category = 'numeric')
```

Matches the type against the category members.

- Parameters:
  - `dtype`: Data type name to test
  - `category`: Category the type is tested against
- Returns: True when the type belongs to the category
- NumPy: Covers `np.isdtype`, `np.issubdtype`, `np.isfortran` through a single Numerix method.

## Examples

### Test an integer type

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.dtype.check('int32', 'integer')

console.log(result)
// true
```

### Test a floating point type

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.dtype.check('float32', 'floating')

console.log(result)
// true
```

### Test a mismatched category

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.dtype.check('int32', 'floating')

console.log(result)
// false
```

### Test a type against the numeric category

```ts
import Numeric from '@neabyte/numerix'

const result = Numeric.dtype.check('int32')

console.log(result)
// true
```
