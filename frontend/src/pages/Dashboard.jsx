import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const [presells, setPresells] = useState([]);
  const [tracking, setTracking] = useState([]);

  async function fetchData() {
    try {
      const presellRes = await api.get("/presell");
      const trackingRes = await api.get("/tracking");

      setPresells(presellRes.data);
      setTracking(trackingRes.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar dados");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function copyLink(slug) {
    const url = `http://localhost:3000/presell/${slug}`;
    navigator.clipboard.writeText(url);
    alert("Link copiado!");
  }

  function countClicks(slug) {
    return tracking.filter((t) => t.slug === slug).length;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      {/* HEADER */}
      <div className="bg-gray-800 border-b border-gray-700 px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          🚀 Painel Presell
        </h1>

        <Link
          to="/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          + Nova Presell
        </Link>
      </div>

      {/* CONTEÚDO */}
      <div className="p-8">

        <h2 className="text-xl font-semibold text-gray-300 mb-6">
          Minhas Presells
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {presells.map((p) => (
            <div
              key={p.id}
              className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition border border-gray-700"
            >
              {/* Título */}
              <h3 className="text-lg font-semibold text-white mb-1">
                {p.title}
              </h3>

              {/* Slug */}
              <p className="text-sm text-gray-400 mb-4">
                /{p.slug}
              </p>

              {/* Cliques */}
              <div className="mb-5">
                <span className="text-2xl font-bold text-green-400">
                  {countClicks(p.slug)}
                </span>
                <span className="text-gray-400 text-sm ml-1">
                  cliques
                </span>
              </div>

              {/* BOTÕES */}
              <div className="flex gap-2">
                <button
                  onClick={() => copyLink(p.slug)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
                >
                  Copiar
                </button>

                <a
                  href={`http://localhost:3000/presell/${p.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center border border-gray-600 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  Abrir
                </a>
              </div>
            </div>
          ))}

        </div>

        {/* EMPTY STATE */}
        {presells.length === 0 && (
          <div className="text-center mt-20 text-gray-500">
            Nenhuma presell criada ainda
          </div>
        )}

      </div>
    </div>
  );
}