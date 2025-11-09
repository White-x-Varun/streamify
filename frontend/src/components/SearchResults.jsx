import React from 'react';
import { format } from 'date-fns';

const SearchResults = ({ results, onMessageClick, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <span className="loading loading-spinner loading-sm" />
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-8 text-base-content opacity-70">
        No messages found
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto space-y-2">
      {results.map((message, index) => (
        <div
          key={message.id || index}
          className="p-3 rounded-lg bg-base-200 hover:bg-base-300 cursor-pointer transition-colors"
          onClick={() => onMessageClick?.(message)}
        >
          <div className="flex items-start gap-3">
            <div className="avatar">
              <div className="w-8 h-8 rounded-full">
                <img
                  src={message.user?.image || '/default-profile.png'}
                  alt={message.user?.name || 'User'}
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">
                  {message.user?.name || 'Unknown User'}
                </span>
                <span className="text-xs opacity-70">
                  {message.created_at ? format(new Date(message.created_at), 'MMM d, yyyy HH:mm') : ''}
                </span>
              </div>
              <p className="text-sm opacity-80 line-clamp-2">
                {message.text || 'Attachment'}
              </p>
              {message.attachments && message.attachments.length > 0 && (
                <div className="text-xs opacity-60 mt-1">
                  {message.attachments.length} attachment{message.attachments.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
