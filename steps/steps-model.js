const db = require("../data/db.Config");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};

function find() {
  return db("Steps");
}

function findBy(filter) {
  return db("Users").where(filter);
}

function add(step) {
  //   console.log("IN MODEL:", guide);
  return db("Steps").insert(step);
}

function findById(id) {
  return db("Steps")
    .where("Step_Id", id)
    .first();
}

function update(Step_Id, changes) {
  return db("Steps")
    .where({ Step_Id })
    .update(changes)
    .then(update => {
      return findById(Step_Id);
    });
}

function remove(id) {
  return db("Steps")
    .where("Step_Id", id)
    .del()
    .then(track => {
      return findById(id);
    });
}
