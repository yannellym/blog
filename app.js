//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');


const homeStartingContent = "Welcome!";
const aboutContent = "About Me";
const contactContent = "Email: yannellym@gmail.com";
let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req,res) {
  res.render("home", {
    homeStartingContent: homeStartingContent, 
  posts: posts });
});

app.get("/myposts", function(req,res) {
  res.render("myposts", {posts: posts })
})

app.get("/about", function(req,res){
  res.render("about", {aboutContent: aboutContent} );

});


app.get("/contact", function(req,res) {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req,res) {
  res.render("compose");

});

app.post("/compose", function(req,res) {
const newPost = {
  title: req.body.newComposeTitle, 
  body: req.body.newComposeBody
};
  
posts.push(newPost);
res.redirect("/myposts");
});

app.get("/posts/:postName", function(req,res){
  console.log("REQ: ", req.params)
  let newRequest = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
  let allTitles = _.lowerCase(post.title);

    if (allTitles === newRequest) {
      res.render("post", {
        title: post.title,
        body: post.body
      });
    } 

  });
});










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
