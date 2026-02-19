"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function MySwaps() {
  const router = useRouter();
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchMySwaps();
  }, []);

  const fetchMySwaps = async () => {
    setLoading(true);

    // ✅ Get logged-in user
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    const userId = session.user.id;

    // ✅ STEP 1: Get all skills owned by this user
    const { data: mySkills, error: skillError } = await supabase
      .from("skills")
      .select("id")
      .eq("user_id", userId);

    if (skillError) {
      console.error("Skill Fetch Error:", skillError.message);
      setLoading(false);
      return;
    }

    if (!mySkills || mySkills.length === 0) {
      setSwaps([]);
      setLoading(false);
      return;
    }

    const skillIds = mySkills.map((skill) => skill.id);

    // ✅ STEP 2: Fetch swaps for those skills
    const { data, error } = await supabase
      .from("swaps")
      .select(`
        id,
        status,
        created_at,
        skill_id,
        skills (
          skill_name,
          skill_level,
          type,
          user_id
        )
      `)
      .in("skill_id", skillIds)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase Fetch Error:", error.message);
    } else {
      setSwaps(data || []);
    }

    setLoading(false);
  };

  const updateStatus = async (swapId, status) => {
    setUpdatingId(swapId);

    const { error } = await supabase
      .from("swaps")
      .update({ status })
      .eq("id", swapId);

    if (error) {
      alert("Update failed: " + error.message);
    } else {
      setSwaps((prev) =>
        prev.map((s) =>
          s.id === swapId ? { ...s, status } : s
        )
      );
    }

    setUpdatingId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center">
        <p className="text-white text-xl animate-pulse">
          Loading swap requests...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          Incoming Requests
        </h2>

        {swaps.length === 0 ? (
          <p className="text-center text-gray-500">
            No swap requests yet.
          </p>
        ) : (
          <div className="space-y-4">
            {swaps.map((swap) => (
              <div
                key={swap.id}
                className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-800 text-lg">
                      {swap.skills?.skill_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {swap.skills?.skill_level} • {swap.skills?.type}
                    </p>
                  </div>

                  <span
                    className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${
                      swap.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : swap.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {swap.status}
                  </span>
                </div>

                {swap.status === "pending" && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => updateStatus(swap.id, "accepted")}
                      disabled={updatingId === swap.id}
                      className="flex-1 bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition"
                    >
                      {updatingId === swap.id ? "..." : "Accept"}
                    </button>

                    <button
                      onClick={() => updateStatus(swap.id, "rejected")}
                      disabled={updatingId === swap.id}
                      className="flex-1 bg-red-600 text-white py-2 rounded-xl font-semibold hover:bg-red-700 disabled:opacity-50 transition"
                    >
                      {updatingId === swap.id ? "..." : "Reject"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full mt-8 border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl font-bold hover:bg-indigo-50 transition"
        >
          🏠 Go to Dashboard
        </button>
      </div>
    </div>
  );
}