const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Import Model
const db = require("../users/users-model");

// Import JWT Info
const secrets = require("../config/secret");

// ENDPOINTS:
router.post("/register", validateRegisterBody, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  // console.log(user);

  db.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({ message: "Registration Failed", error });
    });
});

// User Login
router.post("/login", validateLogInBody, (req, res) => {
  let { Email, password } = req.body;
  console.log(Email, password);
  db.findBy({ Email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenGenerator(user);

        res.status(200).json({
          message: `Welcome ${user.First_Name} ${user.Last_Name}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => {
      console.log("IN FAILURE:", Email, password);
      res.status(500).json({ Message: "Womp, you suck", err });
    });
});

// MIDDLEWARE:
function tokenGenerator(user) {
  const payload = {
    Email: user.Email
    // Role: "Section Lead"
  };

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

function validateRegisterBody(req, res, next) {
  let body = req.body;

  if (!body.Email || body.Email.length === 0 || /^\s*$/.test(body.Email)) {
    res.status(400).json({ message: "Please, enter an Email" });
  } else if (
    !body.password ||
    body.password.length === 0 ||
    /^\s*$/.test(body.password)
  ) {
    res.status(400).json({ message: "Please, enter your password" });
  } else if (
    !body.username ||
    body.username.length === 0 ||
    /^\s*$/.test(body.username)
  ) {
    res.status(400).json({ message: "Please, enter a Username" });
  } else if (
    !body.First_Name ||
    body.First_Name.length === 0 ||
    /^\s*$/.test(body.First_Name)
  ) {
    res.status(400).json({ message: "Please, enter your First Name" });
  } else if (
    !body.Last_Name ||
    body.Last_Name.length === 0 ||
    /^\s*$/.test(body.Last_Name)
  ) {
    res.status(400).json({ message: "Please, enter your Last Name" });
  } else {
    next();
  }
}

function validateLogInBody(req, res, next) {
  let body = req.body;

  if (!body.Email || body.Email.length === 0 || /^\s*$/.test(body.Email)) {
    res.status(400).json({ message: "Please, enter an Email" });
  } else if (
    !body.password ||
    body.password.length === 0 ||
    /^\s*$/.test(body.password)
  ) {
    res.status(400).json({ message: "Please, enter your password" });
  } else {
    next();
  }
}

module.exports = router;
