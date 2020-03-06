const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  const seedUser = [
    {
      username: "Rilla",
      password: "Livepure1!",
      Email: "rillatube@gmail.com",
      First_Name: "Samuel",
      Last_Name: "Torres"
    },
    {
      username: "Benzmixer",
      password: "Woah!",
      Email: "benzmixer@gmail.com",
      First_Name: "Benjamin",
      Last_Name: "Smalley"
    },
    {
      username: "grtbwgevrdsdfrt",
      password: "Woah!",
      Email: "dfsv@gmail.com",
      First_Name: "asdcds",
      Last_Name: "yjnryu"
    }
  ];

  let newseedUsers = seedUser.map(user => {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
  });

  return knex("Test_Users").insert(newseedUser);
};
