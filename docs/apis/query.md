We recommend to obtain the query json structure from the NETSIL AOC query builder. 
<img width="1402" alt="screen shot 2017-03-20 at 9 46 03 pm" src="https://cloud.githubusercontent.com/assets/23368535/24133658/d21cae38-0dbb-11e7-8b31-04929526d899.png">

# Run Query
## Request

- Requires [authentication](authentication.md)
- HTTP Method: POST
- URL: http://your.netsil.url/api/v0/query

## Response
Returns a JSON object containing array of datapoint values for each query statement.

## Example
To run query for _"HTTP Average Latency Group by HTTP URI for last 30mins"_ obtain the query json structure from AOC query builder. Store the json in say `simple_query.json`. 
```bash
curl  -s -b headers -H "Content-Type: application/json" -X POST --data  @simple_query.json http://demo.netsil.io/api/v0/query 
```
Note *headers* file has the [authentication cookie](authentication.md).

## Response:
```json
  {
    "A": {          /* query statement name */
        "data": [   /* array of values */
            {
                "A": 283.0,
                "INTERVAL": 1490071814000.0,
                "http.uri": "/pks/lookup"
            },
            {
                "A": 284.0,
                "INTERVAL": 1490071864000.0,
                "http.uri": "/pks/lookup"
            },
            {...},
            {...},
            {
                "A": 52.0,
                "INTERVAL": 1490070640000.0,
                "http.uri": "/v2/apps/frontend/restart"
            }
        ],
    }
}
```
