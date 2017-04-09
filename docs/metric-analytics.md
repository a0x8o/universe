# Metric Analytics

## Metrics

Metrics are selecting, filtering and aggregating data from a single datasource.

## Expressions

Expression are transformation functions that can apply on any previously-declared variable.

### Rolling Aggregates

Rolling aggregates let you generate time-wise aggregated timeseries from previously declared variables.

The aggregation window can be expressed in fixed frequency with one of the following units:

* second: `s`
* minute: `min`
* hour: `h`
* day: `d`

**Example**: `30min`

### Eval

Eval lets you combine previously declared variables in a free-form python expression. It supports a number of built-in operators and functions based on the python syntax and precedence rules.

**Example**: evaluate to the value of `A` when the absolute value of the ratio of `A` by `B` is greater than `2000` and `C` is smaller than `50`, zero otherwise: `$A * (abs($A / $B) > 2000 and $C < 50)`

To reference a previously declared variable, prefix its name with a `$` character.

All python comparison, arithmetic and membership operators are supported (see python doc [here](https://www.tutorialspoint.com/python/python_basic_operators.htm)):

* addition, substraction: `+`, `-`
* multiplication, division: `*`, `/`
* modulus, floor division, exponent: `%`, `//`, `**`
* equality: `==`, `!=`, `<>`
* comparison: `<`, `<=`, `>`, `>=`
* conjunction, disjunction, negation: `and`, `or`, `not`,
* membership: `in`, `not in`

In addition, the following math functions are supported: `sin`, `cos`, `exp`, `log`, `expm1`, `log1p`, `sqrt`, `sinh`, `cosh`, `tanh`, `arcsin`, `arccos`, `arctan`, `arccosh`, `arcsinh`, `arctanh`, `abs`, `arctan2`.

### TopN

TopN lets you rank a variable's segments with an aggregation and pick an arbitrary number of the lowest or highest ranked.
