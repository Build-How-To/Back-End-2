exports.seed = function(knex) {
  return knex("Guides").insert([
    {
      title: "How To Make Riddim",
      description:
        "Learn how to produce the hardest Dubstep you've ever heard!",
      category: "music",
      difficulty: "Advanced"
    }
  ]);
};
