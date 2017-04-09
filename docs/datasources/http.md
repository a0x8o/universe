HTTP datasources provide metrics such as latency, count, request size, response size, etc. for HTTP requests and responses. Along with metrics, HTTP datasources also provide attributes such as HTTP status code, URI path, etc. for HTTP interactions. 

## Attributes 
For HTTP time series datasources, below attributes can be used in _filters_ and _group by_ operations in analytics within alerts, dashboards, etc. There are 2 types of attributes:
- Single Value Attributes: For e.g., URI Path of an HTTP request.
- Multiple Key-Value Attributes : These are grouping of attributes which share a common component. For e.g., metadata related to servers are grouped under server

### Single Value Attributes
|API Usage Name | UI Display Name | Description | Value / Example |
| ------------- | ---------------------------- | ------------------------ | ------------- |
| http.uri      | URI Path  | URI path for the HTTP endpoint | /cust/shoppingcart |
| http.status.code | HTTP Status Code |  HTTP status code | 200, 400, 500 | 
| http.status.message | HTTP Status Message |  HTTP status message  |  "Bad Request", "Internal Server Error" |
| source | Source | Hostname of bare metal/virtual machines where the AOC collectors are installed | collector.hostname.vpc |
| server.ip | Server | IP of HTTP server receiving requests | XXX.XXX.XXX.XXX |
| server.port | Server Port | Server port number for receiving HTTP requests | 80, 3306 |
| client.ip | Client | IP of HTTP client sending requests | XXX.XXX.XXX.XXX |
| server.id | Server Instance | Server instance is either a host or container endpoint captured as part of TCP communications in the application. Server instance is independent of the application layer protocol. The value can be <ul> <li>Host Name </li> <li> Host Name + Container Name </li> <li> Remote IP (for endpoints where AOC collector is not installed) </li></ul> |  <ul> <li> {"host_name": "dcos-main.prod.internal"} </li> <li> {"host_name": "dcos-main.prod.internal", "container_name": "mesos-d0c...7e4"} </li> <li>{"remote_ip": "XXX.XXX.XXX.XXX"} </li> </ul> |
| client.id | Client Instance  | Client instance is either a host or container endpoint captured as part of TCP communications in the application. Client instance is independent of the application layer protocol. The value can be <ul> <li>Host Name </li> <li> Host Name + Container Name </li> <li> Remote IP (for endpoints where AOC collector is not installed) </li></ul>  |<ul> <li> {"host_name": "dcos-main.prod.internal"} </li> <li> {"host_name": "dcos-main.prod.internal", "container_name": "mesos-d0c...7e4"} </li> <li>{"remote_ip": "XXX.XXX.XXX.XXX"} </li> </ul> |


### Multiple Key-Value Attributes
Following key-value pairs are categorized under server and client

|API Usage Name | UI Display Name | Description | Value / Example |
| ------------- | ---------------------------- | ------------------------ | ------------- |
| container_id | Container Id | container uuid |  051cbb6b...a0a |
| container_name | Container Name | container name | mesos-c6d...af0 |
| is_container | Is Container | boolean value whether client/server is a container |  `True`, `False` |
| tags.container_image | tags.container_image | container image name |  mysql-8.0.0-0.1.dmr.el7.x86_64.rpm |
| instance | Instance | Instance is either a host or container endpoint captured as part of TCP communications in the application. Instance is independent of the application layer protocol. The value can be <ul> <li>Host Name </li> <li> Host Name + Container Name </li> <li> Remote IP (for endpoints where AOC collector is not installed) </li></ul>  |<ul> <li> {"host_name": "dcos-main.prod.internal"} </li> <li> {"host_name": "dcos-main.prod.internal", "container_name": "mesos-d0c...7e4"} </li> <li>{"remote_ip": "XXX.XXX.XXX.XXX"} </li> </ul> |
| instance_type | Instance Type | Either a `host`, `container` or `remote` | `host`, `container` or `remote`|
| host_name | Host Name | Host name of HTTP server or client. Only available for those servers and clients where AOC collectors are installed. | dcos-main.prod.internal |
| ips | Ips | IP of HTTP client/server  | XXX.XXX.XXX.XXX  | 

## Datasources

- http.request_response.latency
    - Top & Aggregate functions: [sum, avg, count, throughput, avg, min, std_dev]
    - Unit: ms
    - Scope: Per HTTP Request/Response
    - Time Window: 1s
    
- http.request_response.count
    - Top & Aggregate functions: [count, throughput]
    - Unit: count
    - Scope: Per HTTP Request/Response
    - Time Window: 1s

- http.request.bytes
    - Top & Aggregate functions: [kbps, bytes, avg, min, sum, rate, avg, count, throughput]
    - Unit: bytes
    - Scope: Per HTTP Request

- http.response.Bytes
    - Top & Aggregate functions: [kbps, bytes, avg, min, sum, rate, avg, count, throughput]
    - Unit: bytes
    - Scope: Per http.response

- http.request.pkts
    - Top & Aggregate functions: [PPS, pkts, rate, throughput, sum, count, avg, avg, min]
    - Unit: pkts
    - Scope: Per HTTP Request        
  
- http.response.Pkts
    - Top & Aggregate functions: [PPS, pkts, rate, throughput, sum, count, avg, avg, min]
    - Unit: pkts
    - Scope: Per TCP Response 

- http.request_response.p50
    - Top & Aggregate functions: [avg, count, throughput, avg, min]
    - Unit: ms
    - Scope: Per HTTP Request/Response
    - Time Window: 60s

- http.request_response.p5
    - Top & Aggregate functions: [avg, count, throughput, avg, min]
    - Unit: ms
    - Scope: Per HTTP Request/Response
    - Time Window: 60s

- http.request_response.p95
    - Top & Aggregate functions: [avg, count, throughput, avg, min]
    - Unit: ms
    - Scope: Per HTTP Request/Response
    - Time Window: 60s

- http.response.bytes.p50
    - Top & Aggregate functions: [avg, count, throughput, avg, min]
    - Unit: bytes
    - Scope: Per http.response
    - Time Window: 60s

- http.response.bytes.p5
    - Top & Aggregate functions: [avg, count, throughput, avg, min]
    - Unit: bytes
    - Scope: Per http.response
    - Time Window: 60s

- http.response.bytes.p95
    - Top & Aggregate functions: [avg, count, throughput, avg, min]
    - Unit: bytes
    - Scope: Per http.response
    - Time Window: 60s
