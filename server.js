const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 8080;

//Model
let Lieu = require("./models/lieux.model");
let Prediction = require("./models/prediction.model");

//Midllewares
app.use(cors());
app.use(express.json());

//Db
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Connected to the Database");
});

//Routes
app.get("/", async (req, res) => {
  try {
    const lieux = await Lieu.find().limit(100);
    res.json(lieux);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/predictions", async (req, res) => {
  try {
    const predictions = await Prediction.find();
    res.json(predictions);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const lieu = await Lieu.findById(req.params.id);
    res.json(lieu);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.delete("/predictions/:id", async (req, res) => {
  try {
    const prediction = await Prediction.findByIdAndDelete(req.params.id);
    res.json(prediction);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const lieu = await Lieu.findByIdAndDelete(req.params.id);
    res.json(lieu);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.put("/:id", async (req, res) => {
  try {
    await Lieu.findByIdAndUpdate(req.params.id, {
      picture_url: req.body.image,
      name: req.body.name,
      description: req.body.description,
      host_location: req.body.lieu,
      host_since: req.body.date,
    });
    res.json("Updated");
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/create", (req, res) => {
  const lieu = new Lieu({
    picture_url: req.body.image,
    name: req.body.name,
    description: req.body.description,
    host_location: req.body.lieu,
    host_since: req.body.date,
  });

  lieu
    .save()
    .then(() => res.json("Created"))
    .catch((err) => res.status(400).json(err));
});

app.post("/image", (req, res) => {
  console.log(req);

  const prediction = new Prediction({
    nom: req.body.predict.nom,
    analyse: req.body.predict.analyse,
    image: req.body.predict.image,
    date: req.body.predict.date,
    size: req.body.predict.size,
  });

  prediction
    .save()
    .then(() => res.json("Created"))
    .catch((err) => res.status(400).json(err));
});

app.listen(port, () => {
  console.log("Server app listening on port " + port);
});
