const router = require("express").Router();

const db = require("./users-model");
const bcrypt = require("bcryptjs");
const restricted = require("../auth/restricted-middleware");

// ENDPOINTS: /api/users

// Get ALL users
router.get("/", restricted, (req, res) => {
  db.find()
    .then(users => {
      res.json({ users });
    })
    .catch(err => res.send(err));
});

// Update User Information
router.put("/update/:id", restricted, validateBody, (req, res) => {
  let body = req.body;
  let password = req.body.password;
  let id = req.params.id;

  const hash = bcrypt.hashSync(password, 10);
  body.password = hash;

  db.update(id, body)
    .then(changes => {
      res.status(200).json({ changes });
    })
    .catch(err => {
      res.status(400).json({
        errorMessage:
          "Sorry, error occured while trying to post these changes. Please, try again later.",
        err
      });
    });
});

// Delete Account
router.delete("/delete/:id", validateId, (req, res) => {
  let id = req.params.id;

  db.remove(id)
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Sorry there was an issue processing your request",
        err
      });
    });
});

// Get Guides by User Id:
router.get("/:id/guides", restricted, validateId, (req, res) => {
  let id = req.params.id;
  console.log("END POINT:", id);
  db.findGuidesByUserId(id)
    .then(guide => {
      res.status(200).json({ guide });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: `Sorry, an error occured while trying to find users with the id of ${id} guides`
          .err
      });
    });
});

// MIDDLEWARE

function validateBody(req, res, next) {
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

function validateId(req, res, next) {
  let id = req.params.id;

  db.findById(id)
    .then(item => {
      if (item) {
        next();
      } else {
        res.status(400).json({
          errorMessage: `A user with an ID of ${id} does not exist!`
        });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Error occured" });
    });
}

module.exports = router;
