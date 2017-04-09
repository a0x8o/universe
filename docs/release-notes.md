# Release Notes

## 1.1.3 - 03/27/2017

* Various bug fixes

## 1.1.2 - 03/21/2017

* Added support for offline license activation

## 1.1.1 - 03/20/2017

* Topology Maps
    * Multiple topology maps -- Checkout the new topology maps page to see pre-canned maps and maps created by other users. You can also use the topology sandbox to explore and create different logical and physical topology maps.
    * With the new grouping, filtering and subgrouping options, you can now carve out precise & layered topology maps. For instance you can create maps that show interactions between services within a region, show interactions between regions, filter out production vs staging environments, show interactions between Kubernetes pods within a namespace and so on. 
* Improved filters -- Dashboard and topology filters more accessible and easier to use.
* Cassandra analysis -- Now you can use Netsil AOC to gather deep performance and health insights into CQL interactions!

## 1.1.0 - 02/28/2017

* Alerting improvements
    * Webhooks support - Now you can POST alert events to any other services with our template driven Webhooks support.
    * Alerts API : We have completely revamped our Alerting API, allowing you to programmatically create, update and delete alerts. [Documentation](https://netsil.github.io/docs/v1.1.0/apis/alerts_overview)
    * Alert emails - Now you can add a custom description (template based) and provide more context to alert emails.
* Flexible service grouping
    * We have made the experience around service grouping more intuitive by showing live preview of compute instances that will match the grouping rule.
    * Infrastructure tags — Now you can use infrastructure tags, in addition to service resources (e.g. http.uri) in the grouping rules.
* Infrastructure tags
    * Custom tags — Now you can provide custom tags (keys or key:value pairs) to the collectors. These tags are then assigned to each metric that is collected on the instance. [Documentation](https://netsil.github.io/docs/v1.1.0/tagging-infrastructure/)
    * Kubernetes — We now support automatic tag/label collection (e.g. Kubernetes pods).
* Improved Search Experience
    * Quickly search your services in the topology, dashboards and alerts.
    * Press backspace to escape the local page search to search all global resources (e.g. instances, http.uri etc.) in the AOC.
* Backups/Restore — Now you can backup your entire AOC cluster (time series, events, user data) in an S3 compatible datastore.
* Redis analysis — Now you can use Netsil AOC to analyze Redis interactions in real-time and set alerts on Redis SLA!
* Cleaner Data model — [Documentation](https://netsil.github.io/docs/v1.1.0/datasources/http)
* Various bug fixes and optimizations
* Known Issues
    * When the hostname of the AOC node is too long, part of our internal DNS system will fail and break AOC startup. Thus, try to keep your hostname within 32 characters.


## 1.0.9 - 02/07/2017

* Improved Alerts:
    * You can now set alerts on GroupBy queries and alerts will trigger for each group. For instance, you can now alert on any API endpoint that has < 99% availability. 
    * PagerDuty integration: You can now send alert notifications to PagerDuty!
    * Alerts API: You can now set alerts via APIs. We are currently working on the documentation and in the meantime you can contact us on support@netsil.com for assistance.
    * You can export the Alert instance JSON specification and use it elsewhere, such as an API call.
* Analytics have improved speed and an improved query builder UI. 
    * Now you can save the sandboxed analytics query as an Alert or a chart in a Dashboard.
    * You can now export the JSON specification of the analytics query and use it in other places such as an API call.
* Charts now use a multi-color palette to help easily identify different timeseries.
* Collectors are now VPC subnet aware and prefer connecting to active AOC workers within the local subnet.
* Manual installation process for collectors has been improved.
* Various bug fixes – Memcached protocol decoding performance, collectors package cleanup on purge/uninstall, collectors packages are now versioned properly and so on. 

## 1.0.8 - 01/23/2017

* Improved Alerting experience:
    * Rules driven Alert Templates provide a scalable and an organized way of defining setting alerts. Set alerts by applying filters and thresholds on Alert Templates.
    * Alerts support global scope and services scope.
    * Visual cues in topology and the new service health tab helps quickly identify performance and reliability issues.
    * Improved data source names.
    * Stay tuned for Pagerduty, Slack and HTTP Post support for receiving alert notifications in our next release!
* Memcache analysis – Observe Memcached interactions down to the command level. Track and alert on latency of individual commands, errors and so on!
* SSLSplit encryption keys – AOC Configuration now allows the user to configure keys for encrypting traffic mirrored by SSLSplit collector.
* Netsil now uses [Segment](https://segment.com) to report on usage metrics for better support and customer success. Automatic usage reporting is an opt-in feature.
* Built-in deep storage facility for increased durability of timeseries data - Netsil now allows for storing and backing up timeseries data within the AOC cluster through [Ceph](https://ceph.com/) - an S3 compatible object store.
* Improved Settings page layout.
* Memory optimizations and bug fixes.

## 1.0.7 - 12/14/2016

* Support for defining dashboards and alerts using the new powerful analytics builder. Express analytics like never before with the new analytics system. It allows you to construct complex expressions and mathematical transforms on multiple data sources at once.
* Timeshift operator -- Ability to timeshift any metric to an equivalent time window in the past. Can be used to express rate of change ("alert me if rps of a service changes by 3x") or to find periodicity in data (compare today vs yesterday).
* New error rate widgets in default dashboards, e.g. ratio of 4xx or 5xx http response codes vs all response codes. High error rates are a strong indicator for service health in production and is one of the four golden signals of API monitoring.
* SSLsplit collector is now available as a stand-alone package, provisioned as a long running transparent proxy.
* Various bug fixes - percentile metrics correctness, all operational assets such as JS and CSS files are bundled in the AOC installation etc.

## 1.0.6 - 11/28/2016

* Service health tab -- The health tab provides a holistic view of your service health at a glance. The health is computed based on the imported alert bundles. The health compuation is compatible with time travel so you can view service health in the past.
* Alert Bundles -- An alert bundle is a collection of alert templates which can be imported in a service just like a dashboard. The same alert bundle(s) can be imported across different services thus reducing the overhead of maintaining a unique alert policy for each service. The filters and thresholds for an alert bundle can be configured while importing.
* Analytics Sandbox -- Express analytics like never before with the new analytics system. It allows you to construct complex expressions and mathematical transforms on multiple data sources at once. Note: Full dashboard and alert support for new analytics will be available in the next release.
* PostgreSQL analysis -- Observe PostgreSQL interactions down to the query level. Track and alert on latency for individual queries, server errors and so on! Also includes PostgreSQL metrics integration (reported by PostgreSQL) in addition to interaction analysis.
* Enhanced stream processor performance -- AOC can now analyze more interactions per second than ever before!

## 1.0.5 - 11/14/2016

***Note***: If you had containerized collectors or collectors installed on RHEL-based systems, please *remove those collectors* before upgrading Netsil AOC to 1.0.5. Collector auto-upgrades only worked for Debian-based systems in releases prior to 1.0.5.

* Thrift analysis -- Observe thrift interactions down to the method names. Track and alert on latency for individual methods, response types and so on!
* Verified services view -- All the verified services can now be viewed and edited at a single location in the configuration section.
* Better cluster management -- Exposed DC/OS, Marathon and Zookeeper Exhibitor User Interface in the configuration page. You may have to authenticate at the endpoint `https://your.netsil.url:4443` before accessing the cluster management page.
* Auto-upgrades for RHEL-based and containerized collectors -- The container collectors can now auto-upgrade when Netsil AOC is upgraded.
* Various bugfixes in the AOC upgrade system.

## 1.0.4 - 10/21/2016

***Note***: This release has multiple changes to the underlying platform and it is highly recommended that your existing installation is replaced with a fresh instance of Netsil AOC and its latest collectors.

* Added ability to filter interaction metrics by server ports.
* AWS EC2 instance tags: Now you can configure automatic AWS EC2 instance tags collection and segment your interaction metrics and infrastructure metrics based on them.
* Collector auto-upgrades (for Linux collectors): Your existing collectors now auto-upgrade when Netsil AOC is upgraded. Stay tuned for auto-upgrades of Docker Container collectors in our next release.
* Services Table View: In addition to services topology, now you can view your services in a tabular form as well for a quick overview of their health and metrics.
* Various bug and stability fixes:
	* Downgraded Mesosphere DC/OS from version 1.8 to 1.7 to prevent volume removal on Netsil AOC instance reboot.
	* Exposed port 80 for HTTP access to Web UI (optional).
	* Metrics data auto-evicts when the disk is getting full.
	* No more hanging processes when collectors are re-downloaded and re-installed on bare-metal hosts. To fix the collectors on your current hosts:
        1. Stop the current collectors with `/etc/init.d/netsil-collectors stop`.
        2. Completely remove the netsil-collectors package from your system with `sudo apt-get purge netsil-collectors` or `sudo yum remove netsil-collectors`, depending on your operating system
        3. Run `ps -eaf | grep collectors` to identify any hanging processes. Note their PIDs and kill them with `kill -9 <pid>`
        4. Re-install the collectors from the Help page.
* Single-container packages of Netsil AOC now come embedded with Druid time-series database for efficient long term data retention.

## 1.0.2 - 10/10/2016

* DNS Analysis: Observe DNS interactions down to query level. Track DNS errors such as "Non-Existent Domain" and "Lookup Timeouts" and measure response latencies. Don't let DNS issues impact critical applications!
* Service Link Metrics: In addition to tracking service-level metrics, AOC now lets you pin-point potential issues and hotspots between any pair of service. A great way to detect client errors (4xx), incorrect API invocations etc.
* Various bug fixes.

## 1.0.1 - 03/10/2016

 * Various stability fixes
 * Scalable topology clustering algorithm — Scales to large number of unique resources in a large and diverse application

## 1.0.0 - 09/25/2016

 * Production grade features:
     * Scalable Ingestion — Horizontally scale `stream-processors` to analyze web-scale apps.
     * Fast analytics — Powered by `Druid`, a timeseries optimized database [(www.druid.io)](www.druid.io).
     * Scalable Storage — Local mount and `S3` are available as deep-storage options.
     * 1-click updates for the cluster.
     * Easy administration — Powered by `DC/OS`.

 * Attach dashboards to a service profile — allows user to build custom dashboard templates and load them with the context of a service. This alleviates the need to clone dashboards each time a new service is introduced.

 * MySQL metrics integration, in addition to `MySQL` interaction analytics.
 * Various bug fixes

## 0.2.36 - 09/12/2016

 * New charting library based on [HighCharts](http://www.highcharts.com/).
 * Global search capabilities to help quickly locate services, instances and resources such as `REST API` endpoints.
 * Improved default dashboards — `REST APIs`, `MySQL`, `NetworkFlows`, `DNS`, `System & Docker` stats.
 * Filter templates on dashboards for faster orientation during incidents and planning. Quickly load dashboards with right data with a few clicks!
 * `MySQL` analysis — Observe `MySQL` interactions down to the query level. Track and alert on latency for individual. queries, server errors and so on!
 * `NetworkFlow` analysis — Track and alert on TCP connection performance metrics such as retransmissions, out of order counts and so on!
 * Various bug fixes and improvements.
 * Stay tuned for our next release (3rd week of Sept’16) which will have production grade features such as clustering capability to scale traffic processing, scalable time series database and deep storage options for `S3` and `HDFS`.
