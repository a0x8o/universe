DNS datasources provide metrics such as latency, count, etc. for DNS requests and responses. Along with metrics, DNS datasources also provide attributes such as DNS query domain, DNS record type, etc. for DNS interactions. 

## Attributes 
Below attributes can be used in _filters_ and _group by_ operations in analytics within alerts, dashboards, etc. There are 2 types of attributes:
- Single Value Attributes: For e.g., dns.domain attribute in DNS queries .
- Multiple Key-Value Attributes : These are grouping of attributes which share a common component. For e.g., metadata related to servers are grouped under server

### Single Value Attributes
|API Usage Name | UI Display Name | Description | Value / Example |
| ------------- | ---------------------------- | ------------------------ | ------------- |
| dns.domain | Domain | Domain specified as part of DNS query | blog.netsil.com |
| dns.query.type | Query Type | Queries identified by underlying DNS record type | `A`, `AAAA`, `SRV`, `PTR`, [See full list](https://en.wikipedia.org/wiki/List_of_DNS_record_types) |
| dns.query.class | Query Class | DNS RR Query Class | `IN` (internet). [See full list](https://tools.ietf.org/html/rfc6895#section-3.2) |
| dns.lookup_status | Lookup Status | Error or success status of DNS lookups | `No Error`, `TIMEOUT`, `Non-Existent Domain` |
| source | Source | Hostname of bare metal/virtual machines where the AOC collectors are installed | collector.hostname.vpc |
| server.ip | Server | IP of DNS server receiving requests | XXX.XXX.XXX.XXX |
| client.ip | Client | IP of client sending DNS requests | XXX.XXX.XXX.XXX |
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

## Datasources 
- dns.request_response.latency
    - Top & Aggregate functions: ['sum', 'avg', 'count', 'throughput', 'avg, 'min', 'std_dev']
    - Unit: ms
    - Scope: Per DNS Request/Response
    - Time Window: 1s

- dns.request_response.count
    - Top & Aggregate functions: ['count', 'throughput']
    - Unit: count
    - Scope: Per DNS Request/Response
    - Time Window: 1s

- dns.response.answers_records
    - Top & Aggregate functions: ['rate', 'sum', 'avg', 'count', 'throughput', 'avg, 'min', 'std_dev']
    - Unit: count
    - Scope: Per DNS Request

- dns.response.authority_records
    - Top & Aggregate functions: ['rate', 'sum', 'avg', 'count', 'throughput', 'avg, 'min', 'std_dev']
    - Unit: count
    - Scope: Per DNS Request

- dns.response.additional_records
    - Top & Aggregate functions: ['rate', 'sum', 'avg', 'count', 'throughput', 'avg, 'min', 'std_dev']
    - Unit: count
    - Scope: Per DNS Request
