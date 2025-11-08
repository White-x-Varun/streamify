import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Users,
  MessageSquare,
  Shield,
  BarChart3,
  UserCheck,
  UserX,
  Trash2,
  Eye,
  Settings,
  ArrowLeftIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// Mock API functions - replace with actual API calls
const getAllUsers = async () => {
  // This would be an actual API call
  return [];
};

const getAnalytics = async () => {
  return {
    totalUsers: 1250,
    activeUsers: 340,
    totalMessages: 15420,
    reportedContent: 12,
  };
};

const banUser = async (userId) => {
  // API call to ban user
  return { success: true };
};

const unbanUser = async (userId) => {
  // API call to unban user
  return { success: true };
};

const deleteUser = async (userId) => {
  // API call to delete user
  return { success: true };
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const queryClient = useQueryClient();

  const { data: users = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  const { data: analytics } = useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalytics,
  });

  const banMutation = useMutation({
    mutationFn: banUser,
    onSuccess: () => {
      toast.success("User banned successfully");
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });

  const unbanMutation = useMutation({
    mutationFn: unbanUser,
    onSuccess: () => {
      toast.success("User unbanned successfully");
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
  });

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "users", label: "User Management", icon: Users },
    { id: "content", label: "Content Moderation", icon: Shield },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm opacity-70">Total Users</p>
                <p className="text-2xl font-bold">{analytics?.totalUsers || 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4">
            <div className="flex items-center gap-3">
              <UserCheck className="w-8 h-8 text-success" />
              <div>
                <p className="text-sm opacity-70">Active Users</p>
                <p className="text-2xl font-bold">{analytics?.activeUsers || 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-info" />
              <div>
                <p className="text-sm opacity-70">Total Messages</p>
                <p className="text-2xl font-bold">{analytics?.totalMessages || 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-warning" />
              <div>
                <p className="text-sm opacity-70">Reported Content</p>
                <p className="text-2xl font-bold">{analytics?.reportedContent || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">New user registered: John Doe</p>
                <p className="text-xs opacity-70">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Content reported in chat room #general</p>
                <p className="text-xs opacity-70">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
              <div className="w-2 h-2 bg-info rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">User banned: spammer123</p>
                <p className="text-xs opacity-70">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">User Management</h2>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h3 className="card-title">All Users</h3>
            <input
              type="text"
              placeholder="Search users..."
              className="input input-bordered input-sm"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Last Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-8 rounded-full">
                            <img src={user.Profilepic} alt={user.fullName} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.fullName}</div>
                          <div className="text-sm opacity-70">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="badge badge-success">Active</div>
                    </td>
                    <td>{user.role || "user"}</td>
                    <td>2 hours ago</td>
                    <td>
                      <div className="dropdown dropdown-left">
                        <label tabIndex={0} className="btn btn-ghost btn-xs">
                          <Settings className="w-4 h-4" />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <a>
                              <Eye className="w-4 h-4" />
                              View Profile
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => banMutation.mutate(user._id)}
                              className="text-warning"
                            >
                              <UserX className="w-4 h-4" />
                              Ban User
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => deleteMutation.mutate(user._id)}
                              className="text-error"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete User
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContentModeration = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Content Moderation</h2>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title">Reported Content</h3>
          <div className="space-y-4">
            <div className="alert alert-warning">
              <Shield className="w-6 h-6" />
              <div>
                <h4 className="font-bold">Inappropriate message in #general</h4>
                <p className="text-sm">Reported by: user123 • 30 minutes ago</p>
                <div className="flex gap-2 mt-2">
                  <button className="btn btn-sm btn-error">Remove</button>
                  <button className="btn btn-sm btn-warning">Warn User</button>
                  <button className="btn btn-sm btn-ghost">Dismiss</button>
                </div>
              </div>
            </div>

            <div className="alert alert-warning">
              <Shield className="w-6 h-6" />
              <div>
                <h4 className="font-bold">Spam content detected</h4>
                <p className="text-sm">Reported by: moderator1 • 2 hours ago</p>
                <div className="flex gap-2 mt-2">
                  <button className="btn btn-sm btn-error">Remove</button>
                  <button className="btn btn-sm btn-warning">Warn User</button>
                  <button className="btn btn-sm btn-ghost">Dismiss</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Message Management</h2>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title">Global Message Statistics</h3>
          <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-title">Total Messages</div>
              <div className="stat-value">15,420</div>
              <div className="stat-desc">↗︎ 12% from last month</div>
            </div>
            <div className="stat">
              <div className="stat-title">Active Conversations</div>
              <div className="stat-value">1,247</div>
              <div className="stat-desc">↗︎ 8% from last month</div>
            </div>
            <div className="stat">
              <div className="stat-title">Messages Today</div>
              <div className="stat-value">342</div>
              <div className="stat-desc">↗︎ 15% from yesterday</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Settings</h2>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title">System Configuration</h3>
          <div className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Max Users per Chat Room</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                defaultValue="50"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Message Retention (days)</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                defaultValue="30"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Auto-ban Threshold</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                defaultValue="5"
              />
            </div>

            <button className="btn btn-primary">Save Settings</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto p-4">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="btn btn-ghost btn-sm">
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-content"
                          : "hover:bg-base-200"
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "users" && renderUserManagement()}
            {activeTab === "content" && renderContentModeration()}
            {activeTab === "messages" && renderMessages()}
            {activeTab === "settings" && renderSettings()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
