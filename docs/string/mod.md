# mod

Format a template with placeholder values.

## API

```ts
Numeric.string.mod(template, values)
```

Substitutes placeholders in the template string.

- Parameters:
  - `template`: Template string or array of templates
  - `values`: Replacement values for the template placeholders
- Returns: Formatted strings matching the input shape
- NumPy: Covers `np.strings.mod`, `np.char.mod` through a single Numerix method.

## Examples

### Substitute a string placeholder

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.mod('Hi %s', 'Bob')

console.log(value)
// Hi Bob
```

### Substitute a numeric placeholder

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.mod('%d items', 5)

console.log(value)
// 5 items
```

### Substitute a template without placeholders

```ts
import Numeric from '@neabyte/numerix'

const value = Numeric.string.mod('plain', 'Bob')

console.log(value)
// plain
```

### Format an array of templates

```ts
import Numeric from '@neabyte/numerix'

const values = Numeric.string.mod(['%s', '%s'], ['a', 'b'])

console.log(values)
// ["a","b"]
```
