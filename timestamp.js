"use strict"
const express = require('express'),
      app = express();

let portNumber = process.env.PORT || process.argv[2] || 8080;

app.get('/api/:time', function(request, response) {
  let timeObject = {},
      time = request.params.time;
  if (isNaN(time)) {

  } else {
    time = parseInt(time);
    timeObject["unix"] = time;
    timeObject["natural"] = new Date(time*1000).toDateString(); // multiply by 1000 because usually counted in seconds
  }
  response.json(timeObject);
});

app.listen(portNumber);