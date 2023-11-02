"use client";
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [post, setPosts] = useState([]);

  const handleSearchChange = (e) => {};

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPost();
  }, []);

  return (
    <section className="feed">
      <from className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or user name"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </from>
      <PromptCardList data={post} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
