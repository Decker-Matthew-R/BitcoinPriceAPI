//Server Creation
//Import Express Package
const express = require("express");
//Assign express variable
const app = express();
//Import node-fetch package
const fetch = require("node-fetch");
//Assign Port from env OR assign to port 3000
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

//ROUTING
//Redirect from base url to /home url

app.get("/", (req, res) => res.redirect("/home"));

app.listen(port, () => console.log(`Bitcoing Project on ${port}`));

// // Connect home.ejs to website
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
      console.log(parsedData);
      let code = parsedData.bpi.USD.code;
      let symbol = parsedData.bpi.USD.symbol;
      let rate = parsedData.bpi.USD.rate_float;
      let newRate = parsedData.bpi.USD.rate_float.toFixed(2);
      console.log(rate);
      res.render("index.ejs", { code, symbol, newRate });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/bitcoinPrice", (req, res) => {
  let endpoint = "https://api.coindesk.com/v1/bpi/currentprice.json";
  let { bitcoinPrice } = req.query;
  console.log(bitcoinPrice);
  fetch(endpoint)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error("API Data Error");
      }
    })
    .then((parsedData) => {
      const { code, symbol, rate, rate_float } =
        parsedData.bpi[req.query.bitcoinPrice];
      let newRate = rate_float.toFixed(2);
      res.render("index.ejs", { code, symbol, newRate });
    })
    .catch((err) => {
      console.log(err);
    });
});
