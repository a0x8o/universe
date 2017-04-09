Thrift datasources provide metrics such as latency, count, response size, etc. for Thrift requests and responses. Along with metrics, Thrift datasources also provide attributes such as Thrift method name, Thrift response type, etc. for Thrift interactions. 

## Attributes for Filter and Group By Operations
Below attributes can be used in _filters_ and _group by_ operations in analytics within alerts, dashboards, etc. There are 2 types of attributes:
- Single Value Attributes: For e.g., thrift.client_version for Thrift protocol
- Multiple Key-Value Attributes : These are grouping of attributes which share a common component. For e.g., metadata related to servers are grouped under server

Note: Attributes with enumerated values are `highlighted`

### Single Value Attributes
|API Usage Name | UI Display Name | Description | Value / Example |
| ------------- | ---------------------------- | ------------------------ | ------------- |
| thrift.method.type | Thrift Request Type | Normal call or oneway. `oneway` modifier indicates that the client only makes a request and does not wait for any response at all | `T_CALL`, `T_ONEWAY`  |
| thrift.client_version | Thrift Client Version | Thrift version number for client  |  |
| thrift.method | Thrift Method Name | The name of method invoked as part of Thrift service. [See example](https://diwakergupta.github.io/thrift-missing-guide/) |   |
| thrift.server_version | Thrift Server Version | Thrift version number for server  |  |
| thrift.response.status | thrift.response Type  | Response type could be either reply or exception | `T_REPLY`, `T_EXCEPTION`  |
| server.port | Server Port  | Port where Thrift server is handling connections |  `9090` |
| source | Source | Hostname of bare metal/virtual machines where the AOC collectors are installed | collector.hostname.vpc |
| server.ip | Server | IP of Thrift server | XXX.XXX.XXX.XXX |
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
| host_name | Host Name | Host name of server or client. Only available for those servers and clients where AOC collectors are installed. | dcos-main.prod.internal |
| ips | Ips | IP of client/server  | XXX.XXX.XXX.XXX  | 

## Datasources Based on Thrift Metrics
- thrift.request_response.latency
    - Top & Aggregate functions: ['sum', 'avg', 'count', 'throughput', 'avg, 'min', 'std_dev']
    - Unit: ms
    - Scope: Per Thrift Request
    - Time Window: 1s
    
- thrift.request_response.count
    - Top & Aggregate functions: ['count', 'throughput']
    - Unit: count
    - Scope: Per Thrift Request
    - Time Window: 1s

- thrift.request.bytes
    - Top & Aggregate functions: ['kbps', 'bytes', 'avg', 'min','sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per Thrift Request

- thrift.response.Bytes
    - Top & Aggregate functions: ['kbps', 'bytes', 'avg', 'min','sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per Thrift Request

- thrift.request.pkts
    - Top & Aggregate functions: ['PPS', 'pkts', 'rate', 'throughput', 'sum', 'count', 'avg', 'avg', 'min']
    - Unit: pkts
    - Scope: Per Thrift Request        
  
- thrift.response.Pkts
    - Top & Aggregate functions: ['PPS', 'pkts', 'rate', 'throughput', 'sum', 'count', 'avg', 'avg', 'min']
    - Unit: pkts
    - Scope: Per TCP Session 

- thrift.request_response.p50
    - Top & Aggregate functions: ['avg', 'count', 'throughput', 'avg, 'min']
    - Unit: ms
    - Scope: Per Thrift Request
    - Time Window: 60s

- thrift.request_response.p5
    - Top & Aggregate functions: ['avg', 'count', 'throughput', 'avg, 'min']
    - Unit: ms
    - Scope: Per Thrift Request
    - Time Window: 60s

- thrift.request_response.p95
    - Top & Aggregate functions: ['avg', 'count', 'throughput', 'avg, 'min']
    - Unit: ms
    - Scope: Per Thrift Request
    - Time Window: 60s

- thrift.response.bytes.p50
    - Top & Aggregate functions: [ 'avg', 'min', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per Thrift Request
    - Time Window: 60s

- thrift.response.bytes.p5
    - Top & Aggregate functions: [ 'avg', 'min', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per Thrift Request
    - Time Window: 60s

- thrift.response.bytes.p95
    - Top & Aggregate functions: [ 'avg', 'min', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per Thrift Request
    - Time Window: 60s
