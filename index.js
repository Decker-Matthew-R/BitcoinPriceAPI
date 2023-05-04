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
// let endpoint = "https://api.coindesk.com/v1/bpi/currentprice.json"

//ROUTING
//Redirect from base url to /home url
app.get("/", (req, res) => res.redirect("/home"));

//Connect home.ejs to website
app.get("/home", (req, res) => {
  console.log(req.query);
  let endpoint = "https://api.coindesk.com/v1/bpi/currentprice.json";
  fetch(endpoint)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error("API Data Error");
      }
    })
    .then((parsedData) => {
      console.log(req);
      console.log(parsedData);
      req.res.render("index.ejs");
    })
    .catch((err) => {
      console.log(err);
      res.send("index.ejs");
    });
  console.log(req.query);
});

//Catchall redirect
app.get("/*", (req, res) => res.redirect("/home"));

app.listen(port, () => console.log(`Bitcoing Project on ${port}`));

app.use(express.static("public"));
