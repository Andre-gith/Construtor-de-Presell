import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [presells, setPresells] = useState([]);
  const navigate = useNavigate();

  async function loadPresells() {
    try {
      const res = await api.get("/presell");
      setPresells(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadPresells();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = confirm("Deseja deletar essa presell?");
    if (!confirmDelete) return;

    await api.delete(`/presell/${id}`);
    loadPresells();
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-400 text-sm">
            Gerencie suas presells
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/create")}
            className="bg-green-500 px-5 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            + Nova Presell
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Sair
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {presells.map((p) => (
          <div
            key={p.id}
            className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition duration-300 border border-gray-700"
          >

            {/* HEADER CARD */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">{p.title}</h2>

              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                Ativa
              </span>
            </div>

            {/* SLUG */}
            <p className="text-gray-400 text-sm mb-4 break-all">
              /presell/{p.slug}
            </p>

            {/* AÇÕES */}
            <div className="flex justify-between items-center gap-2">

              <a
                href={`${import.meta.env.VITE_API_URL}/presell/${p.slug}`}
                target="_blank"
                className="bg-blue-500 px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
              >
                Abrir
              </a>

              <button
                onClick={() => navigate(`/edit/${p.id}`)}
                className="bg-yellow-500 px-3 py-1 rounded text-sm hover:bg-yellow-600 transition"
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600 transition"
              >
                Deletar
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* EMPTY STATE */}
      {presells.length === 0 && (
        <div className="text-center mt-20 text-gray-400">
          <p className="text-lg">Nenhuma presell criada ainda</p>
          <p className="text-sm">Clique em "Nova Presell" para começar</p>
        </div>
      )}

    </div>
  );
}