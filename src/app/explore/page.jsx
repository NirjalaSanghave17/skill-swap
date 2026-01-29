"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ExplorePage() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchAllSkills();
  }, []);

  async function fetchAllSkills() {
    const { data } = await supabase
      .from("skills")
      .select(`
        id,
        skill_name,
        skill_level,
        type,
        profiles (
          name,
          college
        )
      `);

    setSkills(data || []);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Explore Skills</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((skill) => (
          <div key={skill.id} className="border p-4 rounded">
            <p><b>Skill:</b> {skill.skill_name}</p>
            <p><b>Level:</b> {skill.skill_level}</p>
            <p className="capitalize"><b>Type:</b> {skill.type}</p>

            <p className="text-sm text-gray-500 mt-2">
              By {skill.profiles?.name || "User"} ({skill.profiles?.college || "College"})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}