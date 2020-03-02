exports.seed = function(knex) {
  return knex("Users").insert([
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
  ]);
};
