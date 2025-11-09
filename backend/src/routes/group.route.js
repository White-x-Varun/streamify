import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createGroup,
  getUserGroups,
  getGroupById,
  addMemberToGroup,
  removeMemberFromGroup,
  updateGroup,
  leaveGroup,
  deleteGroup,
} from "../controllers/group.controller.js";

const router = express.Router();

// All routes require authentication
router.use(protectRoute);

// Group CRUD operations
router.post("/", createGroup);
router.get("/", getUserGroups);
router.get("/:groupId", getGroupById);
router.put("/:groupId", updateGroup);
router.delete("/:groupId", deleteGroup);

// Member management
router.post("/:groupId/members", addMemberToGroup);
router.delete("/:groupId/members/:userId", removeMemberFromGroup);

// Leave group
router.post("/:groupId/leave", leaveGroup);

export default router;
