"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 py-4 flex items-center justify-between shadow-lg">
      
      {/* Logo / Brand */}
      <Link href="/" className="text-white text-2xl font-extrabold tracking-wide">
        SkillSwap 🤝
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link
          href="/explore"
          className="text-white/90 hover:text-white font-medium transition"
        >
          Explore
        </Link>

        <Link
          href="/register"
          className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-semibold hover:bg-indigo-50 transition"
        >
          Register
        </Link>

        <Link
          href="/login"
          className="border border-white text-white px-4 py-2 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}