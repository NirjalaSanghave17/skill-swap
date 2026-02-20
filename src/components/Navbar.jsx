"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      // 1️⃣ Get current session
      const { data } = await supabase.auth.getSession();
      const currentUser = data?.session?.user;

      if (!currentUser) return;

      setUser(currentUser);

      // 2️⃣ Fetch name from profiles table
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", currentUser.id)
        .single();

      if (!error && profileData?.name) {
        setUserName(profileData.name);
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="w-full flex justify-between items-center px-8 py-4 
      bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md">

      <h1 className="text-xl font-bold">SkillSwap 👋</h1>

      <div className="flex items-center gap-4">
        {!user ? (
          <div className="w-9 h-9 rounded-full bg-white/30 flex items-center justify-center text-lg">
            👤
          </div>
        ) : (
          <>
            <span className="text-sm font-medium">
              Welcome{userName && `, ${userName}`}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg text-sm transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}