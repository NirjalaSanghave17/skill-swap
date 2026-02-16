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
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    const userId = session.user.id;

    // 1️⃣ Get MY skills
    const { data: mySkills } = await supabase
      .from("skills")
      .select("id")
      .eq("user_id", userId);

    if (!mySkills || mySkills.length === 0) {
      setLoading(false);
      return;
    }

    const skillIds = mySkills.map((s) => s.id);

    // 2️⃣ Get swaps FOR my skills
    const { data, error } = await supabase
      .from("swaps")
      .select(`
        id,
        status,
        created_at,
        skills (
          skill_name,
          skill_level,
          type
        )
      `)
      .in("skill_id", skillIds)
      .order("created_at", { ascending: false });

    if (!error) setSwaps(data || []);
    setLoading(false);
  };

  const updateStatus = async (swapId, status) => {
    setUpdatingId(swapId);

    const { error } = await supabase
      .from("swaps")
      .update({ status })
      .eq("id", swapId);

    if (!error) {
      setSwaps((prev) =>
        prev.map((s) =>
          s.id === swapId ? { ...s, status } : s
        )
      );
    } else {
      alert(error.message);
    }

    setUpdatingId(null);
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-white">
        Loading swap requests...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">

        <h2 className="text-3xl font-bold text-center mb-6">
          Swap Requests
        </h2>

        {swaps.length === 0 && (
          <p className="text-center text-gray-500">
            No swap requests yet
          </p>
        )}

        <div className="space-y-4">
          {swaps.map((swap) => (
            <div
              key={swap.id}
              className="border rounded-xl p-4"
            >
              <p className="font-semibold">
                {swap.skills.skill_name}
              </p>
              <p className="text-sm text-gray-600">
                {swap.skills.skill_level} • {swap.skills.type}
              </p>

              <p className="mt-2">
                Status:{" "}
                <span className="font-semibold capitalize">
                  {swap.status}
                </span>
              </p>

              {swap.status === "pending" && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() =>
                      updateStatus(swap.id, "accepted")
                    }
                    disabled={updatingId === swap.id}
                    className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(swap.id, "rejected")
                    }
                    disabled={updatingId === swap.id}
                    className="flex-1 bg-red-600 text-white py-2 rounded-xl hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="w-full mt-6 border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl hover:bg-indigo-50"
        >
          🏠 Go to Dashboard
        </button>

      </div>
    </div>
  );
}