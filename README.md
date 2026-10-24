<div align='center'>

# Numerix

Numerical library for arrays, transforms, sampling, and linear algebra

[![Deno](https://img.shields.io/badge/deno-compatible-ffcb00?logo=deno&logoColor=000000)](https://deno.com) [![Module type: Deno/ESM](https://img.shields.io/badge/module%20type-deno%2Fesm-brightgreen)](https://github.com/NeaByteLab/Numerix) [![License](https://img.shields.io/badge/license-BSD--3--Clause-blue.svg)](LICENSE)

</div>

## What is Numerix?

Numerix is a numeric library for JavaScript and TypeScript that follows the NumPy API. It gives you arrays, arithmetic, statistics, linear algebra, signal transforms, and random sampling under one consistent namespace. Operations work on nested arrays and broadcast operands the way NumPy does, so a scalar combines with a matrix without manual looping.

## Installation

The package is not published to any registry yet, so clone it from source.

```bash
git clone https://github.com/NeaByteLab/Numerix.git
cd Numerix
```

## Usage

```ts
import Numeric from '@neabyte/numerix'

// Creates a 2x2 matrix filled with zeros.
Numeric.create.zero([2, 2])

// Adds two vectors element by element.
Numeric.math.add([1, 2, 3], [10, 20, 30]) // [11, 22, 33]

// Reshapes a flat vector into a matrix.
Numeric.shape.reshape([1, 2, 3, 4], [2, 2])

// Computes the sum of every entry.
Numeric.reduce.sum([1, 2, 3, 4]) // 10
```

Every method, with examples, is documented in [`docs/README.md`](./docs/README.md).

## API

Every method lives in the namespace that matches its group in the contract.

| Namespace                             | Methods | Covers                                                       |
| ------------------------------------- | ------- | ------------------------------------------------------------ |
| [`create`](./docs/create/README.md)   | 14      | array creation, range, mesh, diagonal, vandermonde           |
| [`shape`](./docs/shape/README.md)     | 17      | reshape, transpose, broadcast, join, split, pad, roll, flip  |
| [`index`](./docs/index/README.md)     | 8       | where, select, take, put, ravel, unravel, mask, slide        |
| [`math`](./docs/math/README.md)       | 34      | arithmetic, powers, rounding, gcd, convolution, gradients    |
| [`trig`](./docs/trig/README.md)       | 16      | sin, cos, tan, inverses, hyperbolic, deg, rad, unwrap        |
| [`complex`](./docs/complex/README.md) | 4       | real, imag, angle, conj                                      |
| [`reduce`](./docs/reduce/README.md)   | 12      | sum, prod, cumulative forms, min, max, argmin, argmax        |
| [`stat`](./docs/stat/README.md)       | 11      | mean, average, median, quantile, variance, std, cov, corr    |
| [`sort`](./docs/sort/README.md)       | 5       | order, argsort, partition, argpartition, search              |
| [`set`](./docs/set/README.md)         | 6       | unique, union, intersect, diff, xor, member                  |
| [`logic`](./docs/logic/README.md)     | 16      | comparisons, boolean operators, finiteness checks            |
| [`bit`](./docs/bit/README.md)         | 8       | bitwise operators, shifts, popcount, pack, unpack            |
| [`linalg`](./docs/linalg/README.md)   | 20      | dot, matmul, einsum, norm, det, inv, solve, qr, svd, eig     |
| [`fft`](./docs/fft/README.md)         | 8       | forward, inverse, real transforms, frequency, shift          |
| [`random`](./docs/random/README.md)   | 32      | 28 distributions plus seed, choice, shuffle, permute         |
| [`poly`](./docs/poly/README.md)       | 19      | evaluate, fit, roots, derivatives, bases, integration        |
| [`window`](./docs/window/README.md)   | 5       | bartlett, blackman, hamming, hanning, kaiser                 |
| [`string`](./docs/string/README.md)   | 26      | concatenation, case, padding, searching, splitting, encoding |
| [`dtype`](./docs/dtype/README.md)     | 4       | cast, check, info, endian                                    |
| [`util`](./docs/util/README.md)       | 4       | apply, memory, format, io                                    |

## Acknowledgements

This project follows the NumPy 2.5.4 API, see [NOTICE](NOTICE) for the full attribution.

## License

This project is distributed under the BSD 3-Clause license. See the [LICENSE](LICENSE) file for the full text.
