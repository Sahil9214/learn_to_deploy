const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, "masai");
      console.log("decoded", decoded);
      if (decoded) { 
        req.body.authorID = decoded.authorID;
        req.body.author = decoded.author;

        next();
      } else {
        res.send({ msg: "Please Login" });
      }
    } catch (err) {
      res.send({ err: err.message });
    }
  } else {
    res.send({ msg: "Please Login First" });
  }
};
module.exports = { auth };
``;
