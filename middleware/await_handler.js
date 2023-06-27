const jwt = require("jsonwebtoken");

const awaitHandler = (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.slice("Bearer ".length);
      if (!token) {
        throw new Error("Unauthorized user!");
      } else {
        const userInfo = jwt.verify(token, process.env.SECRET_JWT);
        req.user = userInfo;
        next();
      }
    }
    throw new Error("Unauthorized user!");
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

module.exports = awaitHandler;
