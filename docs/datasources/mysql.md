MySQL datasources provide metrics such as latency, count, response size, etc. for MySQL queries. Along with metrics, MySQL datasources also provide attributes such as query type, server error code, etc. for MySQL interactions. 

## Attributes 
Below attributes can be used in _filters_ and _group by_ operations in analytics within alerts, dashboards, etc. There are 2 types of attributes:
- Single Value Attributes: For e.g., mysql.query for MySQL queries.
- Multiple Key-Value Attributes : These are grouping of attributes which share a common component. For e.g., metadata related to servers are grouped under server

### Single Value Attributes
|API Usage Name | UI Display Name | Description | Value / Example |
| ------------- | ---------------------------- | ------------------------ | ------------- |
| mysql.db |  Schema Name | Name of the database |  |
| mysql.user | Username | User name for the database connection |  |
| mysql.query | Query String | Full query statements captured as strings | `SELECT    itemid   FROM    storagedb` |
| mysql.query.type | Query Type | Query statement type | `INSERT`, `SELECT`  |
| mysql.server_version | Server Version | MySQL server version number | `5.7.17` |
| mysql.error.code | Server error code | Numeric error code | In this error message: `ERROR 1146 (42S02): Table 'test.no_such_table' doesn't exist`, the error code is `1146`. [see full list of error codes](https://dev.mysql.com/doc/refman/5.5/en/error-messages-server.html) |
| mysql.error.string | Server error string  | Textual description of error | In this error message: `ERROR 1146 (42S02): Table 'test.no_such_table' doesn't exist`, error string is `Table 'test.no_such_table' doesn't exist`  |
| source | Source | Hostname of bare metal/virtual machines where the AOC collectors are installed | collector.hostname.vpc |
| server.port | Server Port | The port where MySQL server is handling connections | `3306` |
| server.ip | Server | IP of MySQL server | XXX.XXX.XXX.XXX |
| client.ip | Client | IP of client application sending query requests | XXX.XXX.XXX.XXX |
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

- mysql.request_response.latency
    - Top & Aggregate functions: ['sum', 'avg', 'count', 'throughput', 'avg, 'min', 'std_dev']
    - Unit: ms
    - Scope: Per MySQL Request
    - Time Window: 1s
    
- mysql.request_response.count
    - Top & Aggregate functions: ['count', 'throughput']
    - Unit: count
    - Scope: Per MySQL Request
    - Time Window: 1s

- mysql.request.bytes
    - Top & Aggregate functions: ['kbps', 'bytes', 'avg', 'min','sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per MySQL Request

- mysql.response.Bytes
    - Top & Aggregate functions: ['kbps', 'bytes', 'avg', 'min','sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per MySQL Request

- mysql.request.pkts
    - Top & Aggregate functions: ['PPS', 'pkts', 'rate', 'throughput', 'sum', 'count', 'avg', 'avg', 'min']
    - Unit: pkts
    - Scope: Per MySQL Request        
  
- mysql.response.Pkts
    - Top & Aggregate functions: ['PPS', 'pkts', 'rate', 'throughput', 'sum', 'count', 'avg', 'avg', 'min']
    - Unit: pkts
    - Scope: Per TCP Session 

- mysql.request_response.p50
    - Top & Aggregate functions: ['avg', 'count', 'throughput', 'avg, 'min']
    - Unit: ms
    - Scope: Per MySQL Request
    - Time Window: 60s

- mysql.request_response.p5
    - Top & Aggregate functions: ['avg', 'count', 'throughput', 'avg, 'min']
    - Unit: ms
    - Scope: Per MySQL Request
    - Time Window: 60s

- mysql.request_response.p95
    - Top & Aggregate functions: ['avg', 'count', 'throughput', 'avg, 'min']
    - Unit: ms
    - Scope: Per MySQL Request
    - Time Window: 60s

- mysql.response.bytes.p50
    - Top & Aggregate functions: [ 'avg', 'min', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per MySQL Request
    - Time Window: 60s

- mysql.response.bytes.p5
    - Top & Aggregate functions: [ 'avg', 'min', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per MySQL Request
    - Time Window: 60s

- mysql.response.bytes.p95
    - Top & Aggregate functions: [ 'avg', 'min', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per MySQL Request
    - Time Window: 60s
