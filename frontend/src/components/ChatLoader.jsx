import { LoaderIcon } from "lucide-react";
import React from "react";

const ChatLoader = () => {
  return (
    <div className="h-screen felx flex-col items-center justify-center p-4">
      <LoaderIcon className="mt-4 text-center text-lg font-mono">
        Connecting to chat..
      </LoaderIcon>
    </div>
  );
};

export default ChatLoader;
