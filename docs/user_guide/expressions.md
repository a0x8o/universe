## Overview
Netsil AOC provides an _Expression_ statement type for performing arithmetic and combining queries. Currently, Expression statements support 3 operations:
* Eval: For simple arithmetic and combination of queries
* Rolling Aggregate: For generating rolling aggregates (e.g sum, average etc.) on specific time-window
* TopN: For ranking and capturing top N values

# Eval Expressions
Eval enables arithmetic operations and combinations of query results. Query statements and other expression statements can be referenced using their alphabet name prefixed with `$`. In below example:

* Query A: Overall HTTP throughput
* Query B: Throughput of HTTP status code = 200 i.e. HTTP successful requests
* Eval Expression C: `( 1 - $B/$A ) x 100` ; returns the error rate for HTTP requests, since `$B/$A` will give HTTP success rate.

<img width="1016" alt="screen shot 2017-02-15 at 11 44 08 am" src="https://cloud.githubusercontent.com/assets/23368535/22992306/25d6c3ea-f374-11e6-84b3-db7ecff88123.png">

All python comparison, arithmetic and membership operators are supported (see python doc [here](https://www.tutorialspoint.com/python/python_basic_operators.htm)):

* addition, substraction: `+`, `-`
* multiplication, division: `*`, `/`
* modulus, floor division, exponent: `%`, `//`, `**`
* equality: `==`, `!=`, `<>`
* comparison: `<`, `<=`, `>`, `>=`
* conjunction, disjunction, negation: `and`, `or`, `not`,
* membership: `in`, `not in`
* supported math functions: `sin`, `cos`, `exp`, `log`, `expm1`, `log1p`, `sqrt`, `sinh`, `cosh`, `tanh`, `arcsin`, `arccos`, `arctan`, `arccosh`, `arcsinh`, `arctanh`, `abs`, `arctan2`.


# Rolling Aggregates
Rolling aggregates provide capability to apply a function such as average, sum, etc. to data points in a rolling time window. Below examples apply mean function to throughput data for 1 min and 5 min time window. The original throughput query (_query A_) is generating HTTP throughput per second. The rolling aggregate average over 1 min will take all the throughput data points for _t - 1 min_ time window and plot their average at time _t_. Rolling aggregates are very valuable to smooth-out temporary fluctuations in data. 

<img width="1014" alt="screen shot 2017-02-15 at 11 41 30 am" src="https://cloud.githubusercontent.com/assets/23368535/22992223/dbb15a96-f373-11e6-9f44-db3457eb7349.png">

# TopN
TopN function essentially ranks the values and returns the Top N values. By default the ranking is in descending order but can be changed by checking the _ascending box_. In order to use TopN function, we need to group the data on at least one attribute; otherwise there won't be any criteria to rank the values. In below example, the HTTP throughput is grouped by URI path. The TopN function is then applied to return the top 3 URI paths with highest average throughput.

<img width="1014" alt="screen shot 2017-02-15 at 11 41 46 am" src="https://cloud.githubusercontent.com/assets/23368535/22992224/dbb1a3a2-f373-11e6-86d9-1109f756cb48.png">



