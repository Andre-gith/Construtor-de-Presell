import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Painel Presell 🚀</h1>

      <Link
        to="/create"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Criar Nova Presell
      </Link>
    </div>
  );
}