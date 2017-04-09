
# Authenticate and Store Cookie
Currently we leverage cookie based authentication.

## Request
- HTTP Method: POST
- Content-Type: application/x-www-form-urlencoded
- URL: http://your.netsil.url/login
- Form Data: username=your_user_name&password=your_passwd

## Response
```
HTTP/1.1 302 Found
X-Powered-By: Express
Location: /
Vary: Accept, Accept-Encoding
Content-Type: text/plain; charset=UTF-8
Content-Length: 23
set-cookie: connect.sid=s%3Au_va8B2aTzAteWT6SUJaLjbjd8sh0ymw.7rb0pZ%2FtHeARVJbrB3kH0voAgjLoyVv5lAWdEndS52s; Path=/; Expires=Mon, 21 Nov 2016 17:46:26 GMT; HttpOnly
Date: Fri, 11 Nov 2016 17:46:26 GMT
Connection: keep-alive
```

## Example
The *header* file will have the cookie. For e.g.
```bash
curl --data "username=your_user_name&password=your_pwd" --dump-header headers http://your.netsil.url/login
```
Then you use the *header* file to provide the cookie based authentication for subsequent API calls. For e.g.
```bash
curl -L -b headers http://your.netsil.url/alerts-service/alerts/
```
