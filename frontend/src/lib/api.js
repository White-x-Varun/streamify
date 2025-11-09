import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};
export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me", {
      headers: { "Cache-Control": "no-cache" },
    });
    return res.data;
  } catch {

    return null;
  }
};

export const completeOnboarding = async (formState) => {
  const res = await axiosInstance.post("/auth/onboarding", formState);
  return res.data;
};

export const getUserFriends = async () => {
  const res = await axiosInstance.get("/users/friends", {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  return Array.isArray(res.data) ? res.data : [];
};
export const getRecommendedUsers = async () => {
  const res = await axiosInstance.get("/users");
  return Array.isArray(res.data) ? res.data : [];
};

export const getOutgoingFriendReqs = async () => {
  const res = await axiosInstance.get("/users/outgoing-friend-requests");
  return Array.isArray(res.data) ? res.data : [];
};

export const sendFriendRequest = async (userId) => {
  const res = await axiosInstance.post(`/users/friend-requests/${userId}`);
  return res.data;
};

export const getFriendRequests = async () => {
  const res = await axiosInstance.get("/users/friend-requests");
  return res.data;
};

export const acceptFriendRequest = async (requestId) => {
  const res = await axiosInstance.put(
    `/users/friend-requests/${requestId}/accept`
  );
  return res.data;
};
export const getStreamToken = async () => {
  const res = await axiosInstance.get("/chat/token");
  return res.data;
};

export const searchUsers = async (query) => {
  const res = await axiosInstance.get(`/users/search?query=${encodeURIComponent(query)}`);
  return res.data;
};

export const getUserProfile = async (userId) => {
  const res = await axiosInstance.get(`/users/profile/${userId}`);
  return res.data;
};

export const updateUserProfile = async (profileData) => {
  const res = await axiosInstance.put("/users/profile", profileData);
  return res.data;
};

export const updateUserStatus = async (statusData) => {
  const res = await axiosInstance.put("/users/status", statusData);
  return res.data;
};

export const getOnlineUsers = async () => {
  const res = await axiosInstance.get("/users/online");
  return res.data;
};

export const blockUser = async (userId) => {
  const res = await axiosInstance.post(`/users/block/${userId}`);
  return res.data;
};

// Group API functions
export const createGroup = async (groupData) => {
  const res = await axiosInstance.post("/groups", groupData);
  return res.data;
};

export const getUserGroups = async () => {
  const res = await axiosInstance.get("/groups");
  return res.data;
};

export const getGroupById = async (groupId) => {
  const res = await axiosInstance.get(`/groups/${groupId}`);
  return res.data;
};

export const updateGroup = async (groupId, groupData) => {
  const res = await axiosInstance.put(`/groups/${groupId}`, groupData);
  return res.data;
};

export const deleteGroup = async (groupId) => {
  const res = await axiosInstance.delete(`/groups/${groupId}`);
  return res.data;
};

export const addMemberToGroup = async (groupId, userId) => {
  const res = await axiosInstance.post(`/groups/${groupId}/members`, { userId });
  return res.data;
};

export const removeMemberFromGroup = async (groupId, userId) => {
  const res = await axiosInstance.delete(`/groups/${groupId}/members/${userId}`);
  return res.data;
};

export const leaveGroup = async (groupId) => {
  const res = await axiosInstance.post(`/groups/${groupId}/leave`);
  return res.data;
};
