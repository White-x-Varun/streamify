import React, { useState } from "react";
import { MoreVertical, VolumeX, Volume2, UserX, Pin, PinOff } from "lucide-react";
import toast from "react-hot-toast";

const ChatOptions = ({ channel, targetUserId, onBlock }) => {
  const [isMuted, setIsMuted] = useState(false);

  const handleMuteToggle = async () => {
    if (!channel) return;

    try {
      if (isMuted) {
        await channel.unmute();
        setIsMuted(false);
        toast.success("Chat unmuted");
      } else {
        await channel.mute();
        setIsMuted(true);
        toast.success("Chat muted");
      }
    } catch {
      toast.error("Failed to toggle mute");
    }
  };

  const handleBlock = () => {
    if (onBlock) {
      onBlock(targetUserId);
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle"
        title="Chat Options"
      >
        <MoreVertical className="h-5 w-5" />
      </button>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a onClick={handleMuteToggle}>
            {isMuted ? (
              <>
                <Volume2 className="h-4 w-4" />
                <span>Unmute</span>
              </>
            ) : (
              <>
                <VolumeX className="h-4 w-4" />
                <span>Mute</span>
              </>
            )}
          </a>
        </li>
        <li>
          <a onClick={handleBlock}>
            <UserX className="h-4 w-4" />
            <span>Block User</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ChatOptions;
