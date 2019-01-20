var bodyParser = require("body-parser"),
mongoose = require("mongoose"),
express = require("express"),
app = express();

//App Config
mongoose.connect('mongodb://xiabi:ruyoushen123@ds161764.mlab.com:61764/garysnotebook', { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));//for serving custom stylesheet
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    snippet: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

app.listen(3001, function(){
    console.log("listening on 3001");
});

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
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is now running..");
});