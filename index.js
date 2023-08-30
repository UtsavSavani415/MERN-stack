const express = require("express");
require("./db/config");
const cors = require("cors");
const User = require("./db/Users");
const app = express();

app.use(express.json());
app.use(cors());
const port = 5000;

app.post("/register", async (req, res) => {
  const user = new User(req.body);

  let result = await user.save();
  res.send(result);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
