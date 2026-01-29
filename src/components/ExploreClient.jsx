
"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";

export default function ExploreClient() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      const supabase = getSupabaseClient(); // Use your client function

      // Fetch all rows where status = 'pending' from table 'swaps'
      const { data, error } = await supabase
        .from("swaps")   // <-- YOUR TABLE NAME
        .select("*")
        .eq("status", "pending"); 

      if (error) {
        console.error("Error fetching skills:", error.message);
      } else {
        setSkills(data);
      }

      setLoading(false);
    }

    fetchSkills();
  }, []);

  if (loading) return <p>Loading skills...</p>;
  if (skills.length === 0) return <p>No pending skills found.</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="border rounded-xl p-4 shadow-sm bg-white"
        >
          <h3 className="font-semibold text-lg">{skill.teach_skill}</h3>
          <p className="text-sm text-gray-600 mt-1">
            Wants to learn: {skill.learn_skill}
          </p>
          <p className="text-xs text-gray-500 mt-3">
            Status: {skill.status}
          </p>
        </div>
      ))}
    </div>
  );
}