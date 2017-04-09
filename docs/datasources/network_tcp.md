Network TCP datasources provide metrics such as round trip time (RTT), TCP retransmissions, number of packets, etc. for TCP requests and responses. Along with metrics, network TCP datasources also provide attributes such as protocol type, server port, etc. for TCP interactions. 

## Attributes 
Below attributes can be used in _filters_ and _group by_ operations in analytics within alerts, dashboards, etc. There are 2 types of attributes:
- Single Value Attributes: For e.g., network.protocol representing application layer protocol using TCP connection
- Multiple Key-Value Attributes : These are grouping of attributes which share a common component. For e.g., metadata related to servers and clients are grouped under server and client respectively.

### Single Value Attributes
|API Usage Name | UI Display Name | Description | Value / Example |
| ------------- | ---------------------------- | ------------------------ | ------------- |
| network.protocol | Protocol  | Application layer protocol using TCP  | `DNS`, `http`, `MYSQL`, `PGSQL`, `MEMCACHED`, `THRIFT`, `Unknown Protocol(s)` |
| server.port | Server Port | Server port handling TCP connections  | `80`, `11211`  |
| source | Source | Hostname of bare metal/virtual machines where the AOC collectors are installed | collector.hostname.vpc |
| server.ip | Server | IP of server application | XXX.XXX.XXX.XXX |
| client.ip | Client | IP of client application | XXX.XXX.XXX.XXX |
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
| host_name | Host Name | Host name of server or client. Only available for those servers and clients where AOC collectors are installed. | collector.hostname.vpc |
| ips | Ips | IP of client/server  | XXX.XXX.XXX.XXX  | 


## Datasources 

- network.tcp.connectionattemptstotal
    - Top & Aggregate functions: ['sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: count
    - Scope: Per TCP session

- network.tcp.connectionattemptssuccess
    - Top & Aggregate functions: ['sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: count
    - Scope: Per TCP session

- network.tcp.firstrtt
    - Top & Aggregate functions: ['sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: ms
    - Scope: Per TCP session

- network.tcp.retransmissions
    - Top & Aggregate functions: ['sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: count
    - Scope: Per TCP session

- network.tcp.keepalives
    - Top & Aggregate functions: ['sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: count
    - Scope: Per TCP session

- network.tcp.duplicateacks
    - Top & Aggregate functions: ['sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: count
    - Scope: Per TCP session

- network.tcp.outoforder
    - Top & Aggregate functions: ['sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: count
    - Scope: Per TCP session

- network.tcp.fastretransmissions
    - Top & Aggregate functions: ['sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: count
    - Scope: Per TCP session

- network.tcp.spuriousretransmissions
    - Top & Aggregate functions: ['sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: count
    - Scope: Per TCP session

- network.tcp.request.bytes
    - Top & Aggregate functions: ['kbps', 'bytes', 'avg', 'min','sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per TCP session

- network.tcp.request.pkts
    - Top & Aggregate functions: ['PPS', 'pkts', 'rate', 'throughput', 'sum', 'count', 'avg', 'avg', 'min']
    - Unit: pkts
    - Scope: Per TCP session        
  
- network.tcp.response.bytes
    - Top & Aggregate functions: ['kbps', 'bytes', 'avg', 'min','sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per TCP session

- network.tcp.response.pkts
    - Top & Aggregate functions: ['PPS', 'pkts', 'rate', 'throughput', 'sum', 'count', 'avg', 'avg', 'min']
    - Unit: pkts
    - Scope: Per TCP session 
