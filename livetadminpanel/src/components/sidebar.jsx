import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-55 h-screen bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="hover:text-yellow-400">
          Dashboard
        </Link>
      </nav>
    </div>
  );
}
