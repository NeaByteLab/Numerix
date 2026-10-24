# linalg

Access every method through the namespace form `Numeric.linalg.method`.

## Methods

| Method                    | Description                                                       |
| ------------------------- | ----------------------------------------------------------------- |
| [cholesky](cholesky.md)   | Factors a positive definite matrix into triangular factors.       |
| [cond](cond.md)           | Divides the largest singular value by the smallest.               |
| [cross](cross.md)         | Combines vectors into a perpendicular direction.                  |
| [det](det.md)             | Uses elimination and tracks the determinant sign.                 |
| [dot](dot.md)             | Multiplies matching entries and sums the results.                 |
| [eig](eig.md)             | Uses Jacobi iteration for symmetric matrices, otherwise QR.       |
| [einsum](einsum.md)       | Contracts array axes following a subscript formula.               |
| [inner](inner.md)         | Multiplies matching entries and sums the results.                 |
| [inv](inv.md)             | Uses SVD inversion for singular or rectangular inputs.            |
| [kron](kron.md)           | Builds a block matrix from scaled copies.                         |
| [matmul](matmul.md)       | Contracts the inner dimension of both operands.                   |
| [norm](norm.md)           | Measures magnitude using the requested order.                     |
| [outer](outer.md)         | Multiplies every entry of one vector by the other.                |
| [power](power.md)         | Uses repeated squaring for the matrix power.                      |
| [qr](qr.md)               | Factorizes a matrix into orthogonal and upper triangular factors. |
| [rank](rank.md)           | Counts significant singular values within a tolerance.            |
| [solve](solve.md)         | Computes the solution for the coefficient matrix.                 |
| [svd](svd.md)             | Derives singular values from the matrix eigenpairs.               |
| [tensordot](tensordot.md) | Contracts the requested axes of both operands.                    |
| [trace](trace.md)         | Sums the diagonal entries along the requested offset.             |
