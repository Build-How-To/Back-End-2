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
  return db("Users");
}

function findBy(filter) {
  return db("Users").where(filter);
}

function add(user) {
  console.log("IN MODEL:", user);
  return db("Users").insert(user);
}

function findById(id) {
  return db("Users")
    .select("id", "username")
    .where({ id })
    .first();
}

function update(Track_Id, changes) {
  return db("Track")
    .where({ Track_Id })
    .update(changes)
    .then(update => {
      //   console.log("YEEEEEE:", update);
      return findById(Track_Id);
    });
}

function remove(id) {
  return db("Track")
    .where("Track_Id", id)
    .del()
    .then(track => {
      return findById(id);
    });
}
