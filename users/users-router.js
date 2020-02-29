const router = require("express").Router();

const db = require("./users-model");
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

// MIDDLEWARE

module.exports = router;
