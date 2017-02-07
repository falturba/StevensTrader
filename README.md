
## Connect Database
To connect using the mongo shell:
mongo ds139959.mlab.com:39959/stevenstradersystem -u <dbuser> -p <dbpassword>
To connect using a driver via the standard MongoDB URI (what's this?):

```url
mongodb://<dbuser>:<dbpassword>@ds139959.mlab.com:39959/stevenstradersystem
```

DB User details

Name       -    dbuser
Password  -   strader@123


```json
Raw User Configuration

{
    "_id": "stevenstradersystem.dbuser",
    "user": "dbuser",
    "db": "stevenstradersystem",
    "roles": [
        {
            "role": "dbOwner",
            "db": "stevenstradersystem"
        }
    ]
}
```

## Run React Dev
Install dependencies in local environment
```shell
$npm install
```
Run react client from
```shell
$npm run dev
```
using port 8080
```url
http://localhost:8080
```

