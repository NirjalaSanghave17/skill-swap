"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SwapSkills() {
  const router = useRouter();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [requesting, setRequesting] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;

      if (!user) {
        router.push("/login");
        return;
      }

      setUserId(user.id);

      const { data: skillData, error } = await supabase
        .from("skills")
        .select("*")
        .neq("user_id", user.id);

      if (!error) setSkills(skillData || []);
      setLoading(false);
    };

    fetchSkills();
  }, [router]);

  const handleRequestSwap = async (skillId) => {
    if (!userId) return;

    setRequesting(skillId);

    const { error } = await supabase.from("swaps").insert([
      {
        skill_id: skillId,
        requester_id: userId,
        status: "pending",
      },
    ]);

    setRequesting("");

    if (error) {
      alert(error.message);
      return;
    }

    alert("Swap request sent!");
    router.push("/my-swaps");
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-100">Loading skills...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center">
          Swap Skills 🔁
        </h2>

        {skills.length === 0 && (
          <p className="text-center text-gray-500">
            No skills available for swapping
          </p>
        )}

        <div className="space-y-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="border p-3 rounded-xl flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {skill.skill_name}
                </p>
                <p className="text-sm text-gray-600">
                  {skill.skill_level} • {skill.type}
                </p>
              </div>

              <button
                onClick={() => handleRequestSwap(skill.id)}
                disabled={requesting === skill.id}
                className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
              >
                {requesting === skill.id ? "Requesting..." : "Swap"}
              </button>
            </div>
          ))}
        </div>

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