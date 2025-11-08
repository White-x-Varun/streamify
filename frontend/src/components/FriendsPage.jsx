import React, { useEffect, useState } from "react";
import FriendCard from "./FriendCard";
import { getUserFriends } from "../lib/api";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      const data = await getUserFriends();
      setFriends(data);
      setLoading(false);
    };
    fetchFriends();
  }, []);

  if (loading) return <p>Loading friends...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {friends.map((friend) => (
        <FriendCard key={friend._id} friend={friend} />
      ))}
    </div>
  );
};

export default FriendsPage;
