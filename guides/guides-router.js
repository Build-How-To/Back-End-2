const router = require("express").Router();

const db = require("./guides-model");
const restricted = require("../auth/restricted-middleware");

// ENDPOINTS: /api/guides

// CREATE:
router.post("/", restricted, validateBody, (req, res) => {
  let body = req.body;

  db.add(body)
    .then(guide => {
      res.status(200).json({ guide });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Sorry error occured while trying to post your guide.",
        err
      });
    });
});

// READ:
router.get("/", restricted, (req, res) => {
  db.find()
    .then(guides => {
      res.status(200).json({ guides });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "An Error occured while processing your request",
        err
      });
    });
});

// UPDATE:
router.put("/:id", restricted, validateBody, (req, res) => {
  let body = req.body;
  let id = req.params.id;
  console.log("IN END:", id, body);
  db.update(id, body)
    .then(post => {
      res.status(200).json({ post });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage:
          "Sorry error occured while attempting to update your guide."
      });
    });
});

// DELETE:
router.delete("/:id", restricted, validateId, (req, res) => {
  let id = req.params.id;

  db.remove(id)
    .then(guide => {
      res.status(200).json({ guide });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage:
          "Sorry, an error occured while trying to find your guide. Please, try again later.",
        err
      });
    });
});

// Find steps by Guide Id:
router.get("/:id/steps", restricted, validateId, (req, res) => {
  let id = req.params.id;
  // console.log(id);
  db.findStepsByGuideId(id)
    .then(steps => {
      res.status(200).json({ steps });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: `An error occured when trying to find steps for the guide with an id of ${id}`,
        err
      });
    });
});

// Find reviews by Guide Id
router.get("/:id/reviews", restricted, validateId, (req, res) => {
  let id = req.params.id;

  db.findReviewsByGuideId(id)
    .then(review => {
      res.status(200).json({ review });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: `An error occured when trying to find steps for the guide with an id of ${id}`,
        err
      });
    });
});

// MIDDLEWARE:

function validateBody(req, res, next) {
  let body = req.body;

  if (!body.title || body.title.length === 0 || /^\s*$/.test(body.title)) {
    res.status(400).json({ message: "Please, enter a title" });
  } else if (
    !body.description ||
    body.description.length === 0 ||
    /^\s*$/.test(body.description)
  ) {
    res.status(400).json({ message: "Please, enter a description" });
  } else if (
    !body.category ||
    body.category.length === 0 ||
    /^\s*$/.test(body.category)
  ) {
    res
      .status(400)
      .json({ message: "Please, place this post under a category" });
  } else if (
    !body.difficulty ||
    body.difficulty.length === 0 ||
    /^\s*$/.test(body.difficulty)
  ) {
    res.status(400).json({ message: "Please, enter a difficulty level" });
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
          errorMessage: `A guide with an ID of ${id} does not exist!`
        });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Error occured" });
    });
}

module.exports = router;
