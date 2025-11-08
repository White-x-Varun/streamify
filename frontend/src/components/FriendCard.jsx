import React from "react";
import { Link } from "react-router-dom";
import { getLanguageFlag } from "../lib/languageUtils.jsx";
import OnlineStatusIndicator from "./OnlineStatusIndicator";

const FriendCard = ({ friend }) => {
  if (!friend) return null;
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className=" card-body p-4 ">
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar relative">
            <div className="w-12 rounded-full">
              <img src={friend.Profilepic} alt={friend.fullName} />
            </div>
            <div className="absolute -bottom-1 -right-1">
              <OnlineStatusIndicator
                isOnline={friend.isOnline}
                lastSeen={friend.lastSeen}
                size="xs"
              />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold truncate">{friend.fullName}</h3>
            <OnlineStatusIndicator
              isOnline={friend.isOnline}
              lastSeen={friend.lastSeen}
              size="xs"
            />
          </div>
        </div>
        {/**Action */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native:{friend.nativeLanguage}
          </span>
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning:{friend.learningLanguage}
          </span>
        </div>
        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;
