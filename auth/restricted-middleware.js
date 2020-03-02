const jwt = require("jsonwebtoken");
const secret = require("../config/secret");

module.exports = (req, res, next) => {
  const authorization = req.headers.token;

  if (authorization) {
    const sec = secret.jwtSecret;

    jwt.verify(authorization, sec, function(err, decodedToken) {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.token = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please login & try again" });
  }
};
