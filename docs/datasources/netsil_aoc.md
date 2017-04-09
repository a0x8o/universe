Netsil datasources provide the cpu, memory, queue status, etc. for monitoring health and performance of Netsil AOC itself. The datasources also have attributes such as node uuid to identify the stream processors handling the network interactions within AOC.

## Datasources for Monitoring Netsil AOC itself
- netsil.cpu_stats
    - Top & Aggregate functions: ['avg', 'avg, 'min']
    - Unit: "%"
    - Attributes for Filter & Group By Operations: ['node_uuid', 'cpu_id']
    - Time Window: 1s

- netsil.mem_stats
    - Top & Aggregate functions: ['avg', 'avg, 'min']
    - Unit: "%"
    - Attributes for Filter & Group By Operations: ['node_uuid', 'mem_tag']
    - Time Window: 1s

- netsil.pipeline_stats.pipeline_fill
    - Top & Aggregate functions: ['avg', 'avg, 'min']
    - Unit: "%"
    - Attributes for Filter & Group By Operations: ['node_uuid', 'pipeline_name']
    - Time Window: 1s

- netsil.component_stats.queueing
    - Top & Aggregate functions: ['avg', 'sum', 'rate', 'count', 'throughput']
    - Unit: "%"
    - Attributes for Filter & Group By Operations: ['node_uuid', 'component']
    - Time Window: 1s

- netsil.component_stats.processing
    - Top & Aggregate functions: ['avg', 'sum', 'rate', 'count', 'throughput']
    - Unit: "%"
    - Attributes for Filter & Group By Operations: ['node_uuid', 'component']
    - Time Window: 1s
