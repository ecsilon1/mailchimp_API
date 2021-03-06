//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req,res){
  res.sendFile(__dirname + "/signup.html");

});


app.post("/", function(req,res){
const text=req.body.text;
const name=req.body.name;
const email=req.body.email;
var data={
  members: [
    {
    email_address:email,
    status:"subscribed",
    merge_fields:{
      FNAME: text,
    LNAME: name
  }
}
]
};


var jsonData=JSON.stringify(data);
const url="secret";
const options={
  method:"POST",
    auth:"razvan:mailchimp_authentification"
};

const request= https.request(url, options, function(response){
  if(response.statusCode===200){
  res.sendFile(__dirname + "/success.html");
  }
  else{
    res.sendFile(__dirname + "/failure.html");
  }
  response.on("data" ,function(data){
    console.log(JSON.parse(data));


  });

});
request.write(jsonData);
request.end();
});

app.post("/failure.html" , function(req, res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000 ");

});
