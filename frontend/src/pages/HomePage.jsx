import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { capitalize } from "../lib/utils";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
  getOnlineUsers,
} from "../lib/api";

import {
  CheckCircle,
  CheckCircleIcon,
  MapPinIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import FriendCard from "../components/FriendCard";
import NoFriend from "../components/NoFriend";
import { getLanguageFlag } from "../lib/languageUtils.jsx";
const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequests, setOutgoingRequests] = useState(new Set());
  const { data: friends, isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });
  const { data: recommendedUser = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUsers,
  });
  const { data: outgoingFriendReqs = [] } = useQuery({
    queryKey: ["outgoingFriendRequests"],
    queryFn: getOutgoingFriendReqs,
  });
  const { data: onlineUsers = [] } = useQuery({
    queryKey: ["onlineUsers"],
    queryFn: getOnlineUsers,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
  const { mutate: sendRequestMutation, isLoading: isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendRequests"] }),
  });
  useEffect(() => {
    const outgoingIds = new Set();
    if (Array.isArray(outgoingFriendReqs)) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequests(outgoingIds);
    } else {
      console.warn(
        "Expected outgoingFriendReqs to be an array but got:",
        outgoingFriendReqs
      );
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 ">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to="/notifications" className="btn btn-primary btn-sm">
            <UserIcon className="mr-2 size-4" />
            Friends Requests
          </Link>
        </div>
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
            Loading...
          </div>
        ) : friends.length == 0 ? (
          <>
            <p className="text-center ">No Friends yet</p>
            <NoFriend />
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.length > 0 ? (
              friends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))
            ) : (
              <>
                <p className="text-center">No Friends yet</p>
                <NoFriend />
              </>
            )}
          </div>
        )}
        <section>
          <div className="mb-6 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Meet New Learners
                </h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners based on your
                  profile
                </p>
              </div>
            </div>
          </div>
          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
              Loading...
            </div>
          ) : recommendedUser.length == 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">
                No recommendations available
              </h3>
              <p className="text-base-content opacity-70">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.isArray(recommendedUser) &&
                recommendedUser.map((user) => {
                  const hasRequestBeenSent = outgoingRequests.has(user._id);
                  return (
                    <div
                      key={user._id}
                      className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="card-body p-5 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-12 rounded-full">
                              <img src={user.Profilepic} alt={user.fullName} />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {user.fullName}
                            </h3>
                            {user.location && (
                              <div className="flex items-center text-xs opacity-70">
                                <MapPinIcon className="size-3 mr-1" />
                                {user.location}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {/*Languages with flags */}
                      <div className="flex flex-wrap gap-1.5">
                        <span className="badge badge-secondary">
                          {getLanguageFlag(user.nativeLanguage)}
                          Native:{capitalize(user.nativeLanguage)}
                        </span>
                        <span className="badge badge-secondary">
                          {getLanguageFlag(user.learningLanguage)}
                          Learning:{capitalize(user.learningLanguage)}
                        </span>
                      </div>
                      {user.bio && (
                        <p className="text-sm opacity-70">{user.bio}</p>
                      )}
                      <button
                        className={`btn w-full mt-2 ${
                          hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                        }`}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            Request sent
                          </>
                        ) : (
                          <>
                        <UserPlusIcon className="size-4 mr-2" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
            </div>
          )}
        </section>

        {/* Online Users Section */}
        {onlineUsers.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Online Now</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {onlineUsers.slice(0, 6).map((user) => (
                <FriendCard key={user._id} friend={user} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default HomePage;
