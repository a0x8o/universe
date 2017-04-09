## Overview
The _Analytics Sandbox_ in AOC is a powerful, real-time analytics engine that can be used to build queries and gain insights into the health of all application components. Analytics Sandbox has the following main components

* Chart Plot provides real-time plot as you build the queries
* Time Window Slider used to set the time interval for queries and plot
* Query Builder for creating the queries
* Save Analysis to save queries as dashboard or alerts

<img width="960" alt="screen shot 2017-02-14 at 3 22 34 pm" src="https://cloud.githubusercontent.com/assets/23368535/22954142/aa1ef204-f2c9-11e6-9b4d-8ef31f14f40d.png">

# Chart Plot and Time Window Slider
The chart plot area will plot the results of all selected query statements. 5 types of charts are supported - _multi-line, area, stacked bar, bar and gauge_. 
<p>
The time window slider is used to set the start and end time for datapoints to use in the plots. AOC will filter and only use the datapoints within the selected time window. Some important points to note for time window selection: </p>

* If the end time is selected as _now_ then the plot will be updated with real-time data. The real-time update can be paused using the _pause/resume_ toggle in the time window slider.
* As the selected time window is increased, the datapoints resolution (or granularity) of the plot reduces from 1sec, 1min, 1hr and so on. The highest resolution available is datapoints per second.

<img width="963" alt="screen shot 2017-02-14 at 3 22 54 pm" src="https://cloud.githubusercontent.com/assets/23368535/22954141/aa1eb244-f2c9-11e6-8747-d875555d89e2.png">

# Query Builder 
The query builder area has the following main components:

* Query can be either _MAIN QUERY_ and _SUB-QUERY_. Each of them is made up of multiple query statements. However, main query can have multiple query statments selected for plotting. But sub-query can only plot and return value from 1 statement. (Please consult [sub-query documentation](sub_query.md) for more details.)
* _+ METRIC_ is used to create and add query statements
* _+ EXPRESSION_ is used to create expression statements which can combine the values from multiple queries and perform arithmetic operations on queries. (Please consult [expressions](expressions.md) documentation for more details.)

<img width="961" alt="screen shot 2017-02-14 at 3 23 18 pm" src="https://cloud.githubusercontent.com/assets/23368535/22954143/aa1f6d38-f2c9-11e6-8614-ce5e3306c030.png">


## Query Statment
Query statements are identified by an alphabet name. This name is used for referencing to the query statement in chart plot as well as in expressions combining queries. There is also a checkbox to select/unselect a query statement for plotting.
Query Statements have following key components:

* _Datasource_ which identifies the resource (e.g HTTP, DNS, MySQL, etc.) and associated metrics for the resource (e.g. latency, count, packets, bytes, etc.). (Please consult [datasource documentation](datasources) for more details)
* _Aggregation_ function such as average, count, sum, throuhgput, etc. are applied on the raw datapoints provided by the datasource. 
* _Groups_ is used for grouping the datapoints based on specific attributes. For e.g., HTTP.RequestResponse.Latency datapoints can be grouped by server IP or URI Paths. 
* _Filter by Service_ is used for restricting the analysis to specific services. To use this feature, the user will first need to define services. Please consult services documentation for more details on creating and managing services.
* _Time Shift_ will shift plotting of datapoints by specified duration. For e.g., with time shift of 30mins, the value at 2:30pm actually happened at 2pm. Time shift is very useful for answering questions such as _what was the latency of HTTP services 1 week ago and how does that compare with the current latencies?_ 
* _Filters_ offer further options to filter the data either based on specific attributes or based on nested sub-queries. (Please consult [filters](filters_and_groups.md) documentation for more details). 

<img width="957" alt="screen shot 2017-02-14 at 4 01 35 pm" src="https://cloud.githubusercontent.com/assets/23368535/22955066/10a7c67c-f2cf-11e6-8d27-38702daca1ef.png">

