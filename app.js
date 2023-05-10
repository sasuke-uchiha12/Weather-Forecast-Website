const express = require("express");
const { json, sendFile } = require("express/lib/response");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    // console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "d86d7bb556e180ac7ef57ee026385cef";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            // console.log(icon);
            const imageUrl = " https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>Weather Report</h1>");
            res.write("<h2>The Temperature in " + query + " is " + temp + " degree celcius.</h2>")
            res.write("<p>The current weather is " + weatherDesc + "<p>");
            res.write("<img src = " + imageUrl + ">");
            res.send();
        })
    })
})


app.listen(3000, function(){
    console.log("Server is running on port 3000");
})