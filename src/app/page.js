import Link from "next/link";

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-8 text-center">
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Skill Swap 🤝
        </h1>

        {/* Tagline */}
        <p className="text-gray-600 text-lg mb-6">
          Exchange skills. Learn faster. Grow together.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-indigo-50 rounded-xl p-4">
            <p className="text-indigo-600 font-semibold">Teach</p>
            <p className="text-sm text-gray-600">
              Share what you know
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-purple-600 font-semibold">Learn</p>
            <p className="text-sm text-gray-600">
              Gain new skills
            </p>
          </div>

          <div className="bg-pink-50 rounded-xl p-4">
            <p className="text-pink-600 font-semibold">Connect</p>
            <p className="text-sm text-gray-600">
              Swap with peers
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
  
  {/* Get Started → Register */}
  <Link href="/register">
    <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
      Get Started
    </button>
  </Link>

  {/* Explore Skills → Explore Page */}
  <Link href="/explore">
    <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition">
      Explore Skills
    </button>
  </Link>

</div>

        {/* Footer text */}
        <p className="text-xs text-gray-400 mt-6">
          Built for students • Powered by collaboration 🚀
        </p>
      </div>
    </div>
  );
}