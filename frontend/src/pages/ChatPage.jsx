import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getStreamToken, blockUser } from "../lib/api";
import ChatLoader from "../components/ChatLoader";
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import CallButton from "../components/CallButton";
import ChatOptions from "../components/ChatOptions";
const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const navigate = useNavigate();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();
  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  const blockMutation = useMutation({
    mutationFn: (userId) => blockUser(userId),
    onSuccess: () => {
      toast.success("User blocked successfully");
      navigate("/");
    },
    onError: () => {
      toast.error("Failed to block user");
    },
  });
  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `I've started a video call me here:${callUrl}`,
      });
      toast.success("Video call link sent successfully");
    }
  };

  const handleBlockUser = (userId) => {
    blockMutation.mutate(userId);
  };
  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;
      try {

        const client = StreamChat.getInstance(STREAM_API_KEY);
        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.Profilepic,
          },
          tokenData.token
        );
        const channelId = [authUser._id, targetUserId].sort().join("-");
        const currentChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });
        await currentChannel.watch();
        setChannel(currentChannel);
        setChatClient(client);
      } catch {
        toast.error("Could not connect to chat. Please try again");
      } finally {
        setLoading(false);
      }
    };
    initChat();
  }, [tokenData, authUser, targetUserId]);
  if (loading || !chatClient || !channel) return <ChatLoader />;
  return (
    <div className="h-[93vh] ">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <div className="absolute top-2 right-2 z-10 flex gap-2">
              <ChatOptions
                channel={channel}
                targetUserId={targetUserId}
                onBlock={handleBlockUser}
              />
              <CallButton handleVideoCall={handleVideoCall} />
            </div>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
