const { StatusCodes, UNAUTHORIZED, FORBIDDEN } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const rbac = require("../../rbac/rbac");

module.exports = (endPoints) => {
  return async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: "Please SignIn To Access Data" });
      }
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "shhhhh");
      const isAllowed = await rbac.can(decoded.role, endPoints);
      req.user=decoded;
      if (!isAllowed) {
        return next(
          res
            .status(StatusCodes.FORBIDDEN)
            .json({ message: "Requested URL Is Forbidden" })
        );
      }
      next();
    } catch (error) {
      res.status(StatusCodes.FORBIDDEN).json({ message: "Failed",error })
        
    }
  };
};
