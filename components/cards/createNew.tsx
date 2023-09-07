"use client";

import axios from "axios";
import { useState } from "react";

const CreateNew = () => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const prompts = [
    "What's happening?",
    "What are you up to?",
    "What's new?",
    "Share your thoughts.",
    "What's on your mind?",
    "What's happening in your world?",
    "What's keeping you busy?",
    "What's your latest project?",
    "What's your favorite thing about today?",
    "What's something you're grateful for?",
    "What's a question you're wondering about?",
    "What's a challenge you're facing?",
  ];
  let choice = prompts[Math.floor(Math.random() * prompts.length)];

  const handleCreatePost = async () => {
    if (!content.trim()) {
      alert("Post content cannot be empty");
    } else {
      try {
        const res = await axios.post("/api/posts/create", {
          content,
          tags: tags.trim() === "" ? null : tags,
        });

        if (!res) {
          throw new Error("error creating new post");
        }

        window.location.reload();
      } catch (error) {
        console.error("error: ", error);
      }
    }
  };

  return (
    <div className="w-full mb-4">
      <div className="bg-slate-800 p-3 rounded-xl">
        <div className="flex flex-col">
          <div>
            <textarea
              name="content"
              id="content"
              placeholder={choice}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 bg-slate-700 rounded-xl outline-none"
            ></textarea>
            <input
              className="w-full p-2 bg-slate-700 rounded-xl outline-none"
              type="text"
              name="tags"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="(Optional) Tags separated by comma..."
            />
          </div>
          <div className="text-right">
            <button
              onClick={handleCreatePost}
              className="px-3 py-1 bg-slate-700 transition-all duration-300 rounded-xl border-2 border-primary mt-2"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNew;
