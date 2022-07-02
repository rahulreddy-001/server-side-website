const express = require("express");
const Datastore = require("nedb");
const app = express();
app.use(express.static("Public"));
app.use(express.json({ limit: "100mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (req, res) => {
  database.find({}, (err, data) => {
    if (err) res.send(err);
    res.json(data);
  });
});

app.post("/api", (req, res) => {
  let data = req.body;
  data.timestamp = new Date();
  database.insert(data);
  res.json({
    status: "success",
  });
});

app.listen(3500, () => console.log("Listening at port:3500"));
