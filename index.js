const express = require("express");
require("./db/config");
const User = require("./db/Users");
const app = express();

app.use(express.json())
const port = 5000;

const connectDB = async () => {
  const data = await User.find();

  console.log(data);
};

connectDB();


app.post("/register", (req, res) => {
  res.send(req.body);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
