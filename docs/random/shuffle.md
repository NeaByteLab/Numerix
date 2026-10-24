# shuffle

Reorder the entries of an array at random.

## API

```ts
Numeric.random.shuffle(values, generator)
```

Rearranges entries using a Fisher-Yates pass.

- Parameters:
  - `values`: Array whose entries are reordered
  - `generator`: Generator supplying uniform samples
- Returns: The same array with reordered entries
- NumPy: Equivalent to `Generator.shuffle`.

## Examples

### Shuffle five values

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.shuffle([1, 2, 3, 4, 5], Numeric.random.seed(42))

console.log(values)
// [4,2,5,3,1]
```

### Shuffle a pair of values

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.shuffle([1, 2], Numeric.random.seed(42))

console.log(values)
// [2,1]
```

### Shuffle a single value

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.shuffle([7], Numeric.random.seed(42))

console.log(values)
// [7]
```

### Shuffle without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.shuffle([1, 2, 3])

console.log(values.length)
// 3
```
