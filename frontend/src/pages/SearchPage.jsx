import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../lib/api";
import SearchBar from "../components/SearchBar";
import FriendCard from "../components/FriendCard";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, UsersIcon } from "lucide-react";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: searchResults = [], isLoading, error } = useQuery({
    queryKey: ["searchUsers", searchQuery],
    queryFn: () => searchUsers(searchQuery),
    enabled: searchQuery.length >= 2,
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/" className="btn btn-ghost btn-sm">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <UsersIcon className="h-6 w-6" />
            Search Users
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Results */}
        {searchQuery && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Search Results for "{searchQuery}"
            </h2>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg"></span>
                Searching...
              </div>
            ) : error ? (
              <div className="alert alert-error">
                <span>Failed to search users. Please try again.</span>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg opacity-70">No users found matching your search.</p>
                <p className="text-sm opacity-50 mt-2">
                  Try searching by name, native language, or learning language.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((user) => (
                  <FriendCard key={user._id} friend={user} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!searchQuery && (
          <div className="text-center py-12">
            <UsersIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Search for Language Partners</h3>
            <p className="text-gray-600">
              Find users by their name, native language, or language they're learning.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
