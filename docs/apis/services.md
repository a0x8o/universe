# Get All Services 
## Request

- Requires [authentication](authentication.md)
- HTTP Method: GET
- URL: http://your.netsil.url/api/v0/service 

## Response
Returns an array of verfified services. Verfied services are those services for which the signature has been defined by a user or auto-discovered signature has been explicity verified by a user.

```json
[ { ... },
  {
    "signature":{
        "uri":[
         {
          "starLeft":false,
          "value":"/uri/path/for/rest/service",
          "starRight":false
         }
        ]
    },
  "serviceId":"0dad0b45-3d6f-46dc-8dc2-c7fc932aeac7",
  "hidden":false,
  "name" : "name of the service",
  "description" : "description of the service"
  },
  { ... }
]
```
## Example
Note *headers* file has the [authentication cookie](authentication.md). 
```bash
curl -L -b headers  http://your.netsil.url/api/v0/service 
```

# Get Specific Service 
## Request

- Requires [authentication](authentication.md)
- HTTP Method: GET
- URL: http://your.netsil.url/api/v0/service/id_of_the_service

## Response
Returns details of the service. 
```json
{
  "signature":{
      "uri":[
       {
        "starLeft":false,
        "value":"/uri/path/for/rest/service",
        "starRight":false
       }
      ]
  },
"serviceId":"0dad0b45-3d6f-46dc-8dc2-c7fc932aeac7",
"hidden":false,
"name" : "name of the service",
"description" : "description of the service"
}
```
## Example
Note *headers* file has the [authentication cookie](authentication.md).
```bash
curl -L  -b headers  -X GET http://your.netsil.url/api/v0/service/0dad0b45-3d6f-46dc-8dc2-c7fc932aeac7
```

# Edit Specific Service 
## Request

- Requires [authentication](authentication.md)
- HTTP Method: POST
- URL: http://your.netsil.url/api/v0/service/edit


## Example
Note *headers* file has the [authentication cookie](authentication.md).
```bash
curl -b headers -H "Content-Type: application/json" -X POST --data @service.json http://your.netsil.url/api/v0/service/edit
```
Where service.json has the following attributes for the service:
```json
{
  "signature":{
      "uri":[
       {
        "starLeft":false,
        "value":"/uri/path/for/rest/service",
        "starRight":false
       }
      ]
  },
"serviceId":"0dad0b45-3d6f-46dc-8dc2-c7fc932aeac7",
"hidden":false,
"name" : "name of the service",
"description" : "description of the service"
}
```
# Create Service 
## Request

- Requires [authentication](authentication.md)
- HTTP Method: POST
- URL: http://your.netsil.url/api/v0/service/verify

##Response
Service-id of the new service

## Example
Note *headers* file has the [authentication cookie](authentication.md).
``` bash
curl -L -b headers -H "Content-Type: application/json" -X POST --data @new_service.json http://demo.netsil.io/api/v0/service/verify 
```

Where new_service.json has the following attributes describing the service. Note that since this is new service it doesn't have a _serviceId_ attribute.

```json
{
    "description" : "new service partner authentication ",

    "name" : "New Service Partner Ext Auth",

        
    "signature": {
            
            "uri":[{"starLeft":false,"value":"/newservice/partner/extauth","starRight":true}]
    },
    
    "hidden":false
}
```

```bash
curl -b headers -H "Content-Type: application/json" -X POST --data @new_service.json http://your.netsil.url/auth-api/service/verify
```
