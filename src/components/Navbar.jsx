import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between">
      <h1 className="font-bold text-xl">SkillSwap</h1>
      <div className="flex gap-6">
        <Link href="/explore">Explore</Link>
        <Link href="/add-skill">Add Skill</Link>
      </div>
    </nav>
  );
}