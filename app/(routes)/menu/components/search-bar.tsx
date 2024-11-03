"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() !== "") {
      router.push(`/menu?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search menu..."
          className="w-full px-4 py-2 pr-12 text-sm text-gray-900 bg-white border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 ease-in-out"
        />
        <button
          type="submit"
          className="absolute right-[0.75px] p-2 text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 ease-in-out"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
