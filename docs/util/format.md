# format

Render numbers and nested arrays as text with a chosen notation.

## API

```ts
Numeric.util.format(value, precision = 4, mode = 'fixed', base = 10)
```

Renders numbers using the requested notation.

- Parameters:
  - `value`: Value or array of values to format
  - `precision`: Number of digits kept after the decimal
  - `mode`: Notation used to render the values
  - `base`: Logarithm base for base notation
- Returns: Formatted representation of the value
- NumPy: Covers `np.array2string`, `np.array_repr`, `np.array_str`, `np.format_float_positional`, `np.format_float_scientific`, `np.base_repr`, `np.binary_repr` through a single Numerix method.

## Examples

### Format a number with default precision

```ts
import Numeric from '@neabyte/numerix'

const text = Numeric.util.format(3.14159)

console.log(text)
// 3.1416
```

### Keep two digits after the decimal

```ts
import Numeric from '@neabyte/numerix'

const text = Numeric.util.format(3.14159, 2)

console.log(text)
// 3.14
```

### Render a value in scientific notation

```ts
import Numeric from '@neabyte/numerix'

const text = Numeric.util.format(1234.5, 3, 'scientific')

console.log(text)
// 1.234e+03
```

### Render a value in another base

```ts
import Numeric from '@neabyte/numerix'

const text = Numeric.util.format(255, 0, 'base', 16)

console.log(text)
// FF
```

### Format an array of values

```ts
import Numeric from '@neabyte/numerix'

const text = Numeric.util.format([1.5, 2.25], 2)

console.log(text)
// [1.5, 2.25]
```
