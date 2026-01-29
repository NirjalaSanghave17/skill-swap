"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function MySkillsPage() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("skills")
      .select("*")
      .eq("user_id", user.id);

    setSkills(data || []);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My Skills</h1>

      {skills.length === 0 && <p>No skills added yet.</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((skill) => (
          <div key={skill.id} className="border p-4 rounded">
            <p><b>Skill:</b> {skill.skill_name}</p>
            <p><b>Level:</b> {skill.skill_level}</p>
            <p className="capitalize"><b>Type:</b> {skill.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}