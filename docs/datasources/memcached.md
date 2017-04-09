Memcached datasources provide metrics such as latency, count, request size, response size, etc. for Memcached requests and responses. Along with metrics, Memcached datasources also provide attributes such as client command type, client command, server error string, etc. for Memcached interactions. 

## Attributes 
Below attributes can be used in _filters_ and _group by_ operations in analytics within alerts, dashboards, etc. There are 2 types of attributes:
- Single Value Attributes: For e.g., memcached.command.name
- Multiple Key-Value Attributes : These are grouping of attributes which share a common component. For e.g., metadata related to servers are grouped under server

### Single Value Attributes
|Metric |  Description | Value / Example |
| ------------- | ------------------------ | ------------- |
|memcached.command.name |  Client command name | `GET`, `SET`, `FLUSH`, `QUIT`. [See full list](http://lzone.de/cheat-sheet/memcached) | 
|memcached.response |  Server response | `DELETED`, `NOT FOUND`. [See full details](https://github.com/memcached/memcached/blob/master/doc/protocol.txt)  |
|memcached.command.type |  There are 3 command types <ul> <li> Storage : ask server to store data identified by a key </li> <li> Retrieval : get data identified by a key </li> <li> Others : operations on the data such as touch, delete, etc. </li> </ul> [See full details on command types](https://github.com/memcached/memcached/blob/master/doc/protocol.txt) | `STORAGE`, `RETRIEVAL`, `OTHERS` |
|pgsql.error.string |  Description of errors caused by bad command name, malformed client requests or server errors  | `server.ip_ERROR out of memory storing object`, error string is `out of memory storing object` |
| source | Hostname of bare metal/virtual machines where the AOC collectors are installed | collector.hostname.vpc |
| server.ip |  IP of Memcached server receiving requests | XXX.XXX.XXX.XXX |
| server.port |  Server port number for receiving Memcached requests | 11211 |
| client.ip |  IP of client sending Memcached requests | XXX.XXX.XXX.XXX |
| server.id |  Server instance is either a host or container endpoint captured as part of TCP communications in the application. Server instance is independent of the application layer protocol. The value can be <ul> <li>Host Name </li> <li> Host Name + Container Name </li> <li> Remote IP (for endpoints where AOC collector is not installed) </li></ul> |  <ul> <li> {"host_name": "dcos-main.prod.internal"} </li> <li> {"host_name": "dcos-main.prod.internal", "container_name": "mesos-d0c...7e4"} </li> <li>{"remote_ip": "XXX.XXX.XXX.XXX"} </li> </ul> |
| client.id |  Client instance is either a host or container endpoint captured as part of TCP communications in the application. Client instance is independent of the application layer protocol. The value can be <ul> <li>Host Name </li> <li> Host Name + Container Name </li> <li> Remote IP (for endpoints where AOC collector is not installed) </li></ul>  |<ul> <li> {"host_name": "dcos-main.prod.internal"} </li> <li> {"host_name": "dcos-main.prod.internal", "container_name": "mesos-d0c...7e4"} </li> <li>{"remote_ip": "XXX.XXX.XXX.XXX"} </li> </ul> |


### Multiple Key-Value Attributes
Following key-value pairs are categorized under server and client

|Metric |  Description | Value / Example |
| ------------- | ------------------------ | ------------- |
| container_id |  container uuid |  051cbb6b...a0a |
| container_name |  container name | mesos-c6d...af0 |
| is_container |  boolean value whether client/server is a container |  `True`, `False` |
| tags.container_image |  container image name |  mysql-8.0.0-0.1.dmr.el7.x86_64.rpm |
| instance |  Instance is either a host or container endpoint captured as part of TCP communications in the application. Instance is independent of the application layer protocol. The value can be <ul> <li>Host Name </li> <li> Host Name + Container Name </li> <li> Remote IP (for endpoints where AOC collector is not installed) </li></ul>  |<ul> <li> {"host_name": "dcos-main.prod.internal"} </li> <li> {"host_name": "dcos-main.prod.internal", "container_name": "mesos-d0c...7e4"} </li> <li>{"remote_ip": "XXX.XXX.XXX.XXX"} </li> </ul> |
| instance_type |  Either a `host`, `container` or `remote` | `host`, `container` or `remote`|
| host_name |  Host name of server or client. Only available for those servers and clients where AOC collectors are installed. | dcos-main.prod.internal |
| ips |  IP of client/server  | XXX.XXX.XXX.XXX  | 

## Datasources 
- memcached.request_response.latency
    - Top & Aggregate functions: ['sum', 'avg', 'count', 'throughput', 'avg, 'min', 'std_dev']
    - Unit: ms
    - Scope: Per Memcached Request
    - Time Window: 1s
    
- memcached.request_response.count
    - Top & Aggregate functions: ['count', 'throughput']
    - Unit: count
    - Scope: Per Memcached Request
    - Time Window: 1s

- memcached.request.bytes
    - Top & Aggregate functions: ['kbps', 'bytes', 'avg', 'min','sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per Memcached Request

- memcached.response.Bytes
    - Top & Aggregate functions: ['kbps', 'bytes', 'avg', 'min','sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per Memcached Request

- memcached.request.pkts
    - Top & Aggregate functions: ['PPS', 'pkts', 'rate', 'throughput', 'sum', 'count', 'avg', 'avg', 'min']
    - Unit: pkts
    - Scope: Per Memcached Request        
  
- memcached.response.Pkts
    - Top & Aggregate functions: ['PPS', 'pkts', 'rate', 'throughput', 'sum', 'count', 'avg', 'avg', 'min']
    - Unit: pkts
    - Scope: Per TCP Session 

- memcached.request_response.p50
    - Top & Aggregate functions: ['avg', 'count', 'throughput', 'avg, 'min']
    - Unit: ms
    - Scope: Per Memcached Request
    - Time Window: 60s

- memcached.request_response.p5
    - Top & Aggregate functions: ['avg', 'count', 'throughput', 'avg, 'min']
    - Unit: ms
    - Scope: Per Memcached Request
    - Time Window: 60s

- memcached.request_response.p95
    - Top & Aggregate functions: ['avg', 'count', 'throughput', 'avg, 'min']
    - Unit: ms
    - Scope: Per Memcached Request
    - Time Window: 60s

- memcached.response.bytes.p50
    - Top & Aggregate functions: [ 'avg', 'min', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per Memcached Request
    - Time Window: 60s

- memcached.response.bytes.p5
    - Top & Aggregate functions: [ 'avg', 'min', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per Memcached Request
    - Time Window: 60s

- memcached.response.bytes.p95
    - Top & Aggregate functions: [ 'avg', 'min', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per Memcached Request
    - Time Window: 60s
