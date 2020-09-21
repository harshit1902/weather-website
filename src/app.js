// libraries required
const express = require("express");
const path = require("path");
const hbs = require("hbs");

const port = process.env.PORT || 3000;
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

const app = express();

// paths to serve static directory and views directory
const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialsDir = path.join(__dirname, "../templates/partials");

// configure hbs settings
app.set("view engine", "hbs");
app.set("views", viewsDir);

hbs.registerPartials(partialsDir);

// serving static dir
app.use(express.static(publicDir));

// /
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Harshit Goyal",
  });
});

// /about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Harshit Goyal",
  });
});

// /help
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    msg:
      "Fell free to mail us at dev.harshit19@gmail.com if you need any help.",
    name: "Harshit Goyal",
  });
});

// /weather
app.get("/weather", (req, res) => {
  if (!req.query.address) return res.send({ error: "Address required" });
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error: error });
      weather(
        latitude,
        longitude,
        location,
        (error, { description, feelsLike, temperature, updatedAt } = {}) => {
          if (error) return res.send({ error: error });
          res.send({
            success: true,
            location: location,
            forecast: `${description} : Its ${temperature} outside but it feels like ${feelsLike}. Last Update At ${updatedAt}. `,
          });
        }
      );
    }
  );
});

// for 404
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    msg: "Page NOT Found!!",
    name: "Harshit Goyal",
  });
});

app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});
