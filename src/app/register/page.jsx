"use client";

import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  async function register(e) {
    e.preventDefault();

    const name = e.target.name.value;
    const college = e.target.college.value;
    const level = e.target.level.value;
    const mode = e.target.mode.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return alert(error.message);

    await supabase.from("profiles").insert({
      id: data.user.id,
      name,
      college,
      level,
      mode,
    });

    router.push("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Create Account ✨
        </h1>

        <p className="text-center text-gray-600 mb-6">
          Join SkillSwap and start exchanging skills
        </p>

        <form onSubmit={register} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              className="w-full mt-1 px-4 py-3 rounded-xl
                         bg-gray-50 border border-gray-300
                         text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* College */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              College
            </label>
            <input
              name="college"
              type="text"
              required
              className="w-full mt-1 px-4 py-3 rounded-xl
                         bg-gray-50 border border-gray-300
                         text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Skill Level */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Skill Level
            </label>
            <select
              name="level"
              required
              className="w-full mt-1 px-4 py-3 rounded-xl
                         bg-gray-50 border border-gray-300
                         text-gray-900
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* Teach / Learn */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              I want to
            </label>
            <div className="flex gap-6 mt-2 text-gray-800">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="mode" value="teach" required />
                Teach
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="mode" value="learn" />
                Learn
              </label>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full mt-1 px-4 py-3 rounded-xl
                         bg-gray-50 border border-gray-300
                         text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full mt-1 px-4 py-3 rounded-xl
                         bg-gray-50 border border-gray-300
                         text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-xl text-white font-semibold
                       bg-gradient-to-r from-indigo-600 to-purple-600
                       hover:opacity-90 transition"
          >
            Continue
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already registered?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}