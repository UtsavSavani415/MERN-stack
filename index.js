const express = require("express");
require("./db/config");
const cors = require("cors");
const User = require("./db/Users");
const Product = require("./db/Product");
const app = express();

const Jwt = require("jsonwebtoken");
const jwtkey = "ecom";

app.use(express.json());
app.use(cors());
const port = 5000;

app.post("/register", async (req, res) => {
  const user = new User(req.body);

  let result = await user.save();

  result = result.toObject();
  delete result.password;

  Jwt.sign({ result }, jwtkey, { expiresIn: "5h" }, (err, token) => {
    if (err) {
      res.send({ result: "Something went wrong" });
    }
    res.send({ result, auth: token });
  });
});

app.post("/login", async (req, res) => {
  console.log(req.body, "log");
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtkey, { expiresIn: "5h" }, (err, token) => {
        if (err) {
          res.send({ result: "Something went wrong" });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "Please enter both fields" });
  }
});

app.post("/add-product", verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", verifyToken, async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No result found" });
  }
});

app.delete("/product/:id", verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });

  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No record found" });
  }
});

app.put("/product/:id", verifyToken, async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });

  res.send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];

  if (token) {
    token = token.split(" ")[1];
    console.log("verify token func called", token);
    Jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        res.status(401).send("Please provide valid token");
      } else {
        next();
      }
    });
  } else {
    res.status(403).send("Please add token with header");
  }
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
