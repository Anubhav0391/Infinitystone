var jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const decoded = await jwt.verify(token.split(' ')[1], process.env.key);

    if (decoded) {
      const userID = decoded.userID;
      req.userDetails = decoded;
      console.log(decoded);
      req.body.userID = userID;
      next();
    } else {
      res.send({ msg: "please login" });
    }
  } else {
    res.send({ msg: "please login" });
  }
};

module.exports = auth;