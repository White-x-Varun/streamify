import express from "express";
import User from "../models/User.js";
import FriendRequest from "../models/Friends.js";
export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const currentUser = await User.findById(currentUserId).select("friends");
    const recommendedUser = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { _id: { $nin: currentUser.friends } },
        { isOnboarded: true },
      ],
    });
    res.status(200).json(recommendedUser);
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getMyfriends = async (req, res) => {
  try {


    const user = await User.findById(req.user._id)
      .select("friends")
      .populate(
        "friends",
        "fullName Profilepic nativeLanguage learningLanguage"
      );

    res.status(200).json(user.friends);
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const myId = req.user._id;
    const recipientId = req.params.id;


    if (myId == recipientId) {
      return res
        .status(400)
        .json({ message: "You can't send friends request to yourself" });
    }
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(400).json({ message: "Recipient not found" });
    }
    if (recipient.friends.some((fid) => fid.toString() === myId.toString())) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "You are Already Sended request to   this User" });
    }
    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });
    res.status(200).json(friendRequest);
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to accept this request" });
    }
    friendRequest.status = "accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });
    res.status(200).json({ message: "Friend request is accepted" });
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate(
      "sender",
      "fullName Profilepic nativeLanguage learningLanguage"
    );
    const acceptedReqs = await FriendRequest.find({
      sender: req.user._id,
      status: "accepted",
    }).populate("recipient", "fullName Profilepic");
    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOutgoingFriendReqs = async (req, res) => {
  try {
    const outgoingReqs = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName Profilepic nativeLanguage learningLanguage"
    );
    res.status(200).json(outgoingReqs);
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const currentUserId = req.user._id;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({ message: "Search query must be at least 2 characters" });
    }

    const searchRegex = new RegExp(query.trim(), "i");

    const users = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { isOnboarded: true },
        {
          $or: [
            { fullName: searchRegex },
            { nativeLanguage: searchRegex },
            { learningLanguage: searchRegex },
            { location: searchRegex },
          ],
        },
      ],
    }).select("fullName Profilepic nativeLanguage learningLanguage location bio");

    res.status(200).json(users);
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select(
      "fullName Profilepic bio nativeLanguage learningLanguage location friends isOnboarded"
    );

    if (!user || !user.isOnboarded) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFriend = user.friends.some((friendId) => friendId.toString() === req.user._id.toString());

    res.status(200).json({ ...user.toObject(), isFriend });
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, bio, nativeLanguage, learningLanguage, location, Profilepic } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        bio,
        nativeLanguage,
        learningLanguage,
        location,
        Profilepic,
      },
      { new: true }
    ).select("fullName Profilepic bio nativeLanguage learningLanguage location isOnline lastSeen");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { isOnline } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isOnline,
        lastSeen: isOnline ? new Date() : new Date(),
      },
      { new: true }
    ).select("isOnline lastSeen");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getOnlineUsers = async (req, res) => {
  try {
    const onlineUsers = await User.find({
      isOnline: true,
      isOnboarded: true,
      isBanned: false,
    }).select("fullName Profilepic nativeLanguage learningLanguage lastSeen");

    res.status(200).json(onlineUsers);
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error" });
  }
};
