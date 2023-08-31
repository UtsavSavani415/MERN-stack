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

  result = result.toObject();
  delete result.password
  res.send(result);
});

app.post("/login", async (req, res) => {
  console.log(req.body, "log");
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user)
    }
    else {
      res.send({ result: 'No user found' })
    }
  }
  else {
    res.send({ result: 'Please enter both fields' })
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
