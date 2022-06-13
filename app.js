const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const DOMParser = require("xmldom").DOMParser;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  const semURL = " https://nubanner.neu.edu/StudentRegistrationSsb/ssb/classSearch/getTerms?offset=1&max=3";
  var url = "https://nubanner.neu.edu/StudentRegistrationSsb/ssb/searchResults/getEnrollmentInfo?term=202310&courseReferenceNumber=16235";
  var info = https.get(semURL, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const semesterInfo = JSON.parse(data);
      const semesterCode = semesterInfo[2].code;
      const semesterDes = semesterInfo[2].description;
      

      const semester = semesterDes + " - " + semesterCode;

      res.write("<h1>" + semester + "</h1>");
    });
  });

  var courseStuff = https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      // var parser = new DOMParser();
      // var htmlDoc = parser.parseFromString(data, "text/xml");
      res.write(data);
      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log("server started on port 3000");
});