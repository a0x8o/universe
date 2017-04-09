## Overview
Alerts define health conditions for services. The violation of these conditions results in notifications to responsible users via email, pagerduty etc. Upon switching to the alerts tab, the user will see a dashboard summary of all the alerts along with their trigger status. The trigger status is for the selected time window using slider. Color coding on trigger status refers to:

* Red: critical threshold violation
* Yellow: warning threshold violation
* Green: no violations

<img width="1022" alt="screen shot 2017-02-16 at 11 22 28 am" src="https://cloud.githubusercontent.com/assets/23368535/23037217/63797410-f43a-11e6-8c2b-98aa7bf2ca25.png">

# Alert Templates
AOC provides a template based approach for alerts. Alert templates can be defined once and instantiated multiple times. Alert templates have following characteristics

* Alert templates define a set of alert rules (i.e. queries and metrics). (Please consult [analytics documentation](analytics.md) for details on building alert rules.)
* Alert templates have global filters that apply to all the alert rules and all the alert instances. Filters on same field will be combined using _or_ ;and filters on different fields are combined using _and_. For e.g. `(HTTP Status Code = 400 .or HTTP Status Code = 500) .and. (Server = 10.0.0.50)`
* Any modification to alert rules or to alert filters is propogated to all alert instances.
* Alert templates do not have notifications or trigger conditions. These are set in alert instances.

<img width="1020" alt="screen shot 2017-02-16 at 11 37 27 am" src="https://cloud.githubusercontent.com/assets/23368535/23037739/5affdfa2-f43c-11e6-9959-3894bae31537.png">

# Alerts
Alert instances (or simply alerts) have following characteristics 

* Alerts are always created from a template
* Alerts inherit the rules (i.e queries and metrics) from templates. These rules **can not be modified** in alerts. Rules should be added, deleted or updated in alert templates. 
* Alerts inherit global filters from the template. These filters **can be** deleted, updated etc. in the instance. Additional filters can also be defined for the alert.
* Alerts can be _Global_ i.e. alert applies to all application components associated with a datasource. For e.g., a Global Alert on HTTP throughput will be applied to all HTTP services in the application
* Alerts can be defined for a specific service. For e.g. alert defined on HTTP service serving `/cust/cart/mongodb/shpppingcart`. The service needs to be defined previously to associate an alert. (Please consult [service documentation](topology.md) for more details on creating services.)

<img width="1014" alt="screen shot 2017-02-16 at 11 30 36 am" src="https://cloud.githubusercontent.com/assets/23368535/23037488/67c2717e-f43b-11e6-8ad3-98351af93505.png">
