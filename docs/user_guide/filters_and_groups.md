## Overview
Application Operations Center (AOC) enables multi-dimensional analysis of data through _Groups_ and _Filters_ features for queries. 

# Groups
As the name suggestes, _Groups_ will create grouping of data points based on specified attributes. For e.g., for datasource _HTTP.RequestResponse.Latency_ (i.e latency for all HTTP services), we can use _URI Path_ attribute to group the latency data. This will provide average latency for HTTP services serving the URI resources. Further more, we can combine _Groups_ feature with _Top_ function to find out the top 3 services experiencing highest average latencies. (Please consult [datasources documentation](https://github.com/netsil/docs/tree/master/docs/datasources) for details on datasource and their attributes.)

<img width="1008" alt="screen shot 2017-02-14 at 11 24 08 pm" src="https://cloud.githubusercontent.com/assets/23368535/22964357/0a37e982-f30d-11e6-9c97-50a64a634e58.png">

# Filters
_Filters_ enable selection and elimination of data points based on multiple criteria. There are 3 types of filters available while building queries in Application Operations Center (AOC).

<img width="1008" alt="screen shot 2017-02-14 at 11 24 25 pm" src="https://cloud.githubusercontent.com/assets/23368535/22964355/0a35aba4-f30d-11e6-880e-a2b53a9b0a0e.png">

## Filter by Service  
In AOC, services are atuomatically generated groups of functionally equivalent instances. For e.g., we can group HTTP services based on a specific URI path (/cust/frontend/itemsearch). This will create a _customer frontend item search_ service. We can then use this service definition as filter in our queries. So in effect, we are restricting the data points by all the instances that are grouped under the service. In the example below, we have filtered HTTP Latency data by the service _/cust/frontend/itemsearch_. Alternative cumbersome approach would have been to individually identify all the instances serving the URI path; and then filter latency data by each instance. (Please consult [service documentation](topology.md) for more details on creating and managing services in AOC.)

<img width="1015" alt="screen shot 2017-02-14 at 11 54 45 pm" src="https://cloud.githubusercontent.com/assets/23368535/22965158/05bd4344-f311-11e6-9a40-3f8059b30412.png">


## Filter by Field of Datasources
In AOC, every datasource has many specific fields (or attributes). For e.g. HTTP datasources have HTTP Status Code, URI Path, etc and MySQL datasources have Query Type, Error Codes, etc. These attributes are valuable to filter data in queries. For e.g., we can filter HTTP Latency by HTTP status code = 200, to identify the latency of successful HTTP requests.

When multiple filters are used the following rule applies to combine them:

* Filters on same fields are combined using "OR". For e.g, filter on HTTP Status Code = 400 _or_ HTTP Status Code = 500
* Filters on different fields are combined using "AND". For e.g., (filter on HTTP Status Code = 400 _or_ HTTP Status Code = 500) _and_ (Server = 9.0.3.142)

((Please consult [datasources documentation](https://github.com/netsil/docs/tree/master/docs/datasources) for details on datasource and their attributes.)
<img width="1005" alt="screen shot 2017-02-14 at 11 53 21 pm" src="https://cloud.githubusercontent.com/assets/23368535/22965138/f0f057da-f310-11e6-890c-69eb6c3fdb2d.png">

## Filter by Sub-Queries
AOC enables queries to filter based on results of sub-queries. Lets say we create a sub-query _SQ1_. To filter results using this sub-query, we just need to:

* Select filter, _Data field is in subquery_
* Select specific field to use for joining the results. For e.g. _URI Path_
* Specify the sub*query name, _SQ1_, to use for filtering. 
The below example shows this with:
* SQ1 : Returns top 3 HTTP URI paths experiencing highest average latency
* Main Query: Uses the URI paths from SQ1 and generates throughput for these high latency services. 
(Please consult [sub-query documentation](sub_query.md) for more details.)

<img width="1038" alt="screen shot 2017-02-14 at 11 25 50 pm" src="https://cloud.githubusercontent.com/assets/23368535/22964356/0a3640d2-f30d-11e6-92c4-3023f89637db.png">
