const router = require("express").Router();

const db = require("./review-model");
const user = require("../users/users-model");
const restricted = require("../auth/restricted-middleware");

// ENDPOINTS: /api/guides

// CREATE
router.post("/", restricted, validateBody, (req, res) => {
  let body = req.body;

  db.add(body)
    .then(review => {
      res.status(201).json({ review });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage:
          "Sorry, an error occured when trying to post your review. Please, try again later.",
        err
      });
    });
});

// READ
router.get("/", restricted, (req, res) => {
  db.find()
    .then(review => {
      res.status(200).json({ review });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Error occured while searching for review",
        err
      });
    });
});

// UPDATE
router.put("/:id", restricted, validateBody, (req, res) => {
  let id = req.params.id;
  let body = req.body;

  db.update(id, body)
    .then(changes => {
      res.status(200).json({ changes });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage:
          "Sorry, an error occured while trying to make an update to your review",
        err
      });
    });
});

// DELETE
router.delete("/:id", restricted, validateId, (req, res) => {
  let id = req.params.id;
  db.remove(id)
    .then(review => {
      res.status(200).json({ review });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage:
          "Sorry, an error occured while trying to delete your review.",
        err
      });
    });
});

// router.get("/info/:id", validateId, (req, res) => {
//   let id = req.params.id;

//   db.getReviewInfo(id)
//     .then(review => {
//       res.status(200).json({ review });
//     })
//     .catch(err => {
//       res.status(500).json({
//         errorMessage:
//           "Sorry, an error occurred while trying to build this table",
//         err
//       });
//     });
// });

// MIDDLEWARE:

function validateBody(req, res, next) {
  let body = req.body;

  if (
    !body.review_body ||
    body.review_body.length === 0 ||
    /^\s*$/.test(body.review_body)
  ) {
    res.status(400).json({ message: "Please, leave a detailed review" });
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
          errorMessage: `A review with an ID of ${id} does not exist!`
        });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Error occured" });
    });
}

function validateUserId(req, res, next) {
  let id = req.params.id;

  user
    .findById(id)
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
