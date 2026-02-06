import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
      
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center space-y-6">
        
        {/* Welcome */}
        <h2 className="text-4xl font-extrabold text-gray-800">
          Welcome to SkillSwap 🤝
        </h2>
        <p className="text-gray-500">
          Exchange skills. Learn together. Grow faster.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          
          <Link
            href="/explore"
            className="bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            🔍 Explore Skills
          </Link>

          <Link
            href="/my-skills"
            className="bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
          >
            📋 My Skills
          </Link>

          <Link
            href="/add-skill"
            className="bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
          >
            ➕ Add Skill
          </Link>

          <Link
            href="/swap"
            className="border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition"
          >
            🔁 Swap Skill
          </Link>
           <Link
            href="/my-swaps"
            className=" bg-pink-500 w-full border-2 border-blue-600 text-white-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition"
          >
            🔁 My Swaps
          </Link>


        </div>

        {/* Footer note */}
        <p className="text-xs text-gray-400 pt-4">
          Built for students • Powered by collaboration 🚀
        </p>
      </div>
    </div>
  );
}