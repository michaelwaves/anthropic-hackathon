"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        router.push("/dashboard");
      } else {
        setError("Invalid email or password.");
      }
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-sky-100">
        <h1 className="text-3xl font-bold text-sky-600 mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-sky-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-sky-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sky-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-sky-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
              placeholder="••••••••••"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-md transition duration-150"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
