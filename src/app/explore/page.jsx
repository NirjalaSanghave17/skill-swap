"use client";

import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ExploreSkills() {
  const router = useRouter();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const loadSkills = async () => {
      const { data } = await supabase.from("skills").select("*");
      setSkills(data || []);
    };
    loadSkills();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6 text-center">

        <h2 className="text-3xl font-extrabold text-gray-800">Explore Skills</h2>

        {skills.length === 0 && <p className="text-gray-500">No skills available</p>}

        <div className="space-y-3">
          {skills.map((skill) => (
            <div key={skill.id} className="border p-3 rounded-xl">
              <p className="font-semibold text-gray-800">{skill.skill_name}</p>
              <p className="text-sm text-gray-600">{skill.skill_level} • {skill.type}</p>
            </div>
          ))}
        </div>

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