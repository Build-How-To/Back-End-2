exports.seed = function(knex) {
  return knex("Reviews").insert([
    {
      review_body: "ervsfrgbvdsfgbdfghbdfgbwfdgs vssdfvfs",
      Guide_Id: 2
    },
    {
      review_body: "ervsfrgbvdsfgbdfghbdfgbwfdgs vssdfvfs",
      Guide_Id: 2
    },
    {
      review_body: "ervsfrgbvdsfgbdfghbdfgbwfdgs vssdfvfs",
      Guide_Id: 1
    },
    {
      review_body: "ervsfrgbvdsfgbdfghbdfgbwfdgs vssdfvfs",
      Guide_Id: 3
    },
    {
      review_body: "ervsfrgbvdsfgbdfghbdfgbwfdgs vssdfvfs",
      Guide_Id: 4
    },
    {
      review_body: "ervsfrgbvdsfgbdfghbdfgbwfdgs vssdfvfs",
      Guide_Id: 1
    },
    {
      review_body: "ervsfrgbvdsfgbdfghbdfgbwfdgs vssdfvfs",
      Guide_Id: 4
    },
    {
      review_body: "ervsfrgbvdsfgbdfghbdfgbwfdgs vssdfvfs",
      Guide_Id: 3
    }
  ]);
};
