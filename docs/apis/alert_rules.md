# Get All Alert Rules 
## Request

- Requires [authentication](authentication.md)
- HTTP Method: GET
- URL: http://your.netsil.url/api/v0/alert/rule

## Response
Returns an array of all the alert rules from all alert templates accessible to the user. Each alert rule has an _id_ which can be used to get the specific rule. See [Alerts Overview](https://github.com/netsil/docs/blob/master/docs/apis/alerts.md) doc for more details on the json spec for alert rules.

## Example
Note *headers* file has the [authentication cookie](authentication.md). 
```bash
curl -L  -b headers  -X GET http://your.netsil.url/api/v0/alert/rule
```
Response
```json
[
  {
    "alertTemplateId":"apesf",       /* Alert template id containing the rule */
    "chartTypes":{...},                 /* Chart type such as line-chart, bar-chart */
    "createdAt":"2017-02-28T02:41:12.000Z",  /* Creation date time */
    "description":null,                      /* Alert rule description */
    "id":"xxgTU",                            /* Alert rule id */
    "name":"Throughput change against 5 minutes in the past (%)",  /* Alert rule name */
    "queries":[...],                         /* Queries returning the data for the rule */
    "selectedReferences":[...],  /* Query references used for identifying query results for e.g. for combining using mathematical operations*/
    "updatedAt":"2017-02-28T02:41:12.000Z"   /* Last update time */
  }
  {...},
  {...},
  ...
]
```

# Get Specific Alert Rule
## Request

- Requires [authentication](authentication.md)
- HTTP Method: GET
- URL: http://your.netsil.url/api/v0/alert/template/*alertRuleId*

## Response
Return specific alert rule identified by the *alertRuleId*. See [Alerts Overview](alerts_overview.md) doc for more details on the json spec for alert rule.

## Example
Note *headers* file has the [authentication cookie](authentication.md). 
```bash
curl -L  -b headers  -X GET http://your.netsil.url/api/v0/alert/rule/xxgTU
```
Response
```json
  {
    "alertTemplateId":"apesf",       /* Alert template id containing the rule */
    "chartTypes":{...},                 /* Chart type such as line-chart, bar-chart */
    "createdAt":"2017-02-28T02:41:12.000Z",  /* Creation date time */
    "description":null,                      /* Alert rule description */
    "id":"xxgTU",                            /* Alert rule id */
    "name":"Throughput change against 5 minutes in the past (%)",  /* Alert rule name */
    "queries":[...],                         /* Queries returning the data for the rule */
    "selectedReferences":[...],  /* Query references used for identifying query results for e.g. for combining using mathematical operations*/
    "updatedAt":"2017-02-28T02:41:12.000Z"   /* Last update time */
  }
```

# Delete Alert Rule

## Request
- Requires [authentication](authentication.md)
- HTTP Method: DELETE
- URL: http://your.netsil.url/alerts-service/api/v0/alert/rule/*alertRuleId*

## Example
Note *headers* file has the [authentication cookie](authentication.md). 
```bash
curl -b headers -H "Content-Type: application/json" -X DELETE  http://your.netsil.url/api/v0/alert/rule/a1b6cdd8-37ad-4fca-940b-89006909856e
```

