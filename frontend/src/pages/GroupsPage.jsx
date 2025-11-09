import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  addMemberToGroup,
  leaveGroup,
  getUserFriends,
} from "../lib/api";
import { Link } from "react-router-dom";
import {
  UsersIcon,
  PlusIcon,
  SettingsIcon,
  TrashIcon,
  UserPlusIcon,
  UserMinusIcon,
  LogOutIcon,
} from "lucide-react";
import toast from "react-hot-toast";

const GroupsPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [editingGroup, setEditingGroup] = useState(null);
  const [showAddMember, setShowAddMember] = useState(null);

  const queryClient = useQueryClient();

  const { data: groups, isLoading: loadingGroups } = useQuery({
    queryKey: ["groups"],
    queryFn: getUserGroups,
  });

  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const createGroupMutation = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      setShowCreateForm(false);
      setGroupName("");
      setGroupDescription("");
      toast.success("Group created successfully");
    },
    onError: () => {
      toast.error("Failed to create group");
    },
  });

  const updateGroupMutation = useMutation({
    mutationFn: ({ groupId, groupData }) => updateGroup(groupId, groupData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      setEditingGroup(null);
      toast.success("Group updated successfully");
    },
    onError: () => {
      toast.error("Failed to update group");
    },
  });

  const deleteGroupMutation = useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success("Group deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete group");
    },
  });

  const addMemberMutation = useMutation({
    mutationFn: ({ groupId, userId }) => addMemberToGroup(groupId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      setShowAddMember(null);
      toast.success("Member added successfully");
    },
    onError: () => {
      toast.error("Failed to add member");
    },
  });

  // const removeMemberMutation = useMutation({
  //   mutationFn: ({ groupId, userId }) => removeMemberFromGroup(groupId, userId),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["groups"] });
  //     toast.success("Member removed successfully");
  //   },
  //   onError: () => {
  //     toast.error("Failed to remove member");
  //   },
  // });

  const leaveGroupMutation = useMutation({
    mutationFn: leaveGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success("Left group successfully");
    },
    onError: () => {
      toast.error("Failed to leave group");
    },
  });

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!groupName.trim()) return;
    createGroupMutation.mutate({
      name: groupName.trim(),
      description: groupDescription.trim(),
    });
  };

  const handleUpdateGroup = (e, groupId) => {
    e.preventDefault();
    if (!groupName.trim()) return;
    updateGroupMutation.mutate({
      groupId,
      groupData: {
        name: groupName.trim(),
        description: groupDescription.trim(),
      },
    });
  };

  const handleAddMember = (groupId, userId) => {
    addMemberMutation.mutate({ groupId, userId });
  };

  // const handleRemoveMember = (groupId, userId) => {
  //   removeMemberMutation.mutate({ groupId, userId });
  // };

  const handleLeaveGroup = (groupId) => {
    if (window.confirm("Are you sure you want to leave this group?")) {
      leaveGroupMutation.mutate(groupId);
    }
  };

  const handleDeleteGroup = (groupId) => {
    if (window.confirm("Are you sure you want to delete this group? This action cannot be undone.")) {
      deleteGroupMutation.mutate(groupId);
    }
  };

  const startEditing = (group) => {
    setEditingGroup(group);
    setGroupName(group.name);
    setGroupDescription(group.description);
  };

  const cancelEditing = () => {
    setEditingGroup(null);
    setGroupName("");
    setGroupDescription("");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            My Groups
          </h2>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowCreateForm(true)}
          >
            <PlusIcon className="mr-2 size-4" />
            Create Group
          </button>
        </div>

        {/* Create Group Form */}
        {showCreateForm && (
          <div className="card bg-base-200 p-6">
            <h3 className="font-semibold text-lg mb-4">Create New Group</h3>
            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Group Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter group name"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Description (Optional)</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                  placeholder="Enter group description"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={createGroupMutation.isPending}
                >
                  {createGroupMutation.isPending ? "Creating..." : "Create Group"}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    setShowCreateForm(false);
                    setGroupName("");
                    setGroupDescription("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Groups List */}
        {loadingGroups ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : groups && groups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div key={group._id} className="card bg-base-200 hover:shadow-lg transition-all duration-300">
                <div className="card-body">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                          <UsersIcon className="size-6 text-primary-content" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{group.name}</h3>
                        <p className="text-sm opacity-70">
                          {group.members.length} member{group.members.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <div className="dropdown dropdown-end">
                      <button className="btn btn-ghost btn-sm">
                        <SettingsIcon className="size-4" />
                      </button>
                      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                          <button onClick={() => startEditing(group)}>Edit Group</button>
                        </li>
                        <li>
                          <button onClick={() => setShowAddMember(group._id)}>Add Member</button>
                        </li>
                        {group.creator._id === JSON.parse(localStorage.getItem("authUser"))?._id && (
                          <li>
                            <button
                              onClick={() => handleDeleteGroup(group._id)}
                              className="text-error"
                            >
                              Delete Group
                            </button>
                          </li>
                        )}
                        {group.creator._id !== JSON.parse(localStorage.getItem("authUser"))?._id && (
                          <li>
                            <button
                              onClick={() => handleLeaveGroup(group._id)}
                              className="text-warning"
                            >
                              Leave Group
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {group.description && (
                    <p className="text-sm opacity-70 mt-2">{group.description}</p>
                  )}

                  <div className="flex flex-wrap gap-1 mt-3">
                    {group.members.slice(0, 5).map((member) => (
                      <div key={member.user._id} className="avatar">
                        <div className="w-8 h-8 rounded-full">
                          <img
                            src={member.user.Profilepic || "/default-profile.png"}
                            alt={member.user.fullName}
                            title={member.user.fullName}
                          />
                        </div>
                      </div>
                    ))}
                    {group.members.length > 5 && (
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-8 h-8">
                          <span className="text-xs">+{group.members.length - 5}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/chat/group/${group._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Open Chat
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card bg-base-200 p-6 text-center">
            <UsersIcon className="size-12 mx-auto mb-4 opacity-50" />
            <h3 className="font-semibold text-lg mb-2">No groups yet</h3>
            <p className="text-base-content opacity-70 mb-4">
              Create your first group to start chatting with multiple people!
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setShowCreateForm(true)}
            >
              <PlusIcon className="mr-2 size-4" />
              Create Group
            </button>
          </div>
        )}

        {/* Edit Group Modal */}
        {editingGroup && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Edit Group</h3>
              <form onSubmit={(e) => handleUpdateGroup(e, editingGroup._id)} className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text">Group Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="modal-action">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={updateGroupMutation.isPending}
                  >
                    {updateGroupMutation.isPending ? "Updating..." : "Update"}
                  </button>
                  <button type="button" className="btn" onClick={cancelEditing}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Member Modal */}
        {showAddMember && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Add Member</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {friends && friends.length > 0 ? (
                  friends.map((friend) => {
                    const group = groups.find(g => g._id === showAddMember);
                    const isAlreadyMember = group?.members.some(m => m.user._id === friend._id);
                    return (
                      <div key={friend._id} className="flex items-center justify-between p-2 rounded">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-8 h-8 rounded-full">
                              <img src={friend.Profilepic || "/default-profile.png"} alt={friend.fullName} />
                            </div>
                          </div>
                          <span>{friend.fullName}</span>
                        </div>
                        {!isAlreadyMember && (
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleAddMember(showAddMember, friend._id)}
                            disabled={addMemberMutation.isPending}
                          >
                            <UserPlusIcon className="size-4" />
                          </button>
                        )}
                        {isAlreadyMember && (
                          <span className="text-sm opacity-50">Already member</span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center py-4">No friends available to add</p>
                )}
              </div>
              <div className="modal-action">
                <button className="btn" onClick={() => setShowAddMember(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupsPage;
