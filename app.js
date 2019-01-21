var bodyParser = require("body-parser"),
mongoose = require("mongoose"),
express = require("express"),
app = express();

//App Config
mongoose.connect('mongodb://xiabi:ruyoushen123@ds161764.mlab.com:61764/garysnotebook', { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));//for serving custom stylesheet
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static(__dirname + '/src'));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    snippet: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

//INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){console.log("Error!");}
     else {
        res.render("index", {blogs: blogs});//pass blogs the data under the name blogs to index
     }
})});

//Restful Routes
app.get("/", function(req, res){
    res.redirect("/blogs");
});

//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("show", {blog: foundBlog});
        }
    })
});

//Mailchimp Route
/*
app.post('/newsletter', function(req, res){
    addEmailToMailchimp(req.body.subscribe);
});

function addEmailToMailchimp(subscribe) {
    var request = require("request");
    var options = { method: 'POST',
    url: 'https://us20.api.mailchimp.com/3.0/lists/67883bced5/members',
    headers: 
    { 'Postman-Token': '6152c33f-9510-4586-8ab2-f8ce4dcb3ae3',
        'cache-control': 'no-cache',
        Authorization: 'Basic YW55c3RyaW5nOmFkYWM4M2QyYzFjMmU3M2RmZTc2MmNlMzhlYTliMDBkLXVzMjA=',
        'Content-Type': 'application/json' },
    body: { email_address: subscribe.email, "merge_fields": {
        "FNAME": subscribe.name}, status: 'subscribed' },
    json: true };
    request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
})};
*/

app.post('/newsletter', function(req, res){

    console.log(req.body);
    console.log(req.body.email);
    console.log("here");
    addEmailToMailchimp(req.body);
    
   //res.send(req.body.email); 
});

function addEmailToMailchimp(reqbody) {
    var request = require("request");
    var options = { method: 'POST',
    url: 'https://us20.api.mailchimp.com/3.0/lists/67883bced5/members',
    headers: 
    { 'Postman-Token': '6152c33f-9510-4586-8ab2-f8ce4dcb3ae3',
        'cache-control': 'no-cache',
        Authorization: 'Basic YW55c3RyaW5nOmFkYWM4M2QyYzFjMmU3M2RmZTc2MmNlMzhlYTliMDBkLXVzMjA=',
        'Content-Type': 'application/json' },
    body: { email_address: reqbody.email, "merge_fields": {
        "FNAME": reqbody.name}, status: 'subscribed' },
    json: true };
    request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
})};

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is now running..");
});
