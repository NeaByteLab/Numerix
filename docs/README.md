# Numerix Documentation

Twenty namespaces, each with a table of methods and a page per method.

## Namespaces

| Namespace                        | Methods | Covers                                                       |
| -------------------------------- | ------- | ------------------------------------------------------------ |
| [`create`](./create/README.md)   | 14      | array creation, range, mesh, diagonal, vandermonde           |
| [`shape`](./shape/README.md)     | 17      | reshape, transpose, broadcast, join, split, pad, roll, flip  |
| [`index`](./index/README.md)     | 8       | where, select, take, put, ravel, unravel, mask, slide        |
| [`math`](./math/README.md)       | 34      | arithmetic, powers, rounding, gcd, convolution, gradients    |
| [`trig`](./trig/README.md)       | 16      | sin, cos, tan, inverses, hyperbolic, deg, rad, unwrap        |
| [`complex`](./complex/README.md) | 4       | real, imag, angle, conj                                      |
| [`reduce`](./reduce/README.md)   | 12      | sum, prod, cumulative forms, min, max, argmin, argmax        |
| [`stat`](./stat/README.md)       | 11      | mean, average, median, quantile, variance, std, cov, corr    |
| [`sort`](./sort/README.md)       | 5       | order, argsort, partition, argpartition, search              |
| [`set`](./set/README.md)         | 6       | unique, union, intersect, diff, xor, member                  |
| [`logic`](./logic/README.md)     | 16      | comparisons, boolean operators, finiteness checks            |
| [`bit`](./bit/README.md)         | 8       | bitwise operators, shifts, popcount, pack, unpack            |
| [`linalg`](./linalg/README.md)   | 20      | dot, matmul, einsum, norm, det, inv, solve, qr, svd, eig     |
| [`fft`](./fft/README.md)         | 8       | forward, inverse, real transforms, frequency, shift          |
| [`random`](./random/README.md)   | 32      | 28 distributions plus seed, choice, shuffle, permute         |
| [`poly`](./poly/README.md)       | 19      | evaluate, fit, roots, derivatives, bases, integration        |
| [`window`](./window/README.md)   | 5       | bartlett, blackman, hamming, hanning, kaiser                 |
| [`string`](./string/README.md)   | 26      | concatenation, case, padding, searching, splitting, encoding |
| [`dtype`](./dtype/README.md)     | 4       | cast, check, info, endian                                    |
| [`util`](./util/README.md)       | 4       | apply, memory, format, io                                    |

## Reading a Method Page

Each method page follows the same layout:

1. One line summary of what the method does.
2. The API signature for calling the method.
3. Parameters, the return value, and the matching NumPy functions.
4. Examples with the expected output shown as a comment.

## Licence

Numerix is distributed under the BSD 3-Clause licence. See the [LICENSE](../LICENSE) file for the full text.
