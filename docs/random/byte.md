# byte

Fill a byte buffer with random values.

## API

```ts
Numeric.random.byte(length, generator)
```

Fills a byte buffer with uniform random values.

- Parameters:
  - `length`: Number of bytes to generate
  - `generator`: Generator supplying uniform samples
- Returns: Buffer of random byte values
- NumPy: Equivalent to `Generator.bytes`.

## Examples

### Generate four bytes

```ts
import Numeric from '@neabyte/numerix'

const bytes = Numeric.random.byte(4, Numeric.random.seed(42))

console.log(Array.from(bytes))
// [0,169,28,217]
```

### Generate a single byte

```ts
import Numeric from '@neabyte/numerix'

const bytes = Numeric.random.byte(1, Numeric.random.seed(42))

console.log(Array.from(bytes))
// [0]
```

### Generate an empty buffer

```ts
import Numeric from '@neabyte/numerix'

const bytes = Numeric.random.byte(0, Numeric.random.seed(42))

console.log(Array.from(bytes))
// []
```

### Generate bytes without a generator

```ts
import Numeric from '@neabyte/numerix'

const bytes = Numeric.random.byte(4)

console.log(bytes.length)
// 4
```
