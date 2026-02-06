"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function MySwaps() {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      // 1️⃣ Get logged-in user
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;

      if (!user) {
        router.push("/login");
        return;
      }

      // 2️⃣ Get IDs of skills owned by logged-in user
      const { data: mySkills, error: mySkillsError } = await supabase
        .from("skills")
        .select("id")
        .eq("user_id", user.id);

      if (mySkillsError) {
        alert(mySkillsError.message);
        setLoading(false);
        return;
      }

      const mySkillIds = mySkills?.map((s) => s.id) || [];

      if (mySkillIds.length === 0) {
        setRequests([]);
        setLoading(false);
        return;
      }

      // 3️⃣ Fetch swap requests for these skills
      const { data: swapData, error } = await supabase
        .from("swaps")
        .select(`
          id,
          skill_id,
          requester_id,
          status,
          created_at,
          fk_skill (
            skill_name,
            skill_level,
            type,
            user_id
          ),
          fk_requester (
            email
          )
        `)
        .in("skill_id", mySkillIds);

      if (error) {
        alert(error.message);
      } else {
        setRequests(swapData || []);
      }

      setLoading(false);
    };

    fetchRequests();
  }, [router]);

  const handleDecision = async (swapId, decision) => {
    setProcessing(swapId);

    const { error } = await supabase
      .from("swaps")
      .update({ status: decision })
      .eq("id", swapId);

    if (error) {
      alert(error.message);
    } else {
      setRequests((prev) =>
        prev.map((r) => (r.id === swapId ? { ...r, status: decision } : r))
      );
      alert(`Swap ${decision}!`);
    }

    setProcessing("");
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-100">Loading swap requests...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6">

        {/* Page title */}
        <h2 className="text-3xl font-extrabold text-gray-800 text-center">
          Swap Requests 🔁
        </h2>

        {/* No requests */}
        {requests.length === 0 && (
          <p className="text-center text-gray-500">No swap requests yet</p>
        )}

        {/* Swap requests list */}
        <div className="space-y-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className="border p-3 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="mb-2 sm:mb-0">
                <p className="font-semibold text-gray-800">{req.fk_skill.skill_name}</p>
                <p className="text-sm text-gray-600">{req.fk_skill.skill_level} • {req.fk_skill.type}</p>
                <p className="text-sm text-gray-500">
                  Requested by: {req.fk_requester?.email || "Unknown"}
                </p>
                <p className="text-sm font-semibold">Status: {req.status}</p>
              </div>

              {req.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecision(req.id, "accepted")}
                    disabled={processing === req.id}
                    className="bg-green-600 text-white px-3 py-1 rounded-xl font-semibold hover:bg-green-700 transition"
                  >
                    {processing === req.id ? "..." : "Accept"}
                  </button>
                  <button
                    onClick={() => handleDecision(req.id, "rejected")}
                    disabled={processing === req.id}
                    className="bg-red-600 text-white px-3 py-1 rounded-xl font-semibold hover:bg-red-700 transition"
                  >
                    {processing === req.id ? "..." : "Reject"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dashboard button */}
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