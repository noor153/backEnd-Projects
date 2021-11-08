const jwt = require("jsonwebtoken");

module.exports = () => {
  return (req, res, next) => {
    const Header = req.headers.authorization;
    const token = Header.split(" ")[1];
    try {
      const decoded = jwt.verify(token, "hhhhh");
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ msg: "No token Provided" });
    }
  };
};
