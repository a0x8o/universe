# Get All Alerts 
## Request

- Requires [authentication](authentication.md)
- HTTP Method: GET
- URL: http://your.netsil.url/api/v0/alert/instance

## Response
Returns an array of all the alerts accessible to the user. Each alert has an _id_ which can be used to get the specific alert. See [Alerts Overview](alerts_overview.md) doc for more details on the json spec for alerts.

## Example
Note *headers* file has the [authentication cookie](authentication.md). 
```bash
curl -L  -b headers  -X GET http://your.netsil.url/api/v0/alert/instance
```
Response
```json
[
	{
		"AlertTriggers":[...],                /* Alert trigger conditions */
		"AocNotifications":[...], 	      /* Notifications in AOC application */
		"EmailNotifications":[...], 	      /* Email notifications */
		"PagerdutyNotifications":[...],       /* Pagerduty notifications */
		"WebhookNotifications":[...],         /* Webhook notifications */
		"alertTemplateId":"062e224c-814c-415e-ab9d-c320b5920306",    /* Alert tempalte id */
		"createdAt":"2017-02-25T06:29:42.000Z",                      /* Create date time */
		"creatorId":"ea63b4a6-7f68-4e38-9761-65f99d88ccf6",          /* User id of creator */
		"description":null,                              /* Alert description */            
		"filters":[...],                                 /* Global filters for all the rules for this instance */
		"id":"71e09151-16de-45ba-b43c-a937330f179c",     /* Alert id */  
		"name":"Alert Instance",                         /* Alert name */
		"serviceId":null,          /* Service id for which the alert instance is defined. Null implies global */
		"updatedAt":"2017-02-25T06:29:42.000Z"     /* Datetime for last update */
	},
	{...}
]
```

# Get Specific Alert Template
## Request

- Requires [authentication](authentication.md)
- HTTP Method: GET
- URL: http://your.netsil.url/api/v0/alert/instance/*alertId*

## Response
Return specific alert identified by the *alertId*. See [Alerts Overview](alerts_overview.md) doc for more details on the json spec for alert 

## Example
Note *headers* file has the [authentication cookie](authentication.md). 
```bash
curl -L  -b headers  -X GET http://your.netsil.url/api/v0/alert/instance/71e09151-16de-45ba-b43c-a937330f179c
```
Response
```json
{
		"AlertTriggers":[...],                /* Alert trigger conditions */
		"AocNotifications":[...], 	      /* Notifications in AOC application */
		"EmailNotifications":[...], 	      /* Email notifications */
		"PagerdutyNotifications":[...],       /* Pagerduty notifications */
		"WebhookNotifications":[...],         /* Webhook notifications */
		"alertTemplateId":"062e224c-814c-415e-ab9d-c320b5920306",    /* Alert tempalte id */
		"createdAt":"2017-02-25T06:29:42.000Z",                      /* Create date time */
		"creatorId":"ea63b4a6-7f68-4e38-9761-65f99d88ccf6",          /* User id of creator */
		"description":null,                              /* Alert description */            
		"filters":[...],                                 /* Global filters for all the rules for this instance */
		"id":"71e09151-16de-45ba-b43c-a937330f179c",     /* Alert id */  
		"name":"Alert Instance",                         /* Alert name */
		"serviceId":null,          /* Service id for which the alert instance is defined. Null implies global */
		"updatedAt":"2017-02-25T06:29:42.000Z"     /* Datetime for last update */
}
```


# Delete Alert 

## Request
- Requires [authentication](authentication.md)
- HTTP Method: DELETE
- URL: http://your.netsil.url/alerts-service/alert/*alertId*

## Example
```bash
curl -b headers -X "DELETE" http://your.netsil.url/api/v0/alert/instance/71e09151-16de-45ba-b43c-a937330f179c
```
