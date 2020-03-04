const db = require("../data/db.Config");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
  //   findReviewByUserId
};

function find() {
  return db("Reviews");
}

function findBy(filter) {
  return db("Reviews").where(filter);
}

function add(review) {
  //   console.log("IN MODEL:", guide);
  return db("Reviews").insert(review);
}

function findById(id) {
  return db("Reviews")
    .where("review_Id", id)
    .first();
}

function update(review_Id, changes) {
  return db("Reviews")
    .where({ review_Id })
    .update(changes)
    .then(update => {
      return findById(review_Id);
    });
}

function remove(id) {
  return db("Reviews")
    .where("review_Id", id)
    .del()
    .then(track => {
      return findById(id);
    });
}

// function findReviewerName(id) {
//   return db("Reviews as r")
//     .select("r.review_body", "u.username", "u.First_Name", "u.Last_Name")
//     .join("User as u", "r.User_Id", "u.User_Id")
//     .where("r.User_Id", id);
// }
