# permute

Generate a random permutation of values.

## API

```ts
Numeric.random.permute(input, generator)
```

Shuffles an array or generates a random permutation.

- Parameters:
  - `input`: Array to permute or permutation length
  - `generator`: Generator supplying uniform samples
- Returns: Array of permuted values
- NumPy: Covers `Generator.permutation`, `Generator.permuted` through a single Numerix method.

## Examples

### Generate a permutation of four values

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.permute(4, Numeric.random.seed(42))

console.log(values)
// [2,3,1,0]
```

### Permute an existing array

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.permute(['a', 'b', 'c'], Numeric.random.seed(42))

console.log(values)
// ["c","b","a"]
```

### Generate a permutation of one value

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.permute(1, Numeric.random.seed(42))

console.log(values)
// [0]
```

### Generate a permutation without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.permute(4)

console.log(values.length)
// 4
```
