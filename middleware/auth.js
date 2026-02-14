import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    req.user = { id: 1 }; // dummy user
    return next();
  }

  try {
    req.user = { id: 1 }; // bypass JWT sementara
    next();
  } catch {
    req.user = { id: 1 };
    next();
  }
};

  } catch {
    res.status(401).json({ error: "Token invalid" });
  }
};
