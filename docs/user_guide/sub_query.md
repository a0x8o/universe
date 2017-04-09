## Overview
Application Operations Center (AOC) supports creating multiple sub-queries. Just like main query, sub-queries are made up of multiple query and expression statements. However, there is one important difference. In sub-query, only one statement can be selected for plotting and for returning values. This simplies the use of sub-queries in creating nested queries. 
<br>
Subqueries can be created by using _+ ADD SUBQUERY_ button in the _Analytics Sandbox_. Sub-queries are automatically named as _SQ1, SQ2, ..._

<img width="1007" alt="screen shot 2017-02-15 at 3 27 00 pm" src="https://cloud.githubusercontent.com/assets/23368535/23000053/9892430e-f393-11e6-9c76-8bae29af40d4.png">

# Using Sub-Query for Filter
One of the primary uses for sub-queries is to use them in filters. AOC provides filter labeled _Data field is in subquery_ for filtering using sub-queries. In traditional relational database context, the filter behavior is same as _join_ operation. You select an attribute to join the main query with sub-query and specify the sub-query name. The datapoints in main query will be restricted to those satisfying the matching criteria with results from sub-query. In example below, 

* Sub-query, SQ1, is returning the top 5 HTTP services experiencing the highest average latency. The services are identified by grouping on URI paths. 
* Main-query is filtering using SQ1 by joining based on URI path. Main query is returning the throughput of the same top 5 HTTP services that are experiencing the highest average latency. 

<img width="1011" alt="screen shot 2017-02-15 at 3 28 07 pm" src="https://cloud.githubusercontent.com/assets/23368535/23000054/98940266-f393-11e6-8575-08d178bb5f26.png">
