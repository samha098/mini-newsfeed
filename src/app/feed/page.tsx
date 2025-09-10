"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  user: string;
  text: string;
  likes: number;
  loves: number;
  timestamp: number;
}

export default function FeedPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [clickedReaction, setClickedReaction] = useState<number | null>(null);

  useEffect(() => {
    const user = Cookies.get("username");
    if (!user) router.push("/");
    else setUsername(user);

    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) setPosts(JSON.parse(storedPosts));
  }, [router]);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);


  const [newPostError, setNewPostError] = useState("");

  const handlePost = () => {
    if (!newPost.trim() || !username) {
      setNewPostError("Please write something before posting.");
      return;
    }
    setNewPostError("");
    const newEntry: Post = {
      id: Date.now(),
      user: username,
      text: newPost,
      likes: 0,
      loves: 0,
      timestamp: Date.now(),
    };
    setPosts([newEntry, ...posts]);
    setNewPost("");
  };


  const handleLike = (id: number) => {
    setClickedReaction(id);
    setPosts(posts.map(p => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
    setTimeout(() => setClickedReaction(null), 200);
  };

  const handleLove = (id: number) => {
    setClickedReaction(id);
    setPosts(posts.map(p => (p.id === id ? { ...p, loves: p.loves + 1 } : p)));
    setTimeout(() => setClickedReaction(null), 200);
  };

  const handleLogout = () => {
    Cookies.remove("username");
    router.push("/");
  };

  const formatTime = (ts: number) => {
    const date = new Date(ts);
    return date.toLocaleString([], { dateStyle: "short", timeStyle: "short" });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="mx-auto mb-4 w-16 h-16">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="50" fill="url(#logoGradient)" />
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  fill="white"
                  fontSize="32"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                  dominantBaseline="middle"
                >
                  MN
                </text>
              </svg>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">Mini Newsfeed</h1>
              <p className="text-gray-500 text-sm">Share your thoughts instantly</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md transition"
          >
            Logout
          </button>
        </div>

        {/* New Post Box */}
        <div className="bg-white rounded-3xl shadow-lg p-5 mb-6 transition-transform transform hover:scale-[1.01]">
          {username && (
            <p className="text-gray-700 text-lg font-semibold mb-3">
              Hi, {username} 👋
            </p>
          )}
          <textarea
            placeholder="What&apos;s on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-2xl mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          {/* Error message */}
          {newPostError && (
            <p className="text-red-500 text-sm mb-3">
              Please write something before posting.
            </p>
          )}

          <button
            onClick={handlePost}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition transform hover:scale-105"
          >
            Post
          </button>
        </div>


        {/* Posts Feed */}
        <div className="space-y-5">
          {posts.length === 0 && (
            <p className="text-center text-gray-400">No posts yet. Be the first to post!</p>
          )}
          {posts.map(post => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-3xl p-5 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {getInitials(post.user)}
                </div>
                <div>
                  <p className="font-semibold text-gray-700">{post.user}</p>
                  <p className="text-gray-400 text-xs">{formatTime(post.timestamp)}</p>
                </div>
              </div>

              <p className="text-gray-800 mb-3">{post.text}</p>

              {/* Reactions */}
              <div className="flex gap-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center cursor-pointer gap-1 text-gray-700 font-semibold transition-transform transform ${clickedReaction === post.id ? "scale-110" : "scale-100"
                    } hover:text-blue-500`}
                >
                  👍 {post.likes}
                </button>
                <button
                  onClick={() => handleLove(post.id)}
                  className={`flex items-center cursor-pointer gap-1 text-gray-700 font-semibold transition-transform transform ${clickedReaction === post.id ? "scale-110" : "scale-100"
                    } hover:text-red-500`}
                >
                  ❤️ {post.loves}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
