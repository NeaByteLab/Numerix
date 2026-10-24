# choice

Select entries from an array at random.

## API

```ts
Numeric.random.choice(values, size, replace = true, generator)
```

Selects entries with or without replacement.

- Parameters:
  - `values`: Source array of selectable values
  - `size`: Number of choices to make when given
  - `replace`: When true allows repeated selections
  - `generator`: Generator supplying uniform samples
- Returns: Single chosen value or array of choices
- NumPy: Equivalent to `Generator.choice`.

## Examples

### Choose three entries with replacement

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.choice(['a', 'b', 'c'], 3, true, Numeric.random.seed(42))

console.log(values)
// ["a","b","a"]
```

### Choose three entries without replacement

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.choice(['a', 'b', 'c'], 3, false, Numeric.random.seed(42))

console.log(values)
// ["a","c","b"]
```

### Choose a single entry

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.random.choice(['a', 'b', 'c'], undefined, true, Numeric.random.seed(42))

console.log(value)
// a
```

### Choose entries without a generator

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.random.choice(['a', 'b', 'c'], 2)

console.log(values.length)
// 2
```
