const jwt = require("jsonwebtoken");

// Verify Token Middleware
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  // console.log(token);
  if (!token) return res.status(403).send("Access denied");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Invalid token");
    req.user = decoded;
    next();
  });
}

// Role-Based Authorization Middleware
function authorizeRoles(...roles) {
  return (req, res, next) => {
    console.log(roles);
    if (!roles.includes(req.user.role)) {
      return res.status(403).send("Access denied");
    }
    next();
  };
}

module.exports = { verifyToken, authorizeRoles };
