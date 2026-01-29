"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AddSkillPage() {
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [type, setType] = useState("teach");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login");
      return;
    }

    const { error } = await supabase.from("skills").insert([
      {
        user_id: user.id,
        skill_name: skillName,
        skill_level: skillLevel,
        type: type,
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      router.push("/my-skills");
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Add Skill</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          placeholder="Skill name"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <input
          placeholder="Skill level (Beginner / Intermediate / Advanced)"
          value={skillLevel}
          onChange={(e) => setSkillLevel(e.target.value)}
          className="border p-2 w-full"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="teach">I can teach</option>
          <option value="learn">I want to learn</option>
        </select>

        <button className="bg-black text-white px-4 py-2 rounded">
          Save Skill
        </button>
      </form>
    </div>
  );
}


  