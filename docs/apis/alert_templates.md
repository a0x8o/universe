# Get All Alert Templates 
## Request

- Requires [authentication](authentication.md)
- HTTP Method: GET
- URL: http://your.netsil.url/api/v0/alert/template

## Response
Returns an array of all the alerts accessible to the user. Each alert has an _id_ which can be used to get the specific alert. See [Alerts Overview](alerts_overview.md) doc for more details on the json spec for alerts.

## Example
Note *headers* file has the [authentication cookie](authentication.md). 
```bash
curl -L  -b headers  -X GET http://your.netsil.url/api/v0/alert/template
```
Response
```json
[
  {
    "id":"19b8221b-2c7d-4e40-a2cb-1322884c45d8",  /* Alert id */
    "name":"HTTP Alert Template",     /* Alert template name */
    "filters":[{...}, {...}, ...],    /* An array of global filters applied to all the metrics used in the template. */
    "AlertRules":[{...}, {...} ... ], /* Array of alert rules */           
    "AlertInstances":[...]            /* Array of alert instances */
  },
  {...},
  {...},
  ...
]
```

# Get Specific Alert Template
## Request

- Requires [authentication](authentication.md)
- HTTP Method: GET
- URL: http://your.netsil.url/api/v0/alert/template/*alertTemplateId*

## Response
Return specific alert identified by the *alertId*. See [Alerts Overview](alerts_overview.md) doc for more details on the json spec for alert 

## Example
Note *headers* file has the [authentication cookie](authentication.md). 
```bash
curl -L  -b headers  -X GET http://your.netsil.url/api/v0/alert/template/19b8221b-2c7d-4e40-a2cb-1322884c45d8
```
Response
```json 
 {
    "id":"19b8221b-2c7d-4e40-a2cb-1322884c45d8",  /* Alert id */
    "name":"HTTP Alert Template",     /* Alert template name */
    "filters":[{...}, {...}, ...],    /* An array of global filters applied to all the metrics used in the template. */
    "AlertRules":[{...}, {...} ... ], /* Array of alert rules */           
    "AlertInstances":[...]            /* Array of alert instances */
}
```

# Create Alert Template
## Request
- Requires [authentication](authentication.md)
- HTTP Method: POST
- URL: http://your.netsil.url/api/v0/alert/template

## Response
Returns json spec for alert template

## Example
Note *headers* file has the [authentication cookie](authentication.md). 
```bash 
curl -b headers -H "Content-Type: application/json" -X POST --data @simple_new_template.json http://your.netsil.url/api/v0/alert/template
```
where simple_new_template.json is:
```json
{
	"filters":[],
	"name":"NEW ALERT TEMPLATE FROM API",
	"AlertRules":[],
	"AlertInstances":[]
}
```
The following is the response which includes the alert template id:
```json
{
  "filters":[],
  "id":"3671929e-3af4-482b-a618-53a806aae0a2",   
  "name":"NEW ALERT TEMPLATE FROM API",
  "AlertRules":[],
  "AlertInstances":[],
  "updatedAt":"2017-02-10T20:15:55.000Z",
  "createdAt":"2017-02-10T20:15:55.000Z"
}
```
# Delete Alert Template

## Request
- Requires [authentication](authentication.md)
- HTTP Method: DELETE
- URL: http://your.netsil.url/alerts-service/api/v0/alert/template/*alertTemplateId*

## Example
Note *headers* file has the [authentication cookie](authentication.md). 
```bash
curl -b headers -H "Content-Type: application/json" -X DELETE  http://your.netsil.url/api/v0/alert/template/a1b6cdd8-37ad-4fca-940b-89006909856e
```
