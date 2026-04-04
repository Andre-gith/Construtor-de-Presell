import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreatePresell() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !slug || !content) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      setLoading(true);

      await api.post("/presell", {
        title,
        slug,
        content,
        redirectUrl,
      });

      alert("Presell criada com sucesso 🚀");

      navigate("/");
    } catch (error) {
  console.error(error);

  if (error.response?.data?.error) {
    alert(error.response.data.error);
  } else {
    alert("Erro ao criar presell");
  }
} finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Criar Presell</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Título"
          className="border p-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Slug (ex: oferta-1)"
          className="border p-3 rounded"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <textarea
          placeholder="HTML da página"
          className="border p-3 rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="text"
          placeholder="Link de redirecionamento"
          className="border p-3 rounded"
          value={redirectUrl}
          onChange={(e) => setRedirectUrl(e.target.value)}
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-3 rounded"
        >
          {loading ? "Criando..." : "Criar Presell"}
        </button>
      </form>
    </div>
  );
}