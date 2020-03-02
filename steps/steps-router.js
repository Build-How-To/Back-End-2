const router = require("express").Router();

const db = require("./steps-model");
const restricted = require("../auth/restricted-middleware");

// ENDPOINTS: /api/steps

// CREATE:
router.post("/", restricted, validateBody, (req, res) => {
  const body = req.body;

  db.add(body)
    .then(step => {
      res.status(201).json({ step });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage:
          "Sorry an error occured while trying to create your new steps",
        err
      });
    });
});

// READ:
router.get("/", restricted, (req, res) => {
  db.find()
    .then(steps => {
      res.status(200).json({ steps });
    })
    .catch(err => {
      res.status(404).json({
        errorMessage: "Sorry, an error occured while trying to find all steps.",
        err
      });
    });
});

// UPDATE:
router.put("/:id", restricted, validateId, validateBody, (req, res) => {
  let body = req.body;
  let id = req.params.id;

  db.update(id, body)
    .then(changes => {
      res.status(200).json({ changes });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Sorry an error occured when trying to update your step",
        err
      });
    });
});

// DELETE:
router.delete("/:id", restricted, validateId, (req, res) => {
  let id = req.params.id;

  db.remove(id)
    .then(steps => {
      res.status(200).json({ steps });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: `Sorry, an error occured while trying to delete the step with an id of ${id}`,
        err
      });
    });
});

// FIND STEPS BY GUIDE ID:

// MIDDLEWARE:

function validateBody(req, res, next) {
  let body = req.body;

  if (
    !body.description ||
    body.description.length === 0 ||
    /^\s*$/.test(body.description)
  ) {
    res.status(400).json({ message: "Please, enter a description" });
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
          errorMessage: `A step with an ID of ${id} does not exist!`
        });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Error occured" });
    });
}

module.exports = router;
