const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// ROUTE IMPORTS
const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
const guidesRouter = require("../guides/guides-router");
const stepsRouter = require("../steps/steps-router");
const reviewsRouter = require("../reviews/review-router");

// SERVER
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/guides", guidesRouter);
server.use("/api/steps", stepsRouter);
server.use("/api/reviews", reviewsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "running", dbenv: process.env.DB_ENV });
});

module.exports = server;
