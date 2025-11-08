import React from "react";

const OnlineStatusIndicator = ({ isOnline, lastSeen, size = "sm" }) => {
  const sizeClasses = {
    xs: "w-2 h-2",
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const getStatusText = () => {
    if (isOnline) return "Online";
    if (lastSeen) {
      const now = new Date();
      const lastSeenDate = new Date(lastSeen);
      const diffInMinutes = Math.floor((now - lastSeenDate) / (1000 * 60));

      if (diffInMinutes < 1) return "Just now";
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
    return "Offline";
  };

  return (
    <div className="flex items-center gap-1">
      <div
        className={`${sizeClasses[size]} rounded-full ${
          isOnline ? "bg-green-500" : "bg-gray-400"
        } border-2 border-white`}
        title={getStatusText()}
      />
      {!isOnline && lastSeen && (
        <span className="text-xs text-gray-500">{getStatusText()}</span>
      )}
    </div>
  );
};

export default OnlineStatusIndicator;
