import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config";
export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = req.cookies?.jwt || authHeader?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthoriazzed -NO token provided" });
    }



    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(402).json({ message: "Unauthriazed-Invalid token" });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(403).json({ message: "Unauthriazed-User not  found" });
    }

    req.user = user;
    next();
  } catch (error) {
    // Error in protect Middleware
    return res.status(400).json({ message: "Internal Error" });
  }
};
