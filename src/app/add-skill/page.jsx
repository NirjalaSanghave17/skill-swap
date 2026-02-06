"use client";

import { supabase } from "../../lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddSkill() {
  const router = useRouter();
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [type, setType] = useState("teach");
  const [loading, setLoading] = useState(false);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;

    if (!user) {
      router.push("/login");
      return;
    }

    await supabase.from("skills").insert([
      {
        skill_name: skillName,
        skill_level: skillLevel,
        type,
        user_id: user.id,
      },
    ]);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center space-y-6">

        <h2 className="text-3xl font-extrabold text-gray-800">
          Add Your Skill
        </h2>

        <form onSubmit={handleAddSkill} className="space-y-4">
          <input
            type="text"
            placeholder="Skill name"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            required
            className="w-full p-3 border rounded-xl text-gray-800"
          />

          <select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            className="w-full p-3 border rounded-xl text-gray-800"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 border rounded-xl text-gray-800"
          >
            <option value="teach">Teach</option>
            <option value="learn">Learn</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? "Adding..." : "Add Skill"}
          </button>
        </form>

        {/* Dashboard Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition"
        >
          🏠 Go to Dashboard
        </button>
      </div>
    </div>
  );
}