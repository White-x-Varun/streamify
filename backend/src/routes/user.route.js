import express from "express";
import {
  getRecommendedUsers,
  getMyfriends,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  getOutgoingFriendReqs,
  searchUsers,
  getUserProfile,
  updateUserProfile,
  updateUserStatus,
  getOnlineUsers,
} from "../controllers/user.controller.js";
const router = express.Router();
import { protectRoute } from "../middleware/auth.middleware.js";

//applied to all rotues

router.use(protectRoute);
router.get("/", getRecommendedUsers);
router.get("/friends", getMyfriends);
router.post("/friend-requests/:id", sendFriendRequest);
router.get("/friend-requests", getFriendRequests);
router.put("/friend-requests/:id/accept", acceptFriendRequest);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);
router.get("/search", searchUsers);
router.get("/profile/:id", getUserProfile);
router.put("/profile", updateUserProfile);
router.put("/status", updateUserStatus);
router.get("/online", getOnlineUsers);

export default router;
