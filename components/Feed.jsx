"use client";
import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, index) => (
        <PromptCard key={index} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allpost, setAllPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allpost.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const searchResults = filterPrompts(e.target.value);
    setSearchedResults(searchResults);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName)
    const searchResults = filterPrompts(tagName)
    setSearchedResults(searchResults)
  }

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("api/prompt");
      const data = await response.json();
      setAllPosts(data);
    };

    fetchPost();
  }, []);

  return (
    <section className="feed">
      <from className="relative w-full flex-center">
        <input
          id="search"
          type="text"
          placeholder="Search for a tag or user name"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </from>

      {searchText ? (
        <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allpost} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
