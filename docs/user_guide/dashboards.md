## Overview
Dashboards are collections of metrics and charts that provide complete insight into health of application components. 
<img width="1017" alt="screen shot 2017-02-16 at 12 26 16 pm" src="https://cloud.githubusercontent.com/assets/23368535/23039794/b777c612-f443-11e6-9bf2-0eb6b4398fca.png">

- Custom dashboards: These are user created dashboards.
- Default dashboards: These are out-of-the-box dashboards for all the supported datasources such as `DNS, MySQL, HTTP, Memcached, PostgreSQL`, etc. Defaults dashboards include a summary dashboard which provides point-in-time values as well as values along meaningful attributes of the datasource (e.g. DNS domain types or HTTP status codes). Additionally there is a trends dashboard which provide temporal trends for the metrics. Default dashboards can't be deleted but they can be cloned for further customizations.

<img width="719" alt="screen shot 2017-02-16 at 12 26 26 pm" src="https://cloud.githubusercontent.com/assets/23368535/23039793/b777ba5a-f443-11e6-8e6c-359a8ca6d00b.png">

# Creating Dashboards
Dashboards can be created from scratch or cloned from existing default or custom dashboards. (Please consult [analytics documentation](https://github.com/netsil/docs/blob/master/docs/user_guide/analytics.md) for more details on creating charts for dashboards.)

<img width="1021" alt="screen shot 2017-02-16 at 12 26 37 pm" src="https://cloud.githubusercontent.com/assets/23368535/23039796/b7792868-f443-11e6-8f3c-f5e78a176703.png">

## Global Filters
Global filters are applied to all the charts in the dashboards. Filters on same attribute will get combined using _or_; filters on different attributes are combined using _and_. For e.g. `(MySQL Query Type = SELECT .or. MySQL Query Type = INSERT) .and. MySQL Server = 10.0.0.50)`

<img width="1019" alt="screen shot 2017-02-16 at 12 27 44 pm" src="https://cloud.githubusercontent.com/assets/23368535/23039797/b7858946-f443-11e6-9a1e-dd6194738435.png">

<img width="1019" alt="screen shot 2017-02-16 at 12 30 06 pm" src="https://cloud.githubusercontent.com/assets/23368535/23039795/b77839bc-f443-11e6-8eb4-cd4e996821e8.png">


# Sharing Dashboards
Dashboards can be shared easily among AOC users, by simply sending the URL for the dashboard. The URL has all the information needed for other users to access the same dashboard along with selected time window, applied filters etc.

<img width="935" alt="screen shot 2017-02-17 at 10 11 47 am" src="https://cloud.githubusercontent.com/assets/23368535/23085568/51bbe97c-f51d-11e6-9558-26d7ce08dd70.png">

