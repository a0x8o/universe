# StatsD Metrics

## Overview
This section will describe how to send custom metrics to AOC via StatsD. These metrics can be used for creating Dashboards and setting Alerts.

## How it Works
A local [StatsD](https://github.com/etsy/statsd/wiki) daemon is embedded into every [Netsil AOC Collector](collectors.md). The metrics from your application are sent over UDP to the StatsD daemon which aggregates and flushes the metrics every 10 seconds (default flush period) to AOC over HTTPS. The primary job of the daemon is to buffer and aggregate many datapoints into a single metric (per metric name and unique tags) every flush interval. The aggregation depends on the statsd [metric type](#metric-types). With Count, the daemon would increment the counter for every new datapoint. For e.g. count the number of times a function for page render is called.

If you have already instrumented your application with StatsD the same implementation would work with AOC by pointing your application to StatsD port (8125) of Netsil's Collector which is also the default StatsD port used by most StatsD clients. 

## Metric Types
### Counters
This metric type is used for maintaining counts over time. The application sends the increment to the counter and the count is maintained by the collector and reset periodically. You can use AOC's Analytics to see the counter increments trend over time and also to add up the increments over a period of time.

### Gauges
Gauges measure a quantity over time. The application sends the value of the quantity, StatsD daemon records the average of the quantity as a single datapoint every flush interval. E.g. record the size of the page from the page render function.

### Histograms
Histograms measure the statistical distribution of a set of values. The distribution is calculated every flush interval for the datapoints submitted in that time period. A histogram with name `metric_name` produces the following metrics for a single histogram:

    metric_name.avg
    metric_name.median
    metric_name.max
    metric_name.95percentile

E.g. timing calls to the page render function.

### Sets
Sets are used to count the number of unique elements in a set of datapoints every flush interval. For example, track number of unique users calling the page render function.

## Metric Format
The StatsD metrics are sent over UDP. The format is very simple and textual. You can either send the metrics over raw UDP or use one of the various open source StatsD libraries available for most languages and frameworks.

### Tags
Netsil uses the [DogStatsD](https://github.com/DataDog/dd-agent/blob/master/dogstatsd.py) extension of StatsD protocol which is backward compatible with the original StatsD protocol. This extension allows tagging the metric with a dimension that makes sense for that metric. You can slice and dice the data by the metric tag dimensions in the AOC [Metrics Builder](metric-analytics.md). For e.g. tag your metrics by the deployment environment to differentiate between metrics coming from Staging vs Production environments.

### Sampling
Sampling is useful when the performance overhead of using StatsD in busy areas of the application code is a concern. When sampling is used it means the metric is reported only a fraction of the time. StatsD protocol supports sending sampling rate of a metric, the StatsD Daemon takes care of normalization of sampled metrics.

### Wire Format
Here are some examples of the metric format over UDP:

        // Increment the function.render counter.
        page.render.count:1|c

        // Record the size of the page from the page render function
        page.render.size:100|g

        // Record the time spent in the page render function with a sampling rate of 0.5
        page.render.time:250|h|@0.5

        // Track unique users calling the page render function, tagged by production environment
        page.render.unique.users:20|s#environment:production

## Sending Metrics to AOC
Metrics can be sent to AOC using any open source StatsD client library for you framework/language. If you need support for tagging you can use a DogStatsD client library for your framework/language. You can also send metrics on plain UDP using the format as described in [Wire Format](#wire-format). 

## Configuration
You can change the StatsD UDP port (8125 is default) that the collector listens on by passing the port as an environment variable `STATSD_PORT` to the collector process.
If you are using the container verion of the collector you make the StatsD port available on the host by [publishing the port](https://docs.docker.com/engine/reference/run/#/expose-incoming-ports) on the host interface.
Netsil's StatsD integration is a drop-in solution for your current StatsD instrumentation, therefore the defaults should work in most cases.

## Using StatdD Metrics in AOC
In the [Metrics Builder](metric-analytics.md) select the datasource `Statsd`. Add a series filter, select the column name: `Statsd Key`. This column refers to the Metric Name of the StatsD metric. Once you have selected the column you need to set the value, you will be presented with suggestions as you click and type. Pick a datasource and it will get plotted in your chart.

To apply tags you can add another series filter and search for tags in the column names. The columns for tags will be under the `STATSD TAGS` category in the columns dropdown. Once you have selected the column, you can select the value of the column.

For e.g. if the metric is `page.render.count:1|c#environment:production`, the `Statsd Key` would be `page.render.count`, the tag column would be `environment` under `STATSD TAGS` and the value of the tag will be `production`.
