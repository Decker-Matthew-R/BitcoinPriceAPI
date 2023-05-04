//Server Creation
//Import Express Package
const express = require("express");
//Assign express variable
const app = express();
//Import node-fetch package
const fetch = require("node-fetch");
//Assign Port from env OR assign to port 3000
const port = process.env.PORT || 3000;

//Makes public folders public
app.use(express.static("public"));

//API Variabes
const baseURL = " ";

//ROUTING
//Redirect from base url to /home url
app.get("/", (req, res) => res.redirect("/home"));

//Connect home.ejs to website
app.get("/home", (req, res) => res.render("index.ejs"));

//Catchall redirect
app.get("/*", (req, res) => res.redirect("/home"));

app.listen(port, () => console.log(`Bitcoing Project on ${port}`));

app.use(express.static("public"));
