# check

Test whether a string matches a character class.

## API

```ts
Numeric.string.check(text, kind = 'alnum')
```

Matches each string against a named validation pattern.

- Parameters:
  - `text`: String or array of strings to test
  - `kind`: Character class used for the validation
- Returns: Match results matching the input shape
- NumPy: Covers `np.strings.isalnum`, `np.strings.isalpha`, `np.strings.isdecimal`, `np.strings.isdigit`, `np.strings.islower`, `np.strings.isnumeric`, `np.strings.isspace`, `np.strings.istitle`, `np.strings.isupper`, `np.char.isalnum` through `np.char.isupper` via a single Numerix method.

## Examples

### Test alphanumeric characters

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.check('abc123', 'alnum')

console.log(flag)
// true
```

### Test alphabetic characters

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.check('abc', 'alpha')

console.log(flag)
// true
```

### Test whitespace characters

```ts
import Numeric from '@neabyte/numerix'

const flag = Numeric.string.check('a b', 'space')

console.log(flag)
// false
```

### Test an array of strings

```ts
import Numeric from '@neabyte/numerix'

const flags = Numeric.string.check(['abc', 'a1'], 'alpha')

console.log(flags)
// [true,false]
```
