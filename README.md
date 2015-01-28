# HttpToGelf
A node.js http to [gelf](https://www.graylog2.org/resources/gelf) logger 

## usage 

### send a message

POST `/gelf/log/{myapp}/{mycategory}/?token=xxx`  
add Content-Type: /application/json to the headers

### compute the token 

`md5(app + category + secretKey);`

`secretKey` is located in `config/ENV.json` according to the {app}

## message generated

The json contained in the request body will be merge in the message. 

POST on /gelf/log/myapp/mycategory/ with this body : 

```
{ 
  "charlie": "jesuischarlie" ,
  "test": "raoul"
}
```

will generate this gelf message : 

```
{
       "facility" => "HttpToGelf - dev",
          "level" => 6,
        "version" => "1.0",
           "host" => "MacBook-Pro-de-Olivier-2.local",
       "@version" => "1",
     "@timestamp" => "2015-01-08T15:09:16.257Z",
    "source_host" => "127.0.0.1",
        "message" => "{\"object\":\"message from myapp : mycategory\",\"payload\":\"{\\\"charlie\\\":\\\"jesuischarlie\\\",\\\"test\\\":\\\"raoul\\\"}\",\"app\":\"myapp\",\"category\":\"mycategory\",\"test\":\"raoul\",\"charlie\":\"jesuischarlie\"}",
         "object" => "message from myapp : mycategory",
        "payload" => "{\"charlie\":\"jesuischarlie\",\"test\":\"raoul\"}",
            "app" => "myapp",
       "category" => "mycategory",
           "test" => "raoul",
        "charlie" => "jesuischarlie"
}
```
