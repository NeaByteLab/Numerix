# info

Describe the range and storage details of a data type.

## API

```ts
Numeric.dtype.info(input = 'float64')
```

Reports the range and storage details of a type.

- Parameters:
  - `input`: Data type name or value to describe
- Returns: Descriptor of the requested data type
- NumPy: Covers `np.finfo`, `np.iinfo`, `np.shape`, `np.ndim`, `np.size`, `ndarray.shape`, `ndarray.ndim`, `ndarray.size`, `ndarray.dtype`, `ndarray.itemsize`, `ndarray.nbytes` through a single Numerix method.

## Examples

### Describe an unsigned byte type

```ts
import Numeric from '@neabyte/numerix'

const descriptor = Numeric.dtype.info('uint8')

console.log(descriptor)
// {"dtype":"uint8","bits":8,"itemSize":1,"min":0,"max":255,"eps":1,"shape":[],"ndim":0,"size":0,"nbytes":0}
```

### Describe the default floating point type

```ts
import Numeric from '@neabyte/numerix'

const descriptor = Numeric.dtype.info('float64')

console.log(descriptor)
// {"dtype":"float64","bits":64,"itemSize":8,"min":-1.7976931348623157e+308,"max":1.7976931348623157e+308,"eps":2.220446049250313e-16,"shape":[],"ndim":0,"size":0,"nbytes":0}
```

### Describe an array of values

```ts
import Numeric from '@neabyte/numerix'

const descriptor = Numeric.dtype.info([1, 2, 3])

console.log(descriptor)
// {"dtype":"float64","bits":64,"itemSize":8,"min":-1.7976931348623157e+308,"max":1.7976931348623157e+308,"eps":2.220446049250313e-16,"shape":[3],"ndim":1,"size":3,"nbytes":24}
```

### Describe a single floating point value

```ts
import Numeric from '@neabyte/numerix'

const descriptor = Numeric.dtype.info(1.5)

console.log(descriptor)
// {"dtype":"float64","bits":64,"itemSize":8,"min":-1.7976931348623157e+308,"max":1.7976931348623157e+308,"eps":2.220446049250313e-16,"shape":[],"ndim":0,"size":1,"nbytes":8}
```
