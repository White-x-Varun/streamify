import express from "express";
const Router = express.Router();
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  signup,
  login,
  logout,
  onboard,
} from "../controllers/auth.controller.js";
Router.post("/signup", signup);
Router.post("/login", login);
Router.post("/logout", logout);
Router.get("/logout", logout);
Router.post("/onboarding", protectRoute, onboard);
// Checks This logged or not (Authenticated or not)
Router.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });

});

export default Router;
