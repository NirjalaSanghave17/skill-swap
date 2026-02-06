"use client";

import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function login(e) {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/my-skills");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
      <form
        onSubmit={login}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6"
      >
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-gray-800 text-center">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 text-center text-sm">
          Login to continue swapping skills
        </p>

        {/* Email */}
        <input
          name="email"
          type="email"
          required
          placeholder="Email address"
          className="border border-gray-300 rounded-xl p-3 w-full
                     text-gray-800 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="border border-gray-300 rounded-xl p-3 w-full
                     text-gray-800 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Login Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600
                       text-white px-10 py-3 rounded-xl font-semibold
                       hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
}