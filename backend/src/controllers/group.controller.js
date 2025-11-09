import Group from "../models/Group.js";
import User from "../models/User.js";
import { generateStreamToken } from "../lib/Stream.js";

// Create a new group
export const createGroup = async (req, res) => {
  try {
    const { name, description, avatar } = req.body;
    const creator = req.user.id;

    // Generate unique channel ID
    const channelId = `group-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const group = new Group({
      name,
      description,
      avatar,
      creator,
      members: [{ user: creator, role: "admin" }],
      channelId,
    });

    await group.save();

    // Populate creator info
    await group.populate("creator", "fullName Profilepic");
    await group.populate("members.user", "fullName Profilepic");

    res.status(201).json(group);
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all groups for a user
export const getUserGroups = async (req, res) => {
  try {
    const userId = req.user.id;

    const groups = await Group.find({
      members: { $elemMatch: { user: userId } },
      isActive: true,
    })
      .populate("creator", "fullName Profilepic")
      .populate("members.user", "fullName Profilepic")
      .sort({ createdAt: -1 });

    res.status(200).json(groups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get group by ID
export const getGroupById = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.id;

    const group = await Group.findOne({
      _id: groupId,
      members: { $elemMatch: { user: userId } },
      isActive: true,
    })
      .populate("creator", "fullName Profilepic")
      .populate("members.user", "fullName Profilepic");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json(group);
  } catch (error) {
    console.error("Error fetching group:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add member to group
export const addMemberToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;
    const currentUserId = req.user.id;

    const group = await Group.findOne({
      _id: groupId,
      members: { $elemMatch: { user: currentUserId, role: "admin" } },
      isActive: true,
    });

    if (!group) {
      return res.status(404).json({ message: "Group not found or insufficient permissions" });
    }

    // Check if user is already a member
    const isMember = group.members.some(member => member.user.toString() === userId);
    if (isMember) {
      return res.status(400).json({ message: "User is already a member" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    group.members.push({ user: userId, role: "member" });
    await group.save();

    await group.populate("members.user", "fullName Profilepic");

    res.status(200).json(group);
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Remove member from group
export const removeMemberFromGroup = async (req, res) => {
  try {
    const { groupId, userId } = req.params;
    const currentUserId = req.user.id;

    const group = await Group.findOne({
      _id: groupId,
      members: { $elemMatch: { user: currentUserId, role: "admin" } },
      isActive: true,
    });

    if (!group) {
      return res.status(404).json({ message: "Group not found or insufficient permissions" });
    }

    // Cannot remove the creator/admin
    if (group.creator.toString() === userId) {
      return res.status(400).json({ message: "Cannot remove group creator" });
    }

    group.members = group.members.filter(member => member.user.toString() !== userId);
    await group.save();

    await group.populate("members.user", "fullName Profilepic");

    res.status(200).json(group);
  } catch (error) {
    console.error("Error removing member:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update group details
export const updateGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { name, description, avatar } = req.body;
    const currentUserId = req.user.id;

    const group = await Group.findOne({
      _id: groupId,
      members: { $elemMatch: { user: currentUserId, role: "admin" } },
      isActive: true,
    });

    if (!group) {
      return res.status(404).json({ message: "Group not found or insufficient permissions" });
    }

    if (name) group.name = name;
    if (description !== undefined) group.description = description;
    if (avatar !== undefined) group.avatar = avatar;

    await group.save();

    await group.populate("creator", "fullName Profilepic");
    await group.populate("members.user", "fullName Profilepic");

    res.status(200).json(group);
  } catch (error) {
    console.error("Error updating group:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Leave group
export const leaveGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.id;

    const group = await Group.findOne({
      _id: groupId,
      members: { $elemMatch: { user: userId } },
      isActive: true,
    });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Cannot leave if you're the only admin
    const adminCount = group.members.filter(member => member.role === "admin").length;
    const isAdmin = group.members.find(member => member.user.toString() === userId)?.role === "admin";

    if (isAdmin && adminCount === 1) {
      return res.status(400).json({ message: "Cannot leave group as the only admin" });
    }

    group.members = group.members.filter(member => member.user.toString() !== userId);
    await group.save();

    res.status(200).json({ message: "Successfully left the group" });
  } catch (error) {
    console.error("Error leaving group:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete group (only creator can delete)
export const deleteGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user.id;

    const group = await Group.findOne({
      _id: groupId,
      creator: userId,
      isActive: true,
    });

    if (!group) {
      return res.status(404).json({ message: "Group not found or insufficient permissions" });
    }

    group.isActive = false;
    await group.save();

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
