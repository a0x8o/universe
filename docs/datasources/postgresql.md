PostgreSQL datasources provide metrics such as latency, count, response size, etc. for PostgreSQL queries. Along with metrics, PostgreSQL datasources also provide attributes such as query type, server error string, etc. for PostgreSQL interactions. 

## Attributes

Below attributes can be used in _filters_ and _group by_ operations in analytics within alerts, dashboards, etc. There are 2 types of attributes:
- Single Value Attributes: For e.g., postgresql.query which represents full query statements captured as strings
- Multiple Key-Value Attributes : These are grouping of attributes which share a common component. For e.g., metadata related to servers and clients are grouped under server and client respectively.

### Single Value Attributes
|API Usage Name | UI Display Name | Description | Value / Example |
| ------------- | ---------------------------- | ------------------------ | ------------- |
| postgresql.user | User | User name requesting the queries |  |
| postgresql.db | Database Name | Name of database accessed in queries |  |
| postgresql.application_name | Application Name | Name of the application that is connected to the PostgreSQL server  |  |
| mysql.server_version | Server Version  | PgSQL server version number | `9.6.1` |
| postgresql.client_message | Client Message | Client message type indicating the state of connection [full details of message flow](https://www.postgresql.org/docs/9.3/static/protocol-flow.html) |  `Startup`, `PasswordMessage`, `Query`, `Terminate` |
| postgresql.server_message | Server Message | Server message type indicating the state of connection [full details of server message](https://www.postgresql.org/docs/9.3/static/protocol-message-formats.html) | `AuthenticationMD5Password`, `AuthenticationOk`, `ReadyForQuery`, `BackendKeyData`, `ErrorResponse`, `NoticeResponse`, `ParameterStatus` |
| postgresql.error.severity |  Server Error Severity | The severity field in error response [full details of error message](https://www.postgresql.org/docs/9.3/static/protocol-error-fields.html) | `ERROR`, `FATAL`, `PANIC` |
| postgresql.error.string | Error String  | Error message including `No Error` | `database pgbench does not exist`   |
| postgresql.query | Query String | Query statements captured as strings | `create table pgbench_accounts(aid    int)`  |
| client.ipmysql.query.type | Query Type  | Type of query statements such as create, insert, drop, etc. | `CreateStmt`, `CreatedbStmt`, `DropStmt`, `InsertStmt`, `TransactionStmt`, `TruncateStmt` |
| server.port | Server Port | Specifies the TCP/IP port on which PostgreSQL is listening for connections from client applications | `5432`  |
| source | Source | Hostname of bare metal/virtual machines where the AOC collectors are installed | collector.hostname.vpc |
| server.ip | Server | IP of PostgreSQL server | XXX.XXX.XXX.XXX |
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

- postgresql.request_response.latency
    - Top & Aggregate functions: ['sum', 'avg', 'count', 'throughput', 'avg, 'min', 'std_dev']
    - Unit: ms
    - Scope: Per postgresql Request
    - Time Window: 1s
    
- postgresql.request_response.count
    - Top & Aggregate functions: ['count', 'throughput']
    - Unit: count
    - Scope: Per postgresql Request
    - Time Window: 1s

- postgresql.request.bytes
    - Top & Aggregate functions: ['kbps', 'bytes', 'avg', 'min','sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per postgresql Request

- postgresql.response.Bytes
    - Top & Aggregate functions: ['kbps', 'bytes', 'avg', 'min','sum', 'rate', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per postgresql Request

- postgresql.request.pkts
    - Top & Aggregate functions: ['PPS', 'pkts', 'rate', 'throughput', 'sum', 'count', 'avg', 'avg', 'min']
    - Unit: pkts
    - Scope: Per postgresql Request        
  
- postgresql.response.Pkts
    - Top & Aggregate functions: ['PPS', 'pkts', 'rate', 'throughput', 'sum', 'count', 'avg', 'avg', 'min']
    - Unit: pkts
    - Scope: Per TCP Session 

- postgresql.request_response.p50
    - Top & Aggregate functions: ['avg', 'count', 'throughput', 'avg, 'min']
    - Unit: ms
    - Scope: Per postgresql Request
    - Time Window: 60s

- postgresql.request_response.p5
    - Top & Aggregate functions: ['avg', 'count', 'throughput', 'avg, 'min']
    - Unit: ms
    - Scope: Per postgresql Request
    - Time Window: 60s

- postgresql.request_response.p95
    - Top & Aggregate functions: ['avg', 'count', 'throughput', 'avg, 'min']
    - Unit: ms
    - Scope: Per postgresql Request
    - Time Window: 60s

- postgresql.response.bytes.p50
    - Top & Aggregate functions: [ 'avg', 'min', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per postgresql Request
    - Time Window: 60s

- postgresql.response.bytes.p5
    - Top & Aggregate functions: [ 'avg', 'min', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per postgresql Request
    - Time Window: 60s

- postgresql.response.bytes.p95
    - Top & Aggregate functions: [ 'avg', 'min', 'avg', 'count', 'throughput']
    - Unit: bytes
    - Scope: Per postgresql Request
    - Time Window: 60s
