const knex = require("knex");
const config = require("../knexfile");

const enviroment = process.env.DB_ENV || "development";
console.log(enviroment);
module.exports = knex(config[enviroment]);
