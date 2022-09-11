const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app. use(bodyParser.urlencoded({extended: true}));

// To use local style sheet (styles.css) and local images
app.use(express.static("public"));



app.get("/", function(req, res){

    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){
    const Fname = req.body.firstName;
    const Lname = req.body.lastName;
    const Email = req.body.email;

    const data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: Fname,
                    LNAME: Lname
                }
            }
        ]
    }


    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/c9e9bd70c1";

    const options = {
        method: "POST",
        auth: "unmesh30:f7d1750a51deb24de7f960a18e95a2e7-us10"
    }


    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }




        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();

});


app.post("/failure",function(req,res){
    res.redirect("/");
});




app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running at port 3000.");
});








