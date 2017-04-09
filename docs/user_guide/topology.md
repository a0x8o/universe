## Overview
Upon first login to AOC, users will see complete application topology map. AOC topology map captures all the internal and external services along with their dependencies. In topology map,

* Nodes are services, which are automatically created groups of instances
* Edges are network interactions among services

<img width="1370" alt="screen shot 2017-02-13 at 3 37 44 pm" src="https://cloud.githubusercontent.com/assets/23368535/22908471/824ec4d2-f203-11e6-9bbb-9200c34db92c.png">

## Services 
To create the map, AOC automatically groups instances into _services_. AOC leverages multiple dimensions such as protocol type, resource type, custom tags, etc. to group instances into services. The grouping criteria is called _service signature_. 

* Click on the service node, and then select "VERIFY/HIDE SERVICE" 
* Select "SERVICE SIGNATURE" to inspect and edit the grouping criteria. In picture below, the grouping is done based on URI for the HTTP service.

<img width="1370" alt="verify service" src="https://cloud.githubusercontent.com/assets/23368535/22910209/5193d648-f20d-11e6-87f4-5228f253da49.png">


## Explore Service Profile
Service profile provides out-of-the-box dashboards and insights into the instances grouped under the service. The dashboards include:

* Service-level insights include service specific key golden signals such as HTTP Throughput or MySQL Query Latency
* Container-level insights such as cpu, memory, disk i/o etc. used by containers
* Network-level insights for TCP retransmissions, round trip times (RTT), packet drops etc.

<img width="1370" alt="service profile" src="https://cloud.githubusercontent.com/assets/23368535/22910431/d5f20bf2-f20e-11e6-9ede-b37ab35a2585.png">

## Explore Service Interaction Profile
Clicking on the edges in topology map will provide insights on the network interactions among services. This includes valuable metrics such as TCP retransmission, out-of-order packets, round trip time (RTT), etc.

<img width="1368" alt="network profile" src="https://cloud.githubusercontent.com/assets/23368535/22910739/c64b7b32-f210-11e6-9409-fe77d0c90e04.png">

