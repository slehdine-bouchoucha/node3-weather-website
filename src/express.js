//calling all the require vriables and packages
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();
const geoCode = require("./util/geo");
const forecast = require("./util/forecast");
//paths
const fileLocation = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
//set up handelbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(fileLocation));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "sleh dine",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about page",
    describe: "in this page you will find the the thing tolk about wweather",
    name: "sleh dine",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    describe: "you can drope here any question and we gona replie soon",
    name: "sleh dine",
  });
});
app.get("/weather", (req, res) => {
  try {
    if (!req.query.adress) {
      return res.render("404", { msg: "you need to set the adress" });
    }
    geoCode(req.query.adress, (error, response) => {
      if (error) {
        res.render("404", {
          msg: "this adreess not availble",
        });
      } else {
        forecast(response.long, response.lan, (error, resp) => {
          if (error) {
            res.render("404", { msg: error });
          } else {
            res.send({
              weather: resp,
            });
          }
        });
      }
    });
  } catch (error) {
    res.render("404", { msg: "error" });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    msg: "help dont have any other options!",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    msg: "route not found !",
  });
});
app.listen(3000, () => {
  console.log("your app loaded in the server with port 3000");
});
