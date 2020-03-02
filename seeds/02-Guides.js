exports.seed = function(knex) {
  return knex("Guides").insert([
    {
      title: "How To Make Riddim",
      description:
        "Learn how to produce the hardest Dubstep you've ever heard!",
      category: "music",
      difficulty: "Advanced",
      Creators_User_Id: 1
    },
    {
      title: "dsdfdfsvv",
      description: "dafvsvsvfds",
      category: "music",
      difficulty: "Advanced",
      Creators_User_Id: 3
    },
    {
      title: "dscaaasd",
      description: "sdacdsdsac!",
      category: "music",
      difficulty: "Advanced",
      Creators_User_Id: 2
    },
    {
      title: "How To Masdacacadfske Riddim",
      description:
        "casasdcasdcasdcasdcadcsdcasdcasdcLeadscsadcrn casdcasdhow to padscdasdacasdcasdcasdroduce the hardest Dubstepdsacadcdsac you've ever heard!",
      category: "music",
      difficulty: "Advanced",
      Creators_User_Id: 2
    }
  ]);
};
