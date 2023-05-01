const express = require("express");
const app = express();
const connection = require("./db");
const {auth}=require("./middleware/auth.middleware")
const {noteRouter}=require("./routes/Notes.routes")
const cors=require("cors")
require("dotenv").config()
const userRouter = require("./routes/User.routes");
const jwt = require("jsonwebtoken");
app.use(cors())
app.use(express.json());
//!Login purpose
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.status(200).send("Home page");
});
app.get("/about", (req, res) => {
  res.status(200).send("About Page");
});
app.get("/contact", (req, res) => {
  res.status(200).send("Contact Page");
});

//Protected
app.use(auth);
app.get("/movies", (req, res) => {
  res.status(200).send("Movies Data");
});

app.get("/series", (req, res) => {
  res.status(200).send("Series Data");
});
app.use("/notes",noteRouter)
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Port 8080 is running");
  } catch (err) {
    console.log("cannot connect to the db");
  }
});
