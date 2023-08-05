import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decodedToken;
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "User authentication failed!", success: false });
  }
};
