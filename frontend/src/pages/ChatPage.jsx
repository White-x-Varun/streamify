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
  TypingIndicator,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import CallButton from "../components/CallButton";
import ChatOptions from "../components/ChatOptions";
import EmojiPickerComponent from "../components/EmojiPicker";
import VoiceRecorder from "../components/VoiceRecorder";
import FileUpload from "../components/FileUpload";
import SearchResults from "../components/SearchResults";
import { SearchIcon } from "lucide-react";
const ChatPage = () => {
  const { id: targetUserId, groupId } = useParams();
  const navigate = useNavigate();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

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

  const handleEmojiSelect = (emoji) => {
    // Insert emoji into message input - this would need access to MessageInput ref
    // For now, just log it
    console.log('Emoji selected:', emoji);
  };

  const handleSendVoiceMessage = async (audioBlob) => {
    if (channel) {
      try {
        await channel.sendFile(audioBlob, 'voice-message.wav', 'audio/wav');
        toast.success('Voice message sent');
      } catch {
        toast.error('Failed to send voice message');
      }
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim() || !channel) return;

    setSearchLoading(true);
    try {
      const results = await channel.search(query, { limit: 50 });
      setSearchResults(results.results || []);
      setShowSearch(true);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search messages');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleMessageClick = (message) => {
    // Scroll to message in chat (if possible)
    setShowSearch(false);
    setSearchQuery("");
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

        let currentChannel;
        if (groupId) {
          // Group chat
          currentChannel = client.channel("messaging", groupId);
        } else {
          // Direct message
          const channelId = [authUser._id, targetUserId].sort().join("-");
          currentChannel = client.channel("messaging", channelId, {
            members: [authUser._id, targetUserId],
          });
        }

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
  }, [tokenData, authUser, targetUserId, groupId]);
  if (loading || !chatClient || !channel) return <ChatLoader />;
  return (
    <div className="h-[93vh] ">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <div className="absolute top-2 right-2 z-10 flex gap-2">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setShowSearch(!showSearch)}
                title="Search messages"
              >
                <SearchIcon className="size-4" />
              </button>
              {!groupId && (
                <ChatOptions
                  channel={channel}
                  targetUserId={targetUserId}
                  onBlock={handleBlockUser}
                />
              )}
              <CallButton handleVideoCall={handleVideoCall} />
            </div>

            {/* Search Bar */}
            {showSearch && (
              <div className="absolute top-12 right-2 z-10 bg-base-100 p-2 rounded-lg shadow-lg border">
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="input input-sm input-bordered w-48"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch(searchQuery);
                    }
                  }}
                />
                {searchResults.length > 0 && (
                  <div className="mt-2 max-h-60 overflow-y-auto">
                    <SearchResults
                      results={searchResults}
                      onMessageClick={handleMessageClick}
                      isLoading={searchLoading}
                    />
                  </div>
                )}
              </div>
            )}

            <Window>
              <ChannelHeader />
              <MessageList
                messageActions={['react', 'reply', 'quote', 'pin']}
                showReactions={true}
                showDeletedMessages={false}
              />
              <TypingIndicator />
              <MessageInput
                focus
                mentionAllAppUsers
                additionalTextareaProps={{
                  placeholder: 'Type a message...',
                }}
              />
              <div className="flex items-center gap-2 p-2">
                <FileUpload channel={channel} />
                <EmojiPickerComponent onEmojiSelect={handleEmojiSelect} />
                <VoiceRecorder onSendVoiceMessage={handleSendVoiceMessage} />
              </div>
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
