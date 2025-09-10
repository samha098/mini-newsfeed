"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = () => {
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }
    Cookies.set("username", username, { expires: 7 });
    router.push("/feed");
  };

  const handleSignUp = () => {
    if (!username.trim() || !name.trim()) return;
    Cookies.set("username", name, { expires: 7 });
    router.push("/feed");
  };

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row transition-all duration-700 ease-in-out ${isSignUp ? "md:flex-row-reverse" : ""
        }`}
    >
      {/* Form Section */}
      <div className="md:w-1/2 flex items-center justify-center p-8 md:p-12 transition-all duration-700">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-xl transition-transform duration-500 ease-in-out">
          {/* Logo & Name */}
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

          <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Mini Newsfeed
          </h1>

          {!isSignUp ? (
            <>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              {/* Error message */}
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              <button
                onClick={handleSignIn}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold w-full py-3 rounded-2xl shadow-md transition transform hover:scale-105"
              >
                SIGN IN
              </button>

              <p className="text-center text-gray-600 mt-4">
                Don't have an account?{" "}
                <span
                  onClick={() => setIsSignUp(true)}
                  className="text-purple-600 font-bold cursor-pointer hover:underline"
                >
                  SIGN UP
                </span>
              </p>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 mb-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 mb-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 mb-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <button
                onClick={handleSignUp}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold w-full py-4 rounded-2xl shadow-md transition transform hover:scale-105 mb-4"
              >
                SIGN UP
              </button>

              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <span
                  onClick={() => setIsSignUp(false)}
                  className="text-purple-600 font-bold cursor-pointer hover:text-blue-500 transition"
                >
                  SIGN IN
                </span>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Welcome Section */}

      <div
        className="md:w-1/2 relative flex items-center justify-center p-8 md:p-12 
                bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                rounded-2xl transition-all duration-700"
      >
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-white/20 blur-3xl"></div>

        <div className="relative z-10 max-w-md text-center">
          <h2 className="text-4xl font-bold mb-4">
            {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
          </h2>
          <p className="mb-8 text-gray-200">
            {isSignUp
              ? "Sign in with your credentials to continue using the site."
              : "Register with your personal details to use all of site features."}
          </p>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold w-full py-4 rounded-2xl shadow-md transition transform hover:scale-105 mb-4"
          >
            {isSignUp ? "SIGN IN" : "SIGN UP"}
          </button>
        </div>
      </div>
    </div>
  );
}
