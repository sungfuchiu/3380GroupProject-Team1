const express = require("express");

const mealRoutes = require("./routes/meals");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
const PORT = 4000;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

const uri =
  "mongodb+srv://sungfuchiu:sungfuchiu@cluster0.6imwlls.mongodb.net/Seafood"
// /meal?retryWrites=true&w=majority";
// process.env.COSMOS_URI
mongoose.connect(
  uri
  , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(authRoutes);

app.use("/meals", mealRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.listen(PORT, () => {
  console.log("The backend app start at " + PORT);
});
