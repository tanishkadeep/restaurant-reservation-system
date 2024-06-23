const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    if (!token) {
      return res.status(401).send({ message: "Authorization token not found." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decoded.userId };
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }
};

module.exports = authMiddleware;
