# Alerts Overview
Netsil AOC provides a template based approach for creating and using alerts. Alert templates can be defined once and applied multiple time to various services. Alert templates consist of:
* multiple queries which define datapoints for alerting 
* information about alert instances using the template
* trigger conditions for the alert instances
* notification list

As a result alert templates can get very complex to define manually and use with APIs. We strongly recommend that you create alert templates and alerts in the UI; then export _json spec_ from the UI. 

<img width="1353" alt="screen shot 2017-02-09 at 11 34 55 am" src="https://cloud.githubusercontent.com/assets/23368535/22800048/ebee3f7a-eebc-11e6-9f81-779462607023.png">

After exporting from the UI, an alert template has the following high level json spec:
```js
{
  "id":"19b...5d8",                 /* Alert id */
  "name":"HTTP Alert Template",     /* Alert template name */
  "filters":[{...}, {...}, ...],    /* An array of global filters applied to all the metrics used in the template. */
  "AlertRules":[{...}, {...} ...],     /* Array of alert rules */           
  "AlertInstances":[{...}, {...} ...]   /* Array of alert instances */
}
```

## Defining Alert Rules in Alert Templates
An alert template has an array of _AlertRules_. An alert rule has the following json spec:
```js
"AlertRules": [ 
  {
    "id":"HEBYY",                    /* Alert rule id */
    "alertTemplateId":"ryteu",       /* Associated alert template id */
    "name":"HTTP Throughput",        /* Name of the alert rule */
    "statements":[...],              /* Queries that will generate the datapoints to be used for alert condition.*/ 
    "selectedReferences":["A","B"],  /* Results of queries are named using alphabets. This is an array of selected results */ 
    "chartTypes":{}                  /* Chart types can be `line-chart`, `bar-chart`, `area-chart` */
  },
  {...},
  ...
]
```

### Defining Queries
Queries are used to generate datapoints for alert conditions. Each query can be made up of multiple query statements as well as statements combining those queries (for e.g using mathematical operations). Further more you can have many sub-queries. Since queries involve datasources, filters, group-by, aggregation functions, etc. they can get complex very soon.  The easiest option to generate json spec for queries is to use the _Netsil AOC Analytics Sandbox_ and export the json from there. Build the queries in the UI, obtain the right metrics to monitor, and then simply copy and paste the json `"statements": [...]` to the alert template json.
<img width="1341" alt="screen shot 2017-02-08 at 3 59 17 pm" src="https://cloud.githubusercontent.com/assets/23368535/22763478/da5f9d6a-ee19-11e6-99b5-940ac4bf1d5f.png">

Key components of the array of queries are:
```js
"statements":[                  /* An array of queries */
  {                             /* Individual query block */
    "name":"main query",        /* Query name */
    "_type":"assignment",       /* Internal use type value; top-level query blocks are of "assignment" type */
    "value":{                   /* Value is the struct containing multiple query statements that will generate the datapoint*/
        "statements":[],        /* Query statements */
        "_type":"local_scope"   /* Internal use type value; query statments are of "local_scope" type */
    }
  },
  { ... },
  ...
]
```

Key components of the query value block are:

```js
    "value":{                /* Value is the struct containing multiple query statements that will generate the datapoint*/
        "statements":[         /* Array of query statements */ 
            {                /* Individual query block */
                "name":"A",  /* Auto-generate alphabet based name for query statement, so that we can reference the value */
                "value":{    /* Query statement value */                                          
                    "query":{   /* Query block */
                        "report-name":"HTTP.RequestResponse.Count",  /* Datasource name for the query */
                        "options":{                           /* Query options/parameters */
                            "FILTER":{...},                   /* Filter definition */
                            "Metrics":{                       /* Defines aggregation functions to apply on datasource */
                              "A":{ "column": "", "aggregate": "THROUGHPUT" }  /* Perform "THROUGHPUT" on query statement A */
                            },
                            "GroupBy":{...},    /* Group by parameters */        
                            "timeshift":0       /* Time shift in seconds; time "T" will plot "T-timeshift" datapoint */
                        }     /* End of query block */
                    },
                    "_type":"netsil_query"      /* Internal use statement type */ 
                },
                "_type":"assignment"            /* Internal use statement type */ 
            },
            {
                "A":{...}    /* Internal use block to return the datapoint values. Leave this as is in the json spec */
            }
        ],
        "_type":"local_scope"  /* Internal use statement type */ 
   }
```


## Defining Alert Instances 
An alert template has an array of _AlertInstances_. AlertInstances are instantiations of alert template either applied to a specific service (such as Shopping Cart, Credit Card Payment service, etc.) or applied globally (such as all HTTP services). Alert instance has the following json spec.
```js
   "AlertInstances": [
      {                                  /* Alert instance block; one per instance of the alert */
        "id":"MrMUv",                    /* Alert instance id */
        "alertTemplateId":"19b8...5d8",  /* Alert template id */
        "filters":[...],       /* Any global filters on datapoints used in the alert condition */
        "serviceId":"394e67be-5008-4937-a42a-94ccd5d12c37",  /* Service Id for apply the alert or null for global */
        "name":"Alert for Credit Card Payment Service",      /* Name of the alert instance */
        "AlertTriggers":[                       /* Array of trigger condition; one condition per alert datapoint */
              {
                "id":"qSqJh",                   /* Id for alert condition */
                "alertInstanceId":"MrMUv",      /* Alert instance id */
                "alertRuleId":"HEBYY",          /* Associated alert rule that generates datapoints for the condition */
                "conditions":{       
                    "aggregation":{             /* Aggregation function for the time series datapoints */ 
                      "function":"avg",         /* Function can be avg, max, min */
                      "duration":60             /* Aggregation duration in seconds */
                    },
                    "comparison":{              /* Define the threshold comparison */
                      "operator":">",           /* Operator can be >, < or = */
                      "criticalThreshold":750,  /* Critical threshold */  
                      "warningThreshold":700    /* Warning threshold */
                    }
                },
                "silenced":false                /* Muted or not */
              }
        ],
        "Notifications":[                       /* Array of notifications */
                {
                  "config":{
                      "type":"aoc",             /* Type of notification - aoc, email, or pagerduty */
                      "users":[                 /* list of users to notify */
                          { "userId":"3daaad43-e66c-4d53-8b12-226a87a99974", "username":"admin"} 
                      ]
                   }
                },
                {...}  
        ]
      },
      {...},
      ...
   ]
      
```
