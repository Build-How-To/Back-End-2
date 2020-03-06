const db = require("../data/db.Config");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
  findGuidesByUserId
};

function find() {
  return db("Users");
}

function findBy(filter) {
  return db("Users").where(filter);
}

function add(user) {
  return db("Users").insert(user);
}

function findById(id) {
  return db("Users")
    .where("User_Id", id)
    .first();
}

function update(User_Id, changes) {
  return db("Users")
    .where({ User_Id })
    .update(changes)
    .then(update => {
      return findById(User_Id);
    });
}

function remove(id) {
  return db("Users")
    .where("User_Id", id)
    .del()
    .then(track => {
      return findById(id);
    });
}

function findGuidesByUserId(id) {
  return db("Users as u")
    .select(
      "g.Guides_Id",
      "u.username",
      "g.description",
      "g.category",
      "g.difficulty"
    )
    .join("Guides as g", "g.Creators_User_Id", "u.User_Id")
    .where("g.Creators_User_Id", id);
}
