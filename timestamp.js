"use strict"
const express = require('express'),
      app = express();

let portNumber = process.env.PORT || process.argv[2] || 8080;

app
.get('/api/:timestamp', function(request, response) {
  let timeObject = {},
      datetime = request.params.timestamp;
  if (isNaN(datetime)) {
    let date = new Date(Date.parse(datetime));
    if (date == "Invalid Date") {
      timeObject["unix"] = null;
      timeObject["natural"] = null;
    } else {
      timeObject["unix"] = date.getTime()/1000;
      timeObject["natural"] = date.toDateString();
    }
  } else {
    datetime = parseInt(datetime);
    timeObject["unix"] = datetime;
    timeObject["natural"] = new Date(datetime*1000).toDateString(); // multiply by 1000 because usually counted in seconds
  }
  response.json(timeObject);
})
.get('*', function (request, response) {
  let responseString = "Please use web server as follows:\n\n" +
      "Go to https://aryanj-unix-converter.herokuapp.com/api/[timestamp]\n" +
      "where [timestamp] is a unix or natural language timestamp.\n\n" + 
      "This app returns null values in the case of invalid timestamps.";
  response.end(responseString);
});

app.listen(portNumber);