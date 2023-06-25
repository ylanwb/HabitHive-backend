const parser = require("body-parser");
const port = 4000;
const express = require("express");
const users = require("./router/users");
const habits = require("./router/habits")
const register = require("./router/register");
const login = require("./router/login");
const cors = require("cors");
const connect = require("./db/db");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

connect();
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(register);
app.use(login);
app.use("/users", users);
app.use("/habits", habits);

app.listen(port, () => console.log`Server is running at localhost:${port}s`);
