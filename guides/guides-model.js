const db = require("../data/db.Config");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
  findStepsByGuideId,
  findReviewsByGuideId
};

function find() {
  return db("Guides");
}

function findBy(filter) {
  return db("Users").where(filter);
}

function add(guide) {
  //   console.log("IN MODEL:", guide);
  return db("Guides").insert(guide);
}

function findById(id) {
  console.log("ID:", id);
  return db("Guides")
    .where("Guides_Id", id)
    .first();
}

function update(Guides_Id, changes) {
  console.log("IN MODEL:", Guides_Id, changes);
  return db("Guides")
    .where({ Guides_Id })
    .update(changes)
    .then(update => {
      return findById(Guides_Id);
    });
}

function remove(id) {
  return db("Guides")
    .where("Guides_Id", id)
    .del()
    .then(track => {
      return findById(id);
    });
}

function findStepsByGuideId(id) {
  return db("Guides as g")
    .select("s.Step_Id", "g.title", "s.description", "s.Step_Id")
    .join("Steps as s", "s.Guide_Id", "g.Guides_Id")
    .where("g.Guides_Id", id);
}

function findReviewsByGuideId(id) {
  return db("Guides as g")
    .select("r.review_Id", "g.title as Guide_Title", "r.review_body")
    .join("Reviews as r", "r.Guide_Id", "g.Guides_Id")
    .where("g.Guides_Id", id);
}
