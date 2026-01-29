"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <p className="mb-8 text-gray-600">
        Welcome to Skill Swap. Choose what you want to do.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/explore"
          className="border rounded-lg p-6 hover:bg-gray-100 transition"
        >
          <h2 className="text-xl font-semibold">Explore Skills</h2>
          <p className="text-sm text-gray-500 mt-2">
            Browse skills shared by others
          </p>
        </Link>

        <Link
          href="/add-skill"
          className="border rounded-lg p-6 hover:bg-gray-100 transition"
        >
          <h2 className="text-xl font-semibold">Add Skill</h2>
          <p className="text-sm text-gray-500 mt-2">
            Share your skill with others
          </p>
        </Link>

        <Link
          href="/my-skills"
          className="border rounded-lg p-6 hover:bg-gray-100 transition"
        >
          <h2 className="text-xl font-semibold">My Skills</h2>
          <p className="text-sm text-gray-500 mt-2">
            View skills you have added
          </p>
        </Link>
      </div>
    </div>
  );
}